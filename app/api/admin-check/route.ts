// app/api/admin-check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Access environment variable on the server side
  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  const isAdmin = adminEmails.includes(email);

  return NextResponse.json({
    isAdmin,
    role: isAdmin ? "admin" : "user",
  });
}
