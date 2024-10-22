import {NextResponse} from "next/server";
import * as db from "@/app/libs/db"

export async function GET(request:Request) 
{
  const response = await db.doQuery(`tourneydb`,`select * from fighters`, ['']); 
  return NextResponse.json(response); 
}