import {
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const siblingDetails =
  mysqlTable("sibling_details", {
    id: int("id")
      .primaryKey()
      .autoincrement(),

    user_id: int("user_id").notNull(),

    relation: varchar("relation", {
      length: 50,
    }),

    name: varchar("name", {
      length: 255,
    }),

    education: varchar("education", {
      length: 255,
    }),

    occupation: varchar("occupation", {
      length: 255,
    }),
  });