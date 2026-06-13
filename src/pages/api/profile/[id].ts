import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";


import {
  getUserById,
  suspendUser
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

    // GET SINGLE USER
    if (req.method === "GET") {

      const user =
        await getUserById(id);

      return res.status(200).json({
        success: true,
        data: user,
      });
    }

    // UPDATE USER
    // if (req.method === "PUT") {

    //   const validatedData = updateUserSchema.parse({ ...req.body, id });

    //   const result =
    //     await updateUser(
    //       id,
    //       validatedData
    //     );

    //   return res.status(200).json({
    //     success: true,
    //     data: result,
    //   });
    // }

    // SUSPEND USER
    if (req.method === "PATCH") {

      await suspendUser(id);

      return res.status(200).json({
        success: true,
        message:
          "User suspended",
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