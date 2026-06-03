import {
  int,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const addresses = mysqlTable(
  "address",
  {
    id: int("id")
      .primaryKey()
      .autoincrement(),

    user_id: int("user_id").notNull(),

    address: text("address"),

    tehsil: varchar("tehsil", {
      length: 255,
    }),

    state: varchar("state", {
      length: 255,
    }),

    city: varchar("city", {
      length: 255,
    }),

    pincode: varchar("pincode", {
      length: 20,
    }),

    type: varchar("type", {
      length: 50,
    }),
  }
);