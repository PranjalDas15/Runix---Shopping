
import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse.json({ message: "Keep-alive endpoint is working!" }, {status: 200})
}