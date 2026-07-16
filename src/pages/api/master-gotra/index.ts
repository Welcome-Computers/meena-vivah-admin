import type { NextApiRequest, NextApiResponse } from "next";

import {
  createGotra,
  getGotras,
} from "@/lib/modules/master-gotra/master-gotra.service";

import {
  createGotraSchema,
  createGotrasSchema,
} from "@/lib/modules/master-gotra/master-gotra.validation";
import { apiErrorHandler } from "@/lib/utility/apiErrorHandler";
import { VerifySession } from "@/lib/modules/admin/VerifySession";

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
        const auth = await VerifySession(req);
        if (!auth) {
          return res.status(401).json({
            success: false,
    message: "Unauthorized Please Login",

          });
        }

        // existing code
        const payload = Array.isArray(req.body)
          ? createGotrasSchema.parse(req.body)
          : createGotraSchema.parse(req.body);

        const result = await createGotra(payload, auth.id);

        return res.status(201).json({
          success: true,
          message: "Gotra created successfully.",
          data: result,
        });
      } catch (error: any) {
        return apiErrorHandler(error, res);
      }
    }

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return apiErrorHandler(error, res);
  }
}
