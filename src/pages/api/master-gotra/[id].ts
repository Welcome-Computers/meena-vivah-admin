import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/lib/db";
import { adminAuth } from "@/lib/modules/admin/adminAuth";
import {
  deleteGotra,
  getGotraById,
  updateGotra,
} from "@/lib/modules/master-gotra/master-gotra.service";
import { profiles } from "@/lib/schema/profiles";
import { eq, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = Number(req.query.id);

  try {
    if (req.method === "GET") {
      const data = await getGotraById(id);

      return res.status(200).json(data);
    }

    // update gotra
    if (req.method === "PUT") {
      // get admin id
      let adminId: number | null = null;
      const decodedToken = adminAuth(req) as { id: number };
      adminId = decodedToken.id;

      const result = await updateGotra(
        {
          id,
          ...req.body,
        },
        adminId,
      );

      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      // get admin id
      let adminId: number | null = null;
      const decodedToken = adminAuth(req) as { id: number };
      adminId = decodedToken.id;

      // get gotra
      const gotra = await getGotraById(id);

      // check if gotra is used , then disabled delet
      const used = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(
          or(
            eq(profiles.self_gotra, gotra.code),
            eq(profiles.m_gotra, gotra.code),
            eq(profiles.gm_gotra, gotra.code),
            eq(profiles.mat_gm_gotra, gotra.code),
          ),
        );
      if (used.length > 0) {
        return res.status(400).json({
          sucess: false,
          message: "Gotra is already used , Cannot delete",
        });
      }

      const result = await deleteGotra(id, adminId);

      return res.status(200).json(result);
    }

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
