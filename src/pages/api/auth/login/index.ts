import { getAdmin } from "@/lib/modules/admin/admin.service";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      try {
        const payload = req.body;

        const result = await getAdmin(payload);

        const accessCookie = serialize("accessToken", result.accessToken, {
          httpOnly: true,
          path: "/",
          maxAge: 15 * 60,
        });

        const refreshCookie = serialize("refreshToken", result.refreshToken, {
          httpOnly: true,
          path: "/",
          maxAge: 2 * 24 * 60 * 60,
        });

        res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);

        return res.status(201).json({
          success: true,
          message: "Admin Login successfully.",
          data: result.admin,
        });
      } catch (error: any) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }
    }

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
