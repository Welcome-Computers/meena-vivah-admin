// src/lib/schema/userTokens.ts

import {
  bigint,
  datetime,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const userTokens = mysqlTable(
  "user_tokens",
  {
    id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),

    userId: bigint("user_id", {
      mode: "number",
    }).notNull(),

    userType: mysqlEnum("user_type", [
      "admin",
      "profile",
      "executive",
    ]).notNull(),

    refreshTokenHash: varchar("refresh_token_hash", {
      length: 255,
    }).notNull(),

    tokenVersion: int("token_version")
      .default(0)
      .notNull(),

    deviceName: varchar("device_name", {
      length: 150,
    }),

    ipAddress: varchar("ip_address", {
      length: 45,
    }),

    userAgent: varchar("user_agent", {
      length: 500,
    }),

    lastUsedAt: datetime("last_used_at"),

    expiresAt: datetime("expires_at").notNull(),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("idx_user").on(
      table.userId,
      table.userType
    ),

    index("idx_refresh_token").on(
      table.refreshTokenHash
    ),

    index("idx_expires").on(
      table.expiresAt
    ),
  ]
);