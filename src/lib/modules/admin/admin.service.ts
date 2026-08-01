import { db } from "@/lib/db";
import { admins } from "@/lib/schema/admin";
import { profiles } from "@/lib/schema/profiles";
import { userTokens } from "@/lib/schema/userTokens";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../common/common.service";
import { otpVerifications } from './../../schema/otpVerifications';
import { ACCESS_TOKEN_TIME, LoginWithOtpProps, LogoutServiceProps, REFRESH_TOKEN_TIME, ROLE_TYPES } from "./admin.types";
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

export const getProfileCreatorByMobile = async (data: any) => {
  const { mobile, role } = data;
  if (!mobile) {
    throw new Error("Mobile required");
  }
  // check mobile number is valid
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.mobile, mobile));

  if (!profile) {
    throw new Error("Invalied Mobile Number");
  }

  // create refresh token
  const accessToken = generateAccessToken({ ...profile, role })
  const refreshToken = generateRefreshToken({ ...profile, role })

  return {
    accessToken,
    refreshToken,
    admin: {
      id: profile.id,
      name: profile.name,
      mobile: profile.mobile,
      role,
    },
  };
};

export const sendProfileOtp = async (data: { mobile: string }) => {
  const { mobile } = data;

  if (!mobile) {
    throw new Error("Mobile number is required");
  }

  // Check whether profile exists with this mobile number
  const [profile] = await db
    .select({
      id: profiles.id,
    })
    .from(profiles)
    .where(eq(profiles.mobile, mobile))
    .limit(1);

  if (!profile) {
    throw new Error("Invalid Mobile Number");
  }

  // Generate 6-digit OTP
  const otp = crypto
    .randomInt(100000, 1000000)
    .toString();

  // Hash OTP
  const otpHash = await bcrypt.hash(otp, 10);

  // OTP expires after 5 minutes
  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  // Remove previous OTP for this mobile
  await db
    .delete(otpVerifications)
    .where(eq(otpVerifications.mobile, mobile));

  // Insert latest OTP
  await db.insert(otpVerifications).values({
    mobile,
    otpHash,
    attempts: 0,
    expiresAt,
  });

  // Send OTP
  // await sendSms(mobile, `Your OTP is ${otp}`);

  // Development only
  console.log("OTP:", otp);

  return {
    success: true,
    message: "OTP sent to your registered mobile number",
  };
};

export const profileToLogin = async (data: any) => {
  const { mobile, otp } = data;

  if (!mobile || !otp) {
    throw new Error("OTP and Mobile are required");
  }

  // Find OTP verification record using mobile
  const [otpVerification] = await db
    .select()
    .from(otpVerifications)
    .where(eq(otpVerifications.mobile, mobile));

  if (!otpVerification) {
    throw new Error("Invalid Mobile Number");
  }


  // Verify OTP
  const isMatch = await bcrypt.compare(otp, otpVerification.otpHash);

  if (!isMatch) {
    throw new Error("Invalid OTP");
  }

  const { id, mobile: vMobile } = otpVerification || {};

  const otpVerificationData: LoginWithOtpProps = { id, mobile: vMobile, name: "Profile Creator", role: "profile" }

  // console.log("### ", otpVerificationData);

  // Generate tokens
  const accessToken = generateAccessToken(otpVerificationData);
  const refreshToken = generateRefreshToken(otpVerificationData);

  return {
    accessToken,
    refreshToken,

    profile: {
      id: otpVerification.id,
      name: "Profile Creator",
      mobile: otpVerification.mobile,
      role: "profile",
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


export const deleteUserTokens = async ({
  userId,
  userType,
  deviceName
}: {
  userId: number;
  userType: ROLE_TYPES;
  deviceName: string;
}) => {
  await db
    .delete(userTokens)
    .where(
      and(
        eq(userTokens.userId, userId),
        eq(userTokens.userType, userType),
        eq(userTokens.deviceName, deviceName),
      ),
    );
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
    case "profile":
      user = await getProfileById(tokenRecord.userId);
      break;

    case "executive":
      user = await getExecutiveById(tokenRecord.userId);
      break;

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
    role: tokenRecord.userType,
    name: user.name,
    mobile: user.mobile,
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

export const getProfileById = async (id: number) => {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, id),
  });

  return profile;
};

export const getExecutiveById = async (id: number) => {
  const executive = await db.query.admins.findFirst({
    where: eq(admins.id, id),
  });

  return executive;
};

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN;

if (!JWT_SECRET_TOKEN) {
  throw new Error("JWT_SECRET_TOKEN is not configured");
}

if (!JWT_SECRET_REFRESH_TOKEN) {
  throw new Error("JWT_SECRET_REFRESH_TOKEN is not configured");
}

export const generateAccessToken = ({
  id,
  name,
  mobile,
  role,
}: LoginWithOtpProps) => {
  return jwt.sign(
    { id, name, mobile, role },
    JWT_SECRET_TOKEN,
    { expiresIn: `${ACCESS_TOKEN_TIME}m`, }
  )
};

export const generateRefreshToken = ({
  id,
  name,
  mobile,
  role,
}: LoginWithOtpProps) => {
  return jwt.sign(
    { id, name, mobile, role },
    JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: `${REFRESH_TOKEN_TIME}d`, }
  );
};

export const verifyAccessToken = (token: string) => {
  if (!token) {
    throw new UnauthorizedError("Access token is required");
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET_TOKEN
    );
    return decoded;
  } catch (error) {
    throw new UnauthorizedError(
      "Access token is invalid or expired"
    );
  }
};



export const verifyRefreshToken = (refreshToken: string) => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token is required");
  }

  try {
    return jwt.verify(
      refreshToken,
      JWT_SECRET_REFRESH_TOKEN
    );
  } catch (error) {
    throw new UnauthorizedError(
      "Refresh token is invalid or expired"
    );
  }
};


// import bcrypt from "bcrypt";

export const getTokenRecordByRefreshToken = async (
  refreshToken: string
) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // Hash the incoming raw refresh token
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Find the token record
  const [tokenRecord] = await db
    .select()
    .from(userTokens)
    .where(eq(userTokens.refreshTokenHash, refreshTokenHash))
    .limit(1);

  if (!tokenRecord) {
    throw new Error("Invalid refresh token");
  }

  return tokenRecord;
};