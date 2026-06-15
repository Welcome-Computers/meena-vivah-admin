import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: "#112041",

    // Border Radius
    borderRadius: 8,

    // Typography
    fontSize: 14,
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

    // Backgrounds
    colorBgLayout: "#F8FAFC",
    colorBgContainer: "#FFFFFF",

    // Text Colors
    colorText: "#0F172A",
    colorTextSecondary: "#64748B",

    // Border
    colorBorder: "#E2E8F0",

    // Success / Warning / Error
    colorSuccess: "#22C55E",
    colorWarning: "#F59E0B",
    colorError: "#EF4444",
    colorInfo: "#2563EB",
  },

  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 42,
      fontWeight: 500,
    },

    Input: {
      controlHeight: 42,
      borderRadius: 8,
      activeBorderColor: "#2563EB",
      hoverBorderColor: "#2563EB",
    },

    Select: {
      controlHeight: 42,
      borderRadius: 8,
      optionSelectedBg: "#EFF6FF",
    },

    Card: {
      borderRadiusLG: 12,
    },

    Modal: {
      borderRadiusLG: 12,
    },

    Table: {
      borderRadius: 8,
      headerBg: "#F8FAFC",
    },

    Menu: {
      itemBorderRadius: 8,
      itemSelectedBg: "#EFF6FF",
      itemSelectedColor: "#2563EB",
    },

    Tabs: {
      itemSelectedColor: "#2563EB",
      inkBarColor: "#2563EB",
    },
  },
};