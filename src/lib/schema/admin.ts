import { mysqlTable ,
  bigint,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";


export const admins = mysqlTable("admins", {
  id: bigint("id",{mode:"number"}).primaryKey().autoincrement(),
 name: varchar("name", { length: 100 }),
  mobile: varchar("mobile",{length:10}).notNull(),

  password: varchar("password", {
    length: 255,
  }).notNull(),
 role: varchar("role", { length: 50 }).default("admin"),
isActive: boolean("is_active")
    .default(true),

  createdAt: timestamp("created_at")
    .defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow(),
  

 
});
