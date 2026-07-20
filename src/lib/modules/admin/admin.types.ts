export const INACTIVITY_TIME = 15;


export interface SaveUserTokenProps {
  userId: number;
  userType: "admin" | "profile" | "executive";
  refreshToken: string;
  expiresAt: Date;
  deviceName?: string;
  ipAddress?: string;
  userAgent?: string;
}