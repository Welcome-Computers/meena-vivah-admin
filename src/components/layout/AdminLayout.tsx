import { useAuth } from "@/hook/useAuth";
import { canAccessRoute } from "@/lib/routePermission";
import { Breadcrumb, BreadcrumbProps, Button, Layout } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import PrivateSidebar from "../../config/PrivateSidebar";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  title?: ReactNode;
  headerRightSec?: ReactNode;
  children: ReactNode;
  breadcrumbItems?: BreadcrumbProps["items"];
}

export default function AdminLayout(props: AdminLayoutProps) {
  const { children, title, headerRightSec, breadcrumbItems } = props || {};
  const router = useRouter();

  const { userName, profilePick, userRole, status } = useAuth();
  const [checkingPermission, setCheckingPermission] = useState(true);

  // console.log({ userName, profilePick, userRole, status })

  const allowedRoles = ["admin", "profile"];

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      });

      sessionStorage.removeItem("admin_session");

      await router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handlePageHide = () => {
      // Only lightweight fire-and-forget request if required
      navigator.sendBeacon("/api/auth/logout");
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");

    if (!session) {
      signOut({
        redirect: false,
      }).then(() => {
        router.replace("/");
      });
    }
  }, [router]);


  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      setCheckingPermission(false);
      return;
    }

    if (!userRole) return;

    const allowed = canAccessRoute(
      router.pathname,
      userRole
    );

    if (!allowed) {
      router.replace("/403");
      return;
    }

    setCheckingPermission(false);
  }, [status, userRole, router]);


  if (checkingPermission) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Checking permissions...
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }


  if (status === "unauthenticated") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 8,
        }}
      >
        <span>
          Something went wrong. Please try logging in again.
        </span>

        <Link href="/">
          Login
        </Link>
      </div>
    );
  }

  if (
    status === "authenticated" &&
    userRole &&
    !allowedRoles.includes(userRole)
  ) {
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Your role is not authorized to access this page.
    </div>);
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    router.replace("/403");
    return null;
  }



  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: "white", padding: 16, fontSize: 18 }}>
          Admin Panel
        </div>

        <PrivateSidebar />

      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ background: "#fff", paddingLeft: 16 }}>
          <h3>Welcome Mr. {userName}</h3>
          <Button
            type="primary"
            style={{ position: "absolute", top: 16, right: 16 }}
            // onClick={() => router.push('/')}
            onClick={handleLogout}
            danger
          >
            Logout
          </Button>

          {/* Sidebar */}
        </Header>

        {/* Content */}
        <Content style={{ margin: "0px 0px 0px 0px " }}>
          <div className="admin_header">
            <div>
              {breadcrumbItems?.length ? (
                <Breadcrumb items={breadcrumbItems} />
              ) : null}
            </div>

            {headerRightSec ? <div>{headerRightSec}</div> : null}
          </div>

          <div style={{ padding: 20, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
