import { db } from "@/lib/db";
import { admins } from "@/lib/schema/admin";
import { userTokens } from "@/lib/schema/userTokens";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { DEFAUTL_JWT_SECRET, LogoutServiceProps } from "./admin.types";
import { SaveUserTokenInput, saveUserTokenSchema } from "./admin.validation";


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
  const accessToken = generateAccessToken(admin)
  const refreshToken = generateRefreshToken(admin)

  // const accessToken1 = jwt.sign(
  //   {
  //     id: admin.id,
  //     name: admin.name,
  //     mobile: admin.mobile,
  //     role: admin.role,
  //   },
  //   process.env.JWT_SECRET_TOKEN || DEFAUTL_JWT_SECRET, {
  //   expiresIn: "15m",
  // },
  // );

  // refresh token
  // const refreshToken = jwt.sign(
  //   {
  //     id: admin.id,
  //     name: admin.name,
  //     mobile: admin.mobile,
  //     role: admin.role,
  //   },
  //   process.env.JWT_SECRET_REFRESH_TOKEN || DEFAUTL_JWT_SECRET,
  //   {
  //     expiresIn: "2d",
  //   },
  // );

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


export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // 1. Hash incoming refresh token
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // 2. Find token record
  const tokenRecord = await db.query.userTokens.findFirst({
    where: eq(
      userTokens.refreshTokenHash,
      refreshTokenHash
    ),
  });

  // 3. Token doesn't exist
  if (!tokenRecord) {
    throw new Error("Invalid refresh token");
  }

  // 4. Check refresh token expiration
  if (
    dayjs(tokenRecord.expiresAt).isBefore(dayjs())
  ) {
    throw new Error("Refresh token expired");
  }

  // 5. Get user according to userType
  let user;

  switch (tokenRecord.userType) {
    case "admin":
      user = await getAdminById(tokenRecord.userId);
      break;

    // Future:
    // case "profile":
    //   user = await getProfileById(tokenRecord.userId);
    //   break;

    // case "executive":
    //   user = await getExecutiveById(tokenRecord.userId);
    //   break;

    default:
      throw new Error(
        `Unsupported user type: ${tokenRecord.userType}`
      );
  }

  // 6. User not found
  if (!user) {
    throw new Error("User not found");
  }

  // 7. Update token usage information
  await db
    .update(userTokens)
    .set({
      lastUsedAt: new Date(),
    })
    .where(
      eq(userTokens.id, tokenRecord.id)
    );

  // 8. Generate new access token
  const accessToken = generateAccessToken({
    id: user.id,
    userType: tokenRecord.userType,
    tokenVersion: tokenRecord.tokenVersion,
  });

  // 9. New access token expiry = 30 minutes
  const accessTokenExpires = dayjs()
    .add(30, "minute")
    .valueOf();

  return {
    accessToken,
    accessTokenExpires,
    refreshToken,
    user,
  };
};


export const getAdminById = async (id: number) => {
  const admin = await db.query.admins.findFirst({
    where: eq(admins.id, id),
  });

  return admin;
};


export const generateAccessToken = (admin: {
  id: number;
  name: string | null;
  mobile: string;
  role: string;
}) => {
  return jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      mobile: admin.mobile,
      role: admin.role,
    },
    process.env.JWT_SECRET_TOKEN || DEFAUTL_JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (admin: {
  id: number;
  name: string | null;
  mobile: string;
  role: string;
}) => {
  return jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      mobile: admin.mobile,
      role: admin.role,
    },
    process.env.JWT_SECRET_REFRESH_TOKEN || DEFAUTL_JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};