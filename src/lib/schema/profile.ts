import {
  boolean,
  date,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";

export const profiles = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement(),
  mobile: varchar("mobile", { length: 20, }).notNull(),
  gender: varchar("gender", { length: 20, }),
  name: varchar("name", { length: 255, }).notNull(),
  dob: date("dob"),
  height: int("height", {}),
  education: varchar("education", { length: 255, }),
  occupation: varchar("occupation", { length: 255, }),
  occupation_details: varchar("occupation_details", { length: 255, }),
  fathersname: varchar("fathersname", { length: 255, }),
  mothersname: varchar("mothersname", { length: 255, }),
  fathersoccupation: varchar("fathersoccupation", { length: 255, }),
  mothersoccupation: varchar("mothersoccupation", { length: 255, }),
  self_gotra: varchar("self_gotra", { length: 255, }),
  m_gotra: varchar("m_gotra", { length: 255, }),
  gm_gotra: varchar("gm_gotra", { length: 255, }),
  mat_gm_gotra: varchar("mat_gm_gotra", { length: 255, }),
  preferences: text("preferences"),
  otherinfo: text("otherinfo"),
  isSuspended: boolean("is_suspended").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});