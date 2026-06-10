import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  createOccupation,
  getOccupations,
} from "@/lib/modules/master-occupation/master-occupation.service";

import {
  createOccupationSchema,
  createOccupationsSchema,
} from "@/lib/modules/master-occupation/master-occupation.validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const data =
        await getOccupations();

      return res.status(200).json(data);
    }


    if (req.method === "POST") {
      try {
        // existing code
        const payload = Array.isArray(req.body)
          ? createOccupationsSchema.parse(req.body)
          : createOccupationSchema.parse(req.body);

        const result = await createOccupation(payload);

        return res.status(201).json({
          success: true,
          message: "Occupation created successfully.",
          data: result,
        });

      } catch (error: any) {

        if (
          error?.message?.includes("already exists")
        ) {
          return res.status(409).json({
            success: false,
            message: error.message,
          });
        }

        if (error?.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "occupation already exists.",
            error: error.sqlMessage,
          });
        }

        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
          error: error.message,
        });
      }

    }


    return res
      .status(405)
      .json({
        message:
          "Method not allowed",
      });

  } catch (error) {
    return res
      .status(500)
      .json(error);
  }
}