// app/api/packages/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UpdatePackageData } from "@/types";
import { prisma } from "@/lib/prisma";

// GET - Fetch single package
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const packageData = await prisma.package.findUnique({
      where: { id },
    });

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { error: "Failed to fetch package" },
      { status: 500 }
    );
  }
}

// PUT - Update package
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: Partial<UpdatePackageData> = await request.json();

    const packageData = await prisma.package.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.originalPrice && { originalPrice: body.originalPrice }),
        ...(body.price && { price: body.price }),
        ...(body.per && { per: body.per }),
        ...(body.description && { description: body.description }),
        ...(body.items && { items: body.items }),
        ...(body.emoji && { emoji: body.emoji }),
        ...(body.popular !== undefined && { popular: body.popular }),
        ...(body.tag && { tag: body.tag }),
        ...(body.discount && { discount: body.discount }),
      },
    });

    return NextResponse.json(packageData);
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}

// DELETE - Delete package
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if package is being used by any events
    const eventsUsingPackage = await prisma.event.findMany({
      where: { packageId: id },
    });

    if (eventsUsingPackage.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete package that is being used by events" },
        { status: 400 }
      );
    }

    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
}
