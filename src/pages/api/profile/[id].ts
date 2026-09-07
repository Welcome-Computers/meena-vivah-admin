import type {
  NextApiRequest,
  NextApiResponse,
} from "next";



import {
  getProfileById,
  suspendProfile
} from "@/lib/modules/profile/profile.service";
import { handleApiError } from "@/lib/utility/apiErrorHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    const id = Number(req.query.id);
    // console.log("id", id)
    // console.log("method", req.method)
    // console.log("body", req.body)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    }

    // GET SINGLE PROFILE
    if (req.method === "GET") {

      const profile =
        await getProfileById(id);

      return res.status(200).json({
        success: true,
        data: profile,
      });
    }

    // SUSPEND PROFILE
    if (req.method === "PATCH") {

      await suspendProfile(id);

      return res.status(200).json({
        success: true,
        message:
          "Profile suspended",
      });

    }

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    });

  } catch (error) {
    return handleApiError(res, error);
  }
}