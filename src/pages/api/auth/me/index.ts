import jwt from "jsonwebtoken";

export default async function handler(
  req: any,
  res: any
) {
  try {

    const token = req.cookies.accessToken;

    if (!token) {
      throw new Error();
    }

    const admin = jwt.verify(token, process.env.JWT_SECRET_TOKEN!);

    return res.status(200).json({ success: true, admin, });

  } catch {

    return res.status(401).json({
      success: false,
    });

  }
}