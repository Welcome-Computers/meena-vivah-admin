import {
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const masterOccupation =
  mysqlTable("master_occupation", {
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

export type MasterOccupation =
  typeof masterOccupation.$inferSelect;

export type NewMasterOccupation =
  typeof masterOccupation.$inferInsert;