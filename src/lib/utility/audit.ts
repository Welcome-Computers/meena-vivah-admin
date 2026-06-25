import { db } from "@/lib/db";
import { auditLogs } from "../schema/auditLogs";

export const createAuditLog = async ({
  adminId,
  action,
  module,
  recordId,
  oldData,
  newData,
}: any) => {
  await db.insert(auditLogs).values({
    adminId,
    action,
    module,
    recordId,
     oldData: oldData
      ? JSON.stringify(oldData)
      : null,
    newData: newData
      ? JSON.stringify(newData)
      : null,
  });
};
