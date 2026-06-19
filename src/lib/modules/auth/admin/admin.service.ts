import { db } from "@/lib/db";
import { admins } from "@/lib/schema/auth/admin";
import { eq } from "drizzle-orm";

import jwt from "jsonwebtoken";

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

  if (password !== admin.password) {
    throw new Error("Invalied Passowrd");
  }

  // create refresh token
  const accessToken = jwt.sign(
    {
      id: admin.id,
      mobile: admin.mobile,
    },
    process.env.JWT_SECRET_TOKEN || "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8",
    {
      expiresIn: "15m",
    },
  );

  // refresh token
  const refreshToken = jwt.sign(
    {
      id: admin.id,
      mobile: admin.mobile,
    },
    process.env.JWT_SECRET_REFRESH_TOKEN || "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8",
    {
      expiresIn: "2d",
    },
  );

  

  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      mobile: admin.mobile,
    },
  };
};
