import { useAuth } from "@/hook/useAuth";
import {
  DashboardOutlined,
  ProfileFilled,
  SettingOutlined,
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Breadcrumb, BreadcrumbProps, Button, Layout, Menu } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

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

  console.log({ userName, profilePick, userRole, status })

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

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "profiles",
      icon: <ProfileFilled />,
      label: "Profiles",
      children: [
        {
          key: "/profiles",
          label: "All Profiles",
        },
        {
          key: "/profiles/create_profile",
          label: "Create Profiles",
        },
      ],
    },
    {
      key: "gotra",
      icon: <SettingOutlined />,
      label: "Gotra",
      children: [
        {
          key: "/gotra",
          label: "All Gotra",
        },
        {
          key: "/gotra/create_gotra",
          label: "Create Gotra",
        },
      ],
    },
    {
      key: "master-occupation",
      icon: <UserOutlined />,
      label: "Occupation",
      children: [
        {
          key: "/master-occupation",
          label: "All Occupation",
        },
        {
          key: "/master-occupation/create_occupation",
          label: "Create Occupation",
        },

      ],
    },
    {
      key: "uploader",
      icon: <UploadOutlined />,
      label: "Uploader",
      children: [
        {
          key: "/uploader",
          label: "Create",
        },
      ],
    },
    {
      key: "audit-logs",
      icon: <SettingOutlined />,
      label: "Audit Histroy",
      children: [
        {
          key: "/audit-logs",
          label: "All History",
        },

      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: "white", padding: 16, fontSize: 18 }}>
          Admin Panel
        </div>

        <Menu
          mode="inline"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={(e) => {
            if (e.key.startsWith("/")) {
              router.push(e.key);
            }
          }}
          theme="dark" />

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
