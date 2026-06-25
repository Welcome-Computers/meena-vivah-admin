import { db } from "@/lib/db";
import { admins } from "@/lib/schema";
import { auditLogs } from "@/lib/schema/auditLogs";
import { asc, desc, like, eq, and } from "drizzle-orm";

interface AuditPayload {
  adminId: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  module: string;
  recordId?: number;
  oldData?: any;
  newData?: any;
}

export const getAudit = async ({
  search,
  sortField,
  sortOrder,
  moduleFilter,
  actionFilter
}: {
  search: string;
  sortField: string;
  sortOrder: string;
  actionFilter:string;
  moduleFilter:string;
}) => {
  let query = db
    .select({
      id: auditLogs.id,
      adminId: auditLogs.adminId,
      adminName: admins.name,
      isActive:admins.isActive,
      role:admins.role,
      action: auditLogs.action,
      module: auditLogs.module,
      recordId: auditLogs.recordId,
      oldData: auditLogs.oldData,
      newData: auditLogs.newData,
      createdAt: auditLogs.createdAt,
    })
    .from(auditLogs)
    .leftJoin(admins, eq(auditLogs.adminId, admins.id))
    .$dynamic();

  const conditions = [];

if (search) {
  conditions.push(like(admins.name, `%${search}%`));
}

if (moduleFilter) {
  conditions.push(eq(auditLogs.module, moduleFilter));
}

if (actionFilter) {
  conditions.push(eq(auditLogs.action, actionFilter));
}

if (conditions.length) {
  query = query.where(and(...conditions));
}

  if (sortField == "createdAt") {
    query = query.orderBy(
      sortOrder === "ascend"
        ? asc(auditLogs.createdAt)
        : desc(auditLogs.createdAt),
    );
  }

  return query;
};

export const auditLog = async (payload: AuditPayload, tx?: any) => {
  const dbClient = tx || db;

  await dbClient.insert(auditLogs).values({
    adminId: payload.adminId,
    action: payload.action,
    module: payload.module,
    recordId: payload.recordId,
    oldData: payload.oldData ? JSON.stringify(payload.oldData) : null,
    newData: payload.newData ? JSON.stringify(payload.newData) : null,
  });
};
