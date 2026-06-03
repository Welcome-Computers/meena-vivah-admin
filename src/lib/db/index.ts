// src/lib/db/index.ts

import mysql from "mysql2/promise";

import { drizzle } from "drizzle-orm/mysql2";

import * as schema from "../schema";

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool:
    | mysql.Pool
    | undefined;
}

/**
 * Create MySQL Pool
 */
const pool =
  global.mysqlPool ||

  mysql.createPool({
    host:
      process.env.DB_HOST ||

      "localhost",

    port: Number(
      process.env.DB_PORT
    ) || 3306,

    user:
      process.env.DB_USER,

    password:
      process.env.DB_PASSWORD,

    database:
      process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    maxIdle: 10,

    idleTimeout: 60000,

    queueLimit: 0,

    enableKeepAlive: true,

    keepAliveInitialDelay: 0,
  });

/**
 * Prevent multiple pools
 * during Next.js hot reload
 */
if (
  process.env.NODE_ENV !==
  "production"
) {
  global.mysqlPool = pool;
}

/**
 * Drizzle DB Instance
 */
export const db =
  drizzle(pool, {
    schema,
    mode: "default",
  });

/**
 * Database Health Check
 */
export async function checkDb() {

  try {

    const connection =
      await pool.getConnection();

    console.log(
      "✅ MySQL connected"
    );

    connection.release();

  } catch (error) {

    console.log(
      "❌ MySQL connection failed"
    );

    console.log(error);
  }
}

/**
 * Optional:
 * only run in development
 */
if (
  process.env.NODE_ENV !==
  "production"
) {
  checkDb();
}