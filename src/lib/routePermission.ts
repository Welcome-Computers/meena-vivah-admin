// src/lib/auth/routePermission.ts

import { AppMenuItem, menuItems } from "@/config/menu.config";
import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";

const findMenuItem = (
  items: AppMenuItem[],
  pathname: string
): AppMenuItem | null => {
  for (const item of items) {
    if (item.key === pathname) {
      return item;
    }

    if (item.children) {
      const found = findMenuItem(
        item.children,
        pathname
      );

      if (found) {
        return found;
      }
    }
  }

  return null;
};

export const canAccessRoute = (
  pathname: string,
  role?: ROLE_TYPES | null
): boolean => {
  if (!role) return false;

  const menuItem = findMenuItem(
    menuItems,
    pathname
  );

  // Route isn't defined in permission config
  if (!menuItem) {
    return true;
  }

  return menuItem.roles.includes(role);
};