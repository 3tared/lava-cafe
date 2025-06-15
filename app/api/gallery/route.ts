// app/api/gallery/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

// GET - Fetch all gallery items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const galleryItems = await prisma.galleryItem.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

// POST - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, category } = body;

    // Validation
    if (!title || !description || !imageUrl || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const galleryItem = await prisma.galleryItem.create({
      data: {
        title,
        description,
        imageUrl,
        category,
      },
    });

    return NextResponse.json(galleryItem, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

// PUT - Update gallery item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, imageUrl, category } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const galleryItem = await prisma.galleryItem.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        imageUrl,
        category,
      },
    });

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.galleryItem.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
