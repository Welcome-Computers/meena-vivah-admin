import { getAdmin, saveUserToken } from "@/lib/modules/admin/admin.service";
// import { serialize } from "cookie";
import dayjs from "dayjs";
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

        await saveUserToken({
          userId: result.admin.id,
          userType: "admin",
          refreshToken: result.refreshToken,
          expiresAt: dayjs().add(2, "day").toDate(),
          deviceName: req.headers["sec-ch-ua-platform"] as string,
          ipAddress:
            (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            req.socket.remoteAddress ||
            "",
          userAgent: req.headers["user-agent"] || "",
        });


        // const refreshCookie = serialize("refreshToken", result.refreshToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "lax",
        //   path: "/",
        //   maxAge: 60 * 60 * 24 * 7, // 7 days
        // });

        // console.log("+++++#### ", refreshCookie)

        // res.setHeader("Set-Cookie", refreshCookie);
        const access_token_expires = dayjs()
          .add(30, "minute")
          .valueOf();

        return res.status(201).json({
          success: true,
          message: "Admin Login successfully.",
          data: {
            user: result.admin,
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            access_token_expires: access_token_expires
          },
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
