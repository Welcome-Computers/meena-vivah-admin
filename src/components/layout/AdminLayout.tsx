import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: any) {
  const router = useRouter();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/biodata",
      icon: <UserOutlined />,
      label: "Biodata",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    }

  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: "white", padding: 16, fontSize: 18 }}>
          Admin Panel
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router.pathname]}
          onClick={(e) => router.push(e.key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ background: "#fff", paddingLeft: 16 }}>
          <h3>Welcome Admin</h3>
        </Header>

        {/* Content */}
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 20,
              background: "#fff",
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}