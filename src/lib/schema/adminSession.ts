import {
  mysqlTable,
  bigint,
  varchar,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const adminSessions = mysqlTable(
  "admin_sessions",
  {
    id: bigint("id", { mode: "number" })
      .autoincrement()
      .primaryKey(),

    adminId: bigint("admin_id", {
      mode: "number",
    }).notNull(),

    sessionId: varchar("session_id", {
      length: 255,
    }).notNull(),

    isActive: boolean("is_active").default(true).notNull(),

    expiresAt: timestamp("expires_at").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    sessionIdIdx: uniqueIndex("session_id_idx").on(table.sessionId),
    adminIdIdx: index("admin_id_idx").on(table.adminId),
  })
);