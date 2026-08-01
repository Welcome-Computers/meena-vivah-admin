export const INACTIVITY_TIME = 15;

export const ACCESS_TOKEN_TIME = 1; // 1 minute
export const REFRESH_TOKEN_TIME = 2; // 2 days

export type ROLE_TYPES = "admin" | "profile" | "executive";
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