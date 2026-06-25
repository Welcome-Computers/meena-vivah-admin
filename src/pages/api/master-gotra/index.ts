import type { NextApiRequest, NextApiResponse } from "next";

import {
  createGotra,
  getGotras,
} from "@/lib/modules/master-gotra/master-gotra.service";

import {
  createGotraSchema,
  createGotrasSchema,
} from "@/lib/modules/master-gotra/master-gotra.validation";
import { adminAuth } from "@/lib/modules/admin/adminAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const { search, sortOrder, sortField } = req.query;
      const data = await getGotras({
        search: search as string,
        sortField: sortField as string,
        sortOrder: sortOrder as string,
      });

      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      try {
        // get admin id
        const decodedToken = adminAuth(req) as { id: number };

        // existing code
        const payload = Array.isArray(req.body)
          ? createGotrasSchema.parse(req.body)
          : createGotraSchema.parse(req.body);

        const result = await createGotra(payload, decodedToken);

        return res.status(201).json({
          success: true,
          message: "Gotra created successfully.",
          data: result,
        });
      } catch (error: any) {
        if (error?.message?.includes("already exists")) {
          return res.status(409).json({
            success: false,
            message: error.message,
          });
        }

        if (error?.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "Gotra already exists.",
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

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
