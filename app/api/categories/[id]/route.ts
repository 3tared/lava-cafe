import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler for GET requests to fetch a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { menuItems: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handler for PUT requests to update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Extract only the fields that should be updated
    const { name, description, isActive, displayOrder, image } = data;

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        description,
        isActive,
        displayOrder,
        image,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handler for DELETE requests to delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First check if the category has any menu items
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { menuItems: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (category._count.menuItems > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with menu items" },
        { status: 400 }
      );
    }

    // If no menu items, proceed with deletion
    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
