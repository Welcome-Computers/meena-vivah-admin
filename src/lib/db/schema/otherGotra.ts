import {
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const otherGotras =
  mysqlTable("other_gotra", {
    id: int("id")
      .primaryKey()
      .autoincrement(),

    user_id: int("user_id").notNull(),

    other_gotra_relation: varchar(
      "other_gotra_relation",
      {
        length: 255,
      }
    ),

    other_gotra_name: varchar(
      "other_gotra_name",
      {
        length: 255,
      }
    ),
  });