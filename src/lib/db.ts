import mysql2 from "mysql2/promise";

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "myapp",
}); 

async function CheckDb() {
  try {
    const connection = await db.getConnection();
    console.log("db connencted");
    connection.release();
  } catch (error) {
    console.log(error);
  }
}  

CheckDb();

export default db;
