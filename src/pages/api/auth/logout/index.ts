import { logoutAdmin } from "@/lib/modules/admin/admin.service";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}

    const sessionId = req.cookies.session_id;
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "SessionID not found",
      });
    }

    await logoutAdmin(sessionId);

    const sessionCookie = serialize("session_id", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    const accessCookie = serialize("accessToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    const refreshCookie = serialize("refreshToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie, sessionCookie]);

    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error: any) {

  return res.status(500).json({
    success: false,
    message: error?.message || "Internal Server Error",
  });

    
  }
}
