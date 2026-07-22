export const INACTIVITY_TIME = 15;

export const DEFAUTL_JWT_SECRET = "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8"

export interface SaveUserTokenProps {
  userId: number;
  userType: "admin" | "profile" | "executive";
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