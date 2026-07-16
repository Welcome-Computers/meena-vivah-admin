import type { NextApiRequest, NextApiResponse } from "next";

import {
  deleteOccupation,
  getOccupationById,
  updateOccupation,
} from "@/lib/modules/master-occupation/master-occupation.service";
import Occupation from "@/pages/master-occupation";
import { db } from "@/lib/db";
import { profiles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = Number(req.query.id);

  try {
    if (req.method === "GET") {
      const data = await getOccupationById(id);

      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const result = await updateOccupation({
        id,
        ...req.body,
      });

      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      // get Occupation
      const occupation = await getOccupationById(id);
      const used = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(eq(profiles.occupation, occupation.code));
      if (used.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Occupation is already used, Cannot delete",
        });
      }

      const result = await deleteOccupation(id);
      return res.status(200).json(result);
    }

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
