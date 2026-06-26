import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";

import {
  createImportedProfile,
  getImportedProfiles,
  moveImportedProfiles
} from "@/lib/modules/imported-profile/imported-profile.service";
import { createImportedProfileSchema } from "@/lib/modules/imported-profile/imported-profile.validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    /**
     * CREATE importedProfile
     */
    if (req.method === "POST") {

      const action = req.query.action as string;

      /**
       * BULK CREATE / MOVED
       */

      console.log('+++', action)

      if (action === "bulkMove") {

        if (!Array.isArray(req.body)) {
          return res.status(400).json({
            success: false,
            message: "Ids must be an array"
          });
        }

        const ids =
          req.body.map(
            (id) => Number(id)
          );
        const result =
          await moveImportedProfiles(ids);


        return res.status(200).json({
          success: true,
          ...result
        });

      }

      /**
       * SINGLE CREATE
       */

      const validatedData = createImportedProfileSchema.parse(req.body);
      const result = await createImportedProfile(validatedData);

      return res.status(201).json({ success: true, data: result });
    }


    /**
     * ALL PROFILES LIST
     */

    if (req.method === "GET") {

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);

      const result = await getImportedProfiles({
        page,
        limit,
      });

      return res.status(200).json({
        success: true,
        ...result,
      });
    }

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    });

  } catch (error: any) {

    console.log(error);
    /**
     * Zod Error
     */
    if (
      error instanceof ZodError
    ) {
      return res.status(400).json({
        success: false,
        errors:
          error.flatten(),
      });
    }

    /**
     * Duplicate Entry
     */
    if (error?.cause?.code === "ER_DUP_ENTRY") {

      return res.status(409).json({
        success: false,
        message:
          "Mobile number already exists",
      });
    }

    /**
     * MySQL Error
     */
    if (
      error?.cause?.sqlMessage
    ) {

      return res.status(400).json({
        success: false,
        message:
          error.cause.sqlMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }



}

