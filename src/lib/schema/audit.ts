// export const auditLogs = mysqlTable("audit_logs", {
//   id: serial("id").primaryKey(),

//   adminId: int("admin_id").notNull(),

//   action: varchar("action", { length: 100 }),

//   tableName: varchar("table_name", { length: 100 }),

//   recordId: int("record_id"),

//   oldData: json("old_data"),

//   newData: json("new_data"),

//   createdAt: timestamp("created_at").defaultNow(),
// });