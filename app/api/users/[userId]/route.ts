// File path: app/api/users/[userId]/route.ts
// This file handles GET, PATCH, and DELETE requests for a specific user
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

// Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await request.json();

    // Enhanced admin verification for role changes
    if (data.role) {
      const { getUser } = getKindeServerSession();
      const kindeUser = await getUser();

      if (!kindeUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Check if current user is admin
      const currentUser = await prisma.user.findUnique({
        where: { kindeId: kindeUser.id },
      });

      if (currentUser?.role !== "admin") {
        return NextResponse.json(
          { error: "Only administrators can change user roles" },
          { status: 403 }
        );
      }

      // Prevent self-demotion (optional security measure)
      if (currentUser.id === userId && data.role !== "admin") {
        return NextResponse.json(
          { error: "You cannot remove your own admin privileges" },
          { status: 403 }
        );
      }
    }

    // Rest of your existing logic...
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate email uniqueness if changed
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updateData = {
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.profileImage !== undefined && {
        profileImage: data.profileImage,
      }),
      ...(data.role !== undefined && { role: data.role }),
      updatedAt: new Date(),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
