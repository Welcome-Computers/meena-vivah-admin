import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";

import {
  createUser,
  getUsers,
} from "@/lib/modules/user/user.service";

import {
  createUserSchema,
} from "@/lib/modules/user/user.validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    /**
     * CREATE USER
     */
    if (req.method === "POST") {

      const validatedData = createUserSchema.parse(req.body);

      const result = await createUser(validatedData);

      return res.status(201).json({ success: true, data: result });
    }

    /**
     * GET USERS WITH PAGINATION
     */
    if (req.method === "GET") {

      const page = Number(
        req.query.page || 1
      );

      const limit = Number(
        req.query.limit || 10
      );

      const result =
        await getUsers({
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
    if (
      error?.cause?.code ===
      "ER_DUP_ENTRY"
    ) {

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