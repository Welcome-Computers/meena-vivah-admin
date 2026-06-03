import db from "@/lib/db";
import { NextResponse } from "next/server";

export default async function getUser() {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    return NextResponse.json({
      success: true,
      data: rows,
    }); 
  } catch (error) {
    console.log(error, "User Data Cannot Fetched");

    return NextResponse.json({
      success: false,
      data: error,
    });
  }
}
