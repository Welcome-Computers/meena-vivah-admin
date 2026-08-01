import { profileToLogin, saveUserToken } from "@/lib/modules/admin/admin.service";
import { ACCESS_TOKEN_TIME } from "@/lib/modules/admin/admin.types";
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

        const result = await profileToLogin(payload);

        // console.log("++++", result)

        await saveUserToken({
          userId: result.profile.id,
          userType: "profile",
          refreshToken: result.refreshToken || "",
          expiresAt: dayjs().add(2, "day").toDate(),
          // deviceName: req.headers["sec-ch-ua-platform"] as string,
          deviceName: payload.deviceName,
          ipAddress:
            (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            req.socket.remoteAddress ||
            "",
          userAgent: req.headers["user-agent"] || "",
        });

        const access_token_expires = dayjs().add(ACCESS_TOKEN_TIME, "minute").valueOf();

        return res.status(201).json({
          success: true,
          message: "Profile Login successfully.",
          data: {
            user: result.profile,
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
