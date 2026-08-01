// src/config/menu.config.tsx

import {
  DashboardOutlined,
  ProfileFilled,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";

export interface AppMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  roles: ROLE_TYPES[];
  children?: AppMenuItem[];
}

export const menuItems: AppMenuItem[] = [
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
        key: "/profiles",
        label: "All Profiles",
        roles: ["admin", "executive", "profile"],
      },
      {
        key: "/profiles/create_profile",
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
        key: "/gotra",
        label: "All Gotra",
        roles: ["admin", "executive"],
      },
      {
        key: "/gotra/create_gotra",
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
        key: "/master-occupation",
        label: "All Occupation",
        roles: ["admin", "executive"],
      },
      {
        key: "/master-occupation/create_occupation",
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
        key: "/uploader",
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
        key: "/audit-logs",
        label: "All History",
        roles: ["admin"],
      },
    ],
  },
];