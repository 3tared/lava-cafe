// app/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getOrCreateUser } from "@/lib/user";

// Get current user info
export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create user
    const user = await getOrCreateUser(kindeUser);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Update current user info
export async function PUT(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Prevent updating critical fields
    delete data.kindeId;
    delete data.email;
    delete data.role; // Role should be updated through a separate admin endpoint

    // Update user
    const user = await prisma.user.update({
      where: { kindeId: kindeUser.id },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
