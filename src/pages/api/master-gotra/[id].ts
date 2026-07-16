import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { deleteGotra, getGotraById, updateGotra} from "@/lib/modules/master-gotra/master-gotra.service";
import { profiles } from "@/lib/schema/profiles";
import { eq, or } from "drizzle-orm";
import { apiErrorHandler } from "@/lib/utility/apiErrorHandler";
import { VerifySession } from "@/lib/modules/admin/VerifySession";

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
      try {
        
        const auth = await VerifySession(req);
if (!auth) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized Please Login",
  });
}

        const result = await updateGotra(
          {
            id,
            ...req.body,
          },
          auth.id,
        );

        return res.status(200).json(result);
      } catch (error: any) {
        return apiErrorHandler(error, res);
      }
    }

    if (req.method === "DELETE") {
      // get admin id
      try {
      



         const auth = await VerifySession(req);

if (!auth) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized Please Login",

  });
}

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

        const result = await deleteGotra(id, auth.id);

        return res.status(200).json(result);
      } catch (error: any) {
        return apiErrorHandler(error, res);
      }
    }

    return res.status(405).json({
      message: "Method not allowed",
    });

    
  } catch (error) {
  return apiErrorHandler(error,res);
  }
}
