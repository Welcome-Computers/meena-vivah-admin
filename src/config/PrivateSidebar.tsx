import { useAuth } from "@/hook/useAuth";
import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";
import {
  DashboardOutlined,
  ProfileFilled,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import React from "react";

const { Sider } = Layout;

interface AppMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  roles: ROLE_TYPES[];
  children?: AppMenuItem[];
}

const PrivateSidebar = () => {
  const router = useRouter();

  const { userRole } = useAuth();

  const menuItems: AppMenuItem[] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      roles: ["admin", "executive", "profile"],
    },

    {
      key: "profiles",
      icon: <ProfileFilled />,
      label: "Profiles",
      roles: ["admin", "executive", "profile"],
      children: [
        {
          key: "/dashboard/profiles",
          label: "All Profiles",
          roles: ["admin", "executive", "profile"],
        },
        {
          key: "/dashboard/profiles/create_profile",
          label: "Create Profiles",
          roles: ["admin", "executive", "profile"],
        },
      ],
    },

    {
      key: "gotra",
      icon: <SettingOutlined />,
      label: "Gotra",
      roles: ["admin", "executive"],
      children: [
        {
          key: "/dashboard/gotra",
          label: "All Gotra",
          roles: ["admin", "executive"],
        },
        {
          key: "/dashboard/gotra/create_gotra",
          label: "Create Gotra",
          roles: ["admin", "executive"],
        },
      ],
    },

    {
      key: "master-occupation",
      icon: <UserOutlined />,
      label: "Occupation",
      roles: ["admin", "executive"],
      children: [
        {
          key: "/dashboard/master-occupation",
          label: "All Occupation",
          roles: ["admin", "executive"],
        },
        {
          key: "/dashboard/master-occupation/create_occupation",
          label: "Create Occupation",
          roles: ["admin", "executive"],
        },
      ],
    },

    {
      key: "uploader",
      icon: <UploadOutlined />,
      label: "Uploader",
      roles: ["admin", "executive"],
      children: [
        {
          key: "/dashboard/uploader",
          label: "Create",
          roles: ["admin", "executive"],
        },
      ],
    },

    {
      key: "audit-logs",
      icon: <SettingOutlined />,
      label: "Audit History",
      roles: ["admin"],
      children: [
        {
          key: "/dashboard/audit-logs",
          label: "All History",
          roles: ["admin"],
        },
      ],
    },
  ];

  /**
   * Filter menu according to logged-in user's role
   */
  const filterMenuByRole = (
    items: AppMenuItem[],
    role: ROLE_TYPES
  ): AppMenuItem[] => {
    return items
      .filter((item) => item.roles.includes(role))
      .map((item) => ({
        ...item,
        children: item.children
          ? filterMenuByRole(item.children, role)
          : undefined,
      }));
  };

  /**
   * Remove custom `roles` property
   * before passing items to Ant Design Menu.
   */
  const convertToAntMenuItems = (
    items: AppMenuItem[]
  ): MenuProps["items"] => {
    return items.map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      children: item.children
        ? convertToAntMenuItems(item.children)
        : undefined,
    }));
  };

  const filteredMenuItems =
    userRole
      ? filterMenuByRole(menuItems, userRole)
      : [];

  const antMenuItems =
    convertToAntMenuItems(filteredMenuItems);

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          padding: 16,
          fontSize: 18,
        }}
      >
        Admin Panel
      </div>

      <Menu
        mode="inline"
        selectedKeys={[router.pathname]}
        items={antMenuItems}
        onClick={(e) => {
          if (e.key.startsWith("/")) {
            router.push(e.key);
          }
        }}
        theme="dark"
      />
    </Sider>
  );
};

export default PrivateSidebar;