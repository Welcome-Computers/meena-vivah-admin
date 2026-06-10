import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  deleteOccupation,
  getOccupationById,
  updateOccupation,
} from "@/lib/modules/master-occupation/master-occupation.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  try {
    if (req.method === "GET") {
      const data =
        await getOccupationById(id);

      return res
        .status(200)
        .json(data);
    }

    if (req.method === "PUT") {
      const result =
        await updateOccupation({
          id,
          ...req.body,
        });

      return res
        .status(200)
        .json(result);
    }

    if (
      req.method === "DELETE"
    ) {
      const result =
        await deleteOccupation(id);

      return res
        .status(200)
        .json(result);
    }

    return res
      .status(405)
      .json({
        message:
          "Method not allowed",
      });
  } catch (error) {
    return res
      .status(500)
      .json(error);
  }
}