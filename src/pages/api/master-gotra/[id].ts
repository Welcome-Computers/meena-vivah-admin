import type { NextApiRequest, NextApiResponse } from "next";

import {
  deleteGotra,
  getGotraById,
  updateGotra,
} from "@/lib/modules/master-gotra/master-gotra.service";
import { db } from "@/lib/db";
import { eq, or } from "drizzle-orm";
import { users } from "@/lib/schema/profile";

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

    if (req.method === "PUT") {
      const result = await updateGotra({
        id,
        ...req.body,
      });

      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      // get gotra
      const gotra = await getGotraById(id);

      // check if gotra is used , then disabled delet
      const used = await db
        .select({ id: users.id })
        .from(users)
        .where(
          or(
            eq(users.self_gotra, gotra.code),
            eq(users.m_gotra, gotra.code),
            eq(users.gm_gotra, gotra.code),
            eq(users.mat_gm_gotra, gotra.code),
          ),
        );
      if (used.length > 0) {
        return res.status(400).json({
          sucess: false,
          message: "Gotra is already used , Cannot delete",
        });
      }

      const result = await deleteGotra(id);

      return res.status(200).json(result);
    }

    return res.status(405).json({
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
