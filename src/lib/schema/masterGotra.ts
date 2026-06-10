import {
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const masterGotra =
  mysqlTable("master_gotra", {
    id: int("id").autoincrement().primaryKey(),

    code: varchar("code", {
      length: 20,
    }).notNull(),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    createdAt: timestamp(
      "created_at"
    ).defaultNow(),

    updatedAt: timestamp(
      "updated_at"
    ).defaultNow(),
  });

export type MasterGotra =
  typeof masterGotra.$inferSelect;

export type NewMasterGotra =
  typeof masterGotra.$inferInsert;