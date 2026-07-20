import { db } from "@/lib/db";
import { admins } from "@/lib/schema/admin";
import { userTokens } from "@/lib/schema/userTokens";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";

import jwt from "jsonwebtoken";
import { SaveUserTokenInput, saveUserTokenSchema } from "./admin.validation";
const DEFAUTL_JWT_SECRET = "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8"

export const getAdmin = async (data: any) => {
  const { mobile, password } = data;
  if (!mobile || !password) {
    throw new Error("Passowrd and Mobile required");
  }

  // check mobile number is valid
  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.mobile, mobile));

  if (!admin) {
    throw new Error("Invalied Mobile Number");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  // create refresh token
  const accessToken = jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      mobile: admin.mobile,
      role: admin.role,
    },
    process.env.JWT_SECRET_TOKEN || DEFAUTL_JWT_SECRET, {
    expiresIn: "15m",
  },
  );

  // refresh token
  const refreshToken = jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      mobile: admin.mobile,
      role: admin.role,
    },
    process.env.JWT_SECRET_REFRESH_TOKEN || DEFAUTL_JWT_SECRET,
    {
      expiresIn: "2d",
    },
  );

  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      name: admin.name,
      mobile: admin.mobile,
      role: admin.role,
    },
  };
};

interface LogoutServiceProps {
  accessToken?: string;
  refreshToken?: string;
}

export const logoutService = async ({
  accessToken,
  refreshToken,
}: LogoutServiceProps) => {
  if (!accessToken || !refreshToken) {
    return {
      success: false,
      message: "Access token or refresh token not found",
    };
  }

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await db
    .delete(userTokens)
    .where(eq(userTokens.refreshTokenHash, refreshTokenHash));

  return {
    success: true,
    message: "Logout successful",
  };
};



export const saveUserToken = async (
  data: SaveUserTokenInput
) => {
  const validated =
    saveUserTokenSchema.parse(data);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(validated.refreshToken)
    .digest("hex");

  await db.insert(userTokens).values({
    userId: validated.userId,
    userType: validated.userType,
    refreshTokenHash,
    tokenVersion:
      validated.tokenVersion ?? 0,
    deviceName:
      validated.deviceName ?? null,
    ipAddress:
      validated.ipAddress ?? null,
    userAgent:
      validated.userAgent ?? null,
    lastUsedAt: new Date(),
    expiresAt: validated.expiresAt,
  });
};