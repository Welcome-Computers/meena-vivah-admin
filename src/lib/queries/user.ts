import type { NextApiRequest, NextApiResponse } from "next";
import db from "../db/dbCon";



export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const data = await db.query("SELECT * FROM users");
  res.send(data);

}
