import { deleteImportedProfile, moveImportedProfileService } from "@/lib/modules/imported-profile/imported-profile.service";
import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    const id = Number(req.query.id);
    const body = req.body;
    // console.log("id", id)
    // console.log("method", req.method)
    // console.log("body", req.body)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    }


    // SUSPEND importedProfile
    if (req.method === "PATCH") {
      // return res.status(200).json({
      //   success: true,
      //   message:
      //     "importedProfile suspended",
      // });

    }

    if (req.method === "POST") {
      const action = req.query.action as string;
      // console.log("++++++ USED THIS")

      if (action === "singleMove") {
        // Handle single move action
        await moveImportedProfileService(id, body);

        return res.status(200).json({
          success: true,
          message:
            "importedProfile moved",
        });
      }


    }

    if (req.method === "DELETE") {

      await deleteImportedProfile(id);

      return res.status(200).json({
        success: true,
        message:
          "importedProfile deleted",
      });

    }

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    });


  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten(),
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}