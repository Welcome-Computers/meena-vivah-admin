import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  deleteGotra,
  getGotraById,
  updateGotra,
} from "@/lib/modules/master-gotra/master-gotra.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  try {
    if (req.method === "GET") {
      const data =
        await getGotraById(id);

      return res
        .status(200)
        .json(data);
    }

    if (req.method === "PUT") {
      const result =
        await updateGotra({
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
        await deleteGotra(id);

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