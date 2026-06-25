// importedProfile.ts

import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const importedProfile = mysqlTable("imported_profile", {
  id: int("id")
    .primaryKey()
    .autoincrement(),

  name: varchar("name", { length: 150 }),
  gender: varchar("gender", { length: 20, }),
  mobile: varchar("mobile", { length: 20 }),
  dob: varchar("dob", { length: 50 }),
  fathersname: varchar("fathersname", { length: 150, }),
  self_gotra: varchar("self_gotra", { length: 50, }),
  m_gotra: varchar("m_gotra", { length: 50, }),
  gm_gotra: varchar("gm_gotra", { length: 50, }),
  mat_gm_gotra: varchar("mat_gm_gotra", { length: 50, }),
  otherinfo: text("otherinfo"),
  status: mysqlEnum("status",
    ["draft", "reviewed", "moved", "rejected",]).notNull().default("draft"),
  remarks: text("remarks"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});