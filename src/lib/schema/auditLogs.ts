import {
  mysqlTable,
  bigint,
  varchar,
  longtext,
  timestamp,
} from "drizzle-orm/mysql-core";

export const auditLogs = mysqlTable("audit_logs", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),

  adminId: bigint("admin_id", {
    mode: "number",
  }).notNull(),

  action: varchar("action", {
    length: 50,
  }).notNull(),
  module: varchar("module", {
    length: 100,
  }).notNull(),
  recordId: bigint("record_id", {
    mode: "number",
  }),
  oldData: longtext("old_data"),
  newData: longtext("new_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
