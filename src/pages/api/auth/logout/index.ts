import { serialize } from "cookie";
import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const accessCookie = serialize(
      "accessToken",
      "",
      {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      }
    );

    const refreshCookie = serialize(
      "refreshToken",
      "",
      {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      }
    );

    res.setHeader(
      "Set-Cookie",
      [accessCookie, refreshCookie]
    );

    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });

  } catch {

    return res.status(500).json({
      success: false,
    });

  }
}