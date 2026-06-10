import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getUserByMobile } from "@/lib/modules/profile/profile.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const mobile = req.query.mobile as string;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile is required",
      });
    }

    const data = await getUserByMobile(mobile);

    return res.status(200).json({
      success: true,
      exists: data.length > 0,
      message:
        data.length > 0
          ? "Profile found"
          : "Profile not found",
      items: data,
    });



  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}