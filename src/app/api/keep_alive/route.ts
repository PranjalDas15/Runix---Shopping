
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Keep-alive endpoint is working!" }, {status: 200})
}