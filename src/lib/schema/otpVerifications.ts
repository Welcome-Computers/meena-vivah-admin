// src/lib/schema/otpVerifications.ts

import {
  bigint,
  datetime,
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const otpVerifications = mysqlTable(
  "otp_verifications",
  {
    id: bigint("id", {
      mode: "number",
    })
      .autoincrement()
      .primaryKey(),

    mobile: varchar("mobile", {
      length: 20,
    }).notNull(),

    otpHash: varchar("otp_hash", {
      length: 255,
    }).notNull(),

    attempts: int("attempts")
      .default(0)
      .notNull(),

    expiresAt: datetime("expires_at").notNull(),

    verifiedAt: datetime("verified_at"),

    createdAt: timestamp("created_at")
      .defaultNow(),
  },
  (table) => [
    index("idx_mobile").on(
      table.mobile
    ),

    index("idx_expires").on(
      table.expiresAt
    ),
  ]
);