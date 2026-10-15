export const INACTIVITY_TIME = 15;

export const ACCESS_TOKEN_TIME = 1; // 1 minute
export const REFRESH_TOKEN_TIME = 2; // 2 days

export type ROLE_TYPES = "admin" | "profile" | "executive";
export type STATUS_TYPES = "draft" | "moved" | "approved" | "rejected" | "suspended" | "married";

export const STATUS_VALUES = ['draft', 'moved', 'approved', 'rejected', 'suspended', 'married'] as const;

export const VALID_STATUS: STATUS_TYPES[] = ['draft', 'moved', 'approved', 'rejected', 'suspended', 'married'];

export interface SaveUserTokenProps {
  userId: number;
  userType: ROLE_TYPES;
  refreshToken: string;
  expiresAt: Date;
  deviceName?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface LogoutServiceProps {
  accessToken?: string;
  refreshToken?: string;
}


export type LoginWithOtpProps = {
  id: number;
  name: string | null;
  mobile: string;
  role: ROLE_TYPES;
}


import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  id: number;
  name: string;
  mobile: string;
  role: "admin" | "profile" | "executive";
}