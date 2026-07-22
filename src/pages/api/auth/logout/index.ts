import { logoutService } from "@/lib/modules/admin/admin.service";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const accessToken =
      req.headers.authorization?.replace("Bearer ", "");

    const { refreshToken } = req.body;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing",
      });
    }

    const result = await logoutService({
      accessToken,
      refreshToken,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.setHeader("Set-Cookie", [
      serialize("accessToken", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      }),
      serialize("refreshToken", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      }),
    ]);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
}