import type { NextApiRequest, NextApiResponse } from "next";
import { getAudit } from "@/lib/modules/audit/audit.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { search, sortOrder, sortField,moduleFilter,actionFilter } = req.query;

      const data = await getAudit({
        search: search as string,
        sortField: sortField as string,
        sortOrder: sortOrder as string,
        moduleFilter: moduleFilter as string,
        actionFilter: actionFilter as string,
      });

      return res.status(200).json(data);
    }

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
}