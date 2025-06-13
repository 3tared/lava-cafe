// app/api/menu/bulk-update-prices/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
}

interface RequestBody {
  items: MenuItem[];
}

export async function PUT(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { message: "Invalid request body. Expected items array." },
        { status: 400 }
      );
    }

    // Validate that all items have required fields
    const invalidItems = items.filter(
      (item) => !item.id || typeof item.price !== "number" || item.price < 0
    );

    if (invalidItems.length > 0) {
      return NextResponse.json(
        {
          message:
            "Invalid items found. All items must have id and valid price.",
        },
        { status: 400 }
      );
    }

    // Use a transaction to update all prices atomically
    const updatePromises = items.map((item) =>
      prisma.menuItem.update({
        where: { id: item.id },
        data: { price: item.price },
      })
    );

    await prisma.$transaction(updatePromises);

    return NextResponse.json({
      message: "Prices updated successfully",
      updatedCount: items.length,
    });
  } catch (error) {
    console.error("Error updating menu prices:", error);

    // Handle specific Prisma errors
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as { code?: string }).code;
      if (code === "P2025") {
        return NextResponse.json(
          { message: "One or more menu items not found" },
          { status: 404 }
        );
      }

      if (code === "P2002") {
        return NextResponse.json(
          { message: "Duplicate entry found" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: "Internal server error while updating prices" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function POST() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
