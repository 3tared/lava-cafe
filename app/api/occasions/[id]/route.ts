// app/api/occasions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, canEdit, canDelete } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for occasion update
const updateOccasionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  type: z.string().min(1, "Type is required"),
  packageId: z.string().min(1, "Package is required"),
  peopleCount: z.coerce.number().min(1, "People count must be at least 1"),
  time: z.string().min(1, "Time is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  prepaid: z.coerce
    .number()
    .min(0, "Prepaid amount cannot be negative")
    .default(0),
  notes: z.string().optional(),
});

// GET - Fetch single occasion by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin", "moderator", "employee_viewer"]);

    const { id } = await params;

    const occasion = await prisma.occasion.findUnique({
      where: { id },
      include: {
        packageType: true,
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!occasion) {
      return NextResponse.json(
        { error: "Occasion not found" },
        { status: 404 }
      );
    }

    const serializedOccasion = {
      ...occasion,
      date: occasion.date.toISOString(),
      createdAt: occasion.createdAt.toISOString(),
      updatedAt: occasion.updatedAt.toISOString(),
      notes: occasion.notes ?? undefined,
      createdBy: {
        firstName: occasion.createdBy.firstName ?? undefined,
        lastName: occasion.createdBy.lastName ?? undefined,
        email: occasion.createdBy.email,
      },
      packageType: {
        ...occasion.packageType,
        createdAt: occasion.packageType.createdAt.toISOString(),
        updatedAt: occasion.packageType.updatedAt.toISOString(),
      },
    };

    return NextResponse.json({ occasion: serializedOccasion });
  } catch (error) {
    console.error("Error fetching occasion:", error);
    return NextResponse.json(
      { error: "Failed to fetch occasion" },
      { status: 500 }
    );
  }
}

// PUT - Update occasion
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(["admin", "moderator", "employee_viewer"]);

    // Check if user can edit occasions
    if (!canEdit(user.role)) {
      return NextResponse.json(
        { error: "You don't have permission to edit occasions" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if occasion exists
    const existingOccasion = await prisma.occasion.findUnique({
      where: { id },
    });

    if (!existingOccasion) {
      return NextResponse.json(
        { error: "Occasion not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateOccasionSchema.parse(body);

    // Verify package exists
    const packageExists = await prisma.package.findUnique({
      where: { id: validatedData.packageId },
    });

    if (!packageExists) {
      return NextResponse.json(
        { error: "Selected package not found" },
        { status: 400 }
      );
    }

    // Update the occasion
    const occasion = await prisma.occasion.update({
      where: { id },
      data: {
        name: validatedData.name,
        date: new Date(validatedData.date),
        type: validatedData.type,
        packageId: validatedData.packageId,
        peopleCount: validatedData.peopleCount,
        time: validatedData.time,
        contactNumber: validatedData.contactNumber,
        prepaid: validatedData.prepaid,
        notes: validatedData.notes || null,
      },
      include: {
        packageType: true,
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    // Serialize the response
    const serializedOccasion = {
      ...occasion,
      date: occasion.date.toISOString(),
      createdAt: occasion.createdAt.toISOString(),
      updatedAt: occasion.updatedAt.toISOString(),
      notes: occasion.notes ?? undefined,
      createdBy: {
        firstName: occasion.createdBy.firstName ?? undefined,
        lastName: occasion.createdBy.lastName ?? undefined,
        email: occasion.createdBy.email,
      },
      packageType: {
        ...occasion.packageType,
        createdAt: occasion.packageType.createdAt.toISOString(),
        updatedAt: occasion.packageType.updatedAt.toISOString(),
      },
    };

    return NextResponse.json({
      message: "Occasion updated successfully",
      occasion: serializedOccasion,
    });
  } catch (error) {
    console.error("Error updating occasion:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update occasion" },
      { status: 500 }
    );
  }
}

// DELETE - Delete occasion
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(["admin", "moderator", "employee_viewer"]);

    // Check if user can delete occasions
    if (!canDelete(user.role)) {
      return NextResponse.json(
        { error: "You don't have permission to delete occasions" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if occasion exists
    const existingOccasion = await prisma.occasion.findUnique({
      where: { id },
    });

    if (!existingOccasion) {
      return NextResponse.json(
        { error: "Occasion not found" },
        { status: 404 }
      );
    }

    // Delete the occasion
    await prisma.occasion.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Occasion deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting occasion:", error);
    return NextResponse.json(
      { error: "Failed to delete occasion" },
      { status: 500 }
    );
  }
}
