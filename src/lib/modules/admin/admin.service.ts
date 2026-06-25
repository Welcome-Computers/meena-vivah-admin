import { db } from "@/lib/db";
import { admins } from "@/lib/schema/admin";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const getAdmin = async (data: any) => {
  const { mobile, password} = data;
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
    process.env.JWT_SECRET_TOKEN ||
      "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8",
    {
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
    process.env.JWT_SECRET_REFRESH_TOKEN ||
      "7f8e2c91a4d5b8f3e6a9c2d7f1b4e8a5c9d3f7e1a6b2c8d4f9e5a1b7c3d6e8",
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
