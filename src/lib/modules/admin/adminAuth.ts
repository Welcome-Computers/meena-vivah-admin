
import jwt from "jsonwebtoken";

export const adminAuth = (req: any) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN!
  );
};