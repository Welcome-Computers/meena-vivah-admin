import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { updateProfile } from "@/lib/modules/profile/profile.service";
import { updateProfileSchema } from "@/lib/modules/profile/profile.validation";
import { ZodError } from "zod";

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


    const profileId = req.body.id as string;


    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "ProfileId is required",
      });
    }

    const validatedData = updateProfileSchema.parse(req.body);

    const result =
      await updateProfile(
        Number(profileId),
        validatedData
      );

    return res.status(200).json({
      success: true,
      data: result,
    });


  } catch (error) {

    if (error instanceof ZodError) {
      // console.log(
      //   JSON.stringify(
      //     error.issues,
      //     null,
      //     2
      //   )
      // );

      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    // console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}