import {
  DashboardOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Breadcrumb, BreadcrumbProps, Button, Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  title?: ReactNode;
  headerRightSec?: ReactNode;
  children: ReactNode;
  breadcrumbItems?: BreadcrumbProps["items"];
}

export default function AdminLayout(props: AdminLayoutProps) {

  const { children, title, headerRightSec, breadcrumbItems } = props || {}

  const router = useRouter();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/profiles",
      icon: <SettingOutlined />,
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
        // {
        //   key: "/profiles/update_profile",
        //   label: "Update Profiles",
        // },
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
          theme="dark"
          mode="inline"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={(e) => {
            if (e.key.startsWith("/")) {
              router.push(e.key);
            }
          }}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ background: "#fff", paddingLeft: 16 }}>
          <h3>Welcome Admin</h3>
          <Button
            type="primary"
            style={{ position: "absolute", top: 16, right: 16 }}
            onClick={() => router.push('/')}
            danger>
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

          <div style={{ padding: 20, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}