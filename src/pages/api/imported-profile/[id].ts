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
      return res.status(200).json({
        success: true,
        message:
          "importedProfile suspended",
      });

    }

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    });

  } catch (error) {

    // console.log(error);

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