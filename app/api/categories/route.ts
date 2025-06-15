import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = {} as any; // <-- explicitly "any" if you want to disable strict typing here

    where.isActive = true;

    const categories = await prisma.category.findMany({
      where,
      orderBy: {
        displayOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        _count: {
          select: {
            menuItems: true,
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Extract only the fields that should be included
    const { name, description, isActive, displayOrder, image } = data;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description: description || "",
        isActive: isActive === undefined ? true : isActive,
        displayOrder: displayOrder || 0,
        image: image || "",
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
