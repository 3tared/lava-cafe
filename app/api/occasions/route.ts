// app/api/occasions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, canAdd } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for occasion creation
const createOccasionSchema = z.object({
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

// GET - Fetch all occasions (if needed separately)
export async function GET() {
  try {
    await requireAuth(["admin", "moderator", "employee_viewer"]);

    const occasions = await prisma.occasion.findMany({
      include: {
        packageType: true,
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const serializedOccasions = occasions.map((o) => ({
      ...o,
      date: o.date.toISOString(),
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
      notes: o.notes ?? undefined,
      createdBy: {
        firstName: o.createdBy.firstName ?? undefined,
        lastName: o.createdBy.lastName ?? undefined,
        email: o.createdBy.email,
      },
      packageType: {
        ...o.packageType,
        createdAt: o.packageType.createdAt.toISOString(),
        updatedAt: o.packageType.updatedAt.toISOString(),
      },
    }));

    return NextResponse.json({ occasions: serializedOccasions });
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return NextResponse.json(
      { error: "Failed to fetch occasions" },
      { status: 500 }
    );
  }
}

// POST - Create new occasion
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(["admin", "moderator", "employee_viewer"]);

    // Check if user can add occasions
    if (!canAdd(user.role)) {
      return NextResponse.json(
        { error: "You don't have permission to add occasions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createOccasionSchema.parse(body);

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

    // Create the occasion
    const occasion = await prisma.occasion.create({
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
        createdById: user.id,
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
      message: "Occasion created successfully",
      occasion: serializedOccasion,
    });
  } catch (error) {
    console.error("Error creating occasion:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create occasion" },
      { status: 500 }
    );
  }
}
