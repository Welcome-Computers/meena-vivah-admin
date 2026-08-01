import { deleteUserTokens, getAdmin, getProfileCreatorByMobile, getTokenRecordByRefreshToken, saveUserToken, verifyRefreshToken } from "@/lib/modules/admin/admin.service";
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from "@/lib/modules/admin/admin.types";
import { UnauthorizedError } from "@/lib/modules/common/common.service";
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
        const { refreshToken } = req.body;

        if (!refreshToken) {
          throw new UnauthorizedError("Refresh token is required");
        }

        // 1. Verify JWT signature + expiry
        const decoded: any = verifyRefreshToken(refreshToken);

        const { mobile, role } = decoded;

        // 2. Get user
        let result: any;

        if (role === "profile") {
          result = await getProfileCreatorByMobile({
            mobile,
            role,
          });
        } else if (role === "admin" || role === "executive") {
          result = await getAdmin(res);
        } else {
          throw new UnauthorizedError("Invalid user role");
        }

        // 3. Find refresh-token record
        const tokenRecord =
          await getTokenRecordByRefreshToken(refreshToken);

        if (!tokenRecord) {
          throw new UnauthorizedError("Invalid refresh token");
        }

        // 4. Get stored device
        const storedDeviceId = tokenRecord.deviceName;

        if (!storedDeviceId) {
          throw new UnauthorizedError(
            "Device ID not found for this refresh token"
          );
        }

        // 5. Verify token belongs to same user/type
        if (
          tokenRecord.userId !== result.admin.id ||
          tokenRecord.userType !== role
        ) {
          throw new UnauthorizedError("Invalid refresh token");
        }

        // 6. Remove old token
        await deleteUserTokens({
          userId: result.admin.id,
          userType: role,
          deviceName: storedDeviceId,
        });

        // 7. Save new refresh token
        await saveUserToken({
          userId: result.admin.id,
          userType: role,
          refreshToken: result.refreshToken,
          expiresAt: dayjs().add(REFRESH_TOKEN_TIME, "day").toDate(),
          deviceName: storedDeviceId,
          ipAddress:
            (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            req.socket.remoteAddress ||
            "",
          userAgent: req.headers["user-agent"] || "",
        });

        const access_token_expires = dayjs().add(ACCESS_TOKEN_TIME, "minute").valueOf();

        return res.status(201).json({
          success: true,
          message: "Token refreshed successfully.",
          data: {
            user: result.admin,
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            access_token_expires
          },
        });
      } catch (error: any) {
        return res.status(error.statusCode || 401).json({
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
