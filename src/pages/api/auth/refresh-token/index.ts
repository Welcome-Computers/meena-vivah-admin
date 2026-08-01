import { getAdmin, getProfileCreatorByMobile, saveUserToken, verifyRefreshToken } from "@/lib/modules/admin/admin.service";
import { ACCESS_TOKEN_TIME } from "@/lib/modules/admin/admin.types";
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
        const isRefreshTokenVerified = verifyRefreshToken(refreshToken)
        // console.log({ isRefreshTokenVerified })
        //         {
        //   isRefreshTokenVerified: {
        //     id: 38,
        //     name: 'Profile Creator',
        //     mobile: '9828784536',
        //     role: 'profile',
        //     iat: 1785379799,
        //     exp: 1785552599
        //   }
        // }

        const decoded: any = verifyRefreshToken(refreshToken);

        const { mobile, role } = decoded;

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

        // const { mobile, role }: any = isRefreshTokenVerified || {}
        // let result: any = null;

        // if (role === "profile") {
        //   result = await getProfileCreatorByMobile({ mobile, role });
        // } else if (role === "admin" || role === "executive") {
        //   result = await getAdmin(res);
        // } else {
        //   return res.status(409).json({
        //     success: false,
        //     message: "login again!!!!",
        //   });
        // }

        await saveUserToken({
          userId: result.admin.id,
          userType: role,
          refreshToken: result.refreshToken,
          expiresAt: dayjs().add(2, "day").toDate(),
          deviceName: req.headers["sec-ch-ua-platform"] as string,
          ipAddress:
            (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
            req.socket.remoteAddress ||
            "",
          userAgent: req.headers["user-agent"] || "",
        });

        const access_token_expires = dayjs().add(ACCESS_TOKEN_TIME, "minute").valueOf();

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
