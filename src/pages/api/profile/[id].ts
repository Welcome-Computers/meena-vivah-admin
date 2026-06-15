import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";


import {
  getProfileById,
  suspendProfile
} from "@/lib/modules/profile/profile.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    const id = Number(req.query.id);
    console.log("id", id)
    console.log("method", req.method)
    console.log("body", req.body)

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

    // UPDATE PROFILE
    // if (req.method === "PUT") {

    //   const validatedData = updateProfileSchema.parse({ ...req.body, id });

    //   const result =
    //     await updateProfile(
    //       id,
    //       validatedData
    //     );

    //   return res.status(200).json({
    //     success: true,
    //     data: result,
    //   });
    // }

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

    console.log(error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors:
          error.flatten(),
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
}