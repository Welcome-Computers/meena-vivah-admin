import { db } from "@/lib/db";
import { admins, adminSessions } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";

export const VerifySession = async (request: NextApiRequest) => {
  // get session cokie

  const sessionId = request.cookies.session_id;
  if (!sessionId) {
    return null;
  }

  const sessions = await db
    .select()
    .from(adminSessions)
    .where(eq(adminSessions.sessionId, sessionId));

  // if (sessions.length === 0) {
  //   return null;
  // }

  const session = sessions[0];

  // then check session cookie exipiary
  if (new Date(session.expiresAt) < new Date()) {
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.sessionId, sessionId));

      return null;
  }
  // get admiin
  const admin = await db
    .select()
    .from(admins)
    .where(eq(admins.id, session.adminId));
  // if (admin.length === 0) {
  //   return null;
  // }
  
  return admin[0];

};
