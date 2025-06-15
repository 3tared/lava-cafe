// app/api/menu-items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    // Build where clause for filtering by category and search term
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (category && category !== "All") {
      where.category = { name: category };
    }

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    // Count total items for pagination
    const totalCount = await prisma.menuItem.count({ where });

    // Fetch items with related data, sorted and paginated
    const menuItems = await prisma.menuItem.findMany({
      where,
      include: {
        category: true,
        nutritionalInfo: true,
        reviews: { select: { rating: true } },
      },
      orderBy: [
        { isPopular: "desc" },
        { isNew: "desc" },
        { createdAt: "desc" },
      ],
      skip,
      take: limit,
    });

    // Calculate average rating and review count
    const menuItemsWithRating = menuItems.map((item) => ({
      ...item,
      averageRating:
        item.reviews.length > 0
          ? item.reviews.reduce((sum, r) => sum + r.rating, 0) /
            item.reviews.length
          : 0,
      reviewCount: item.reviews.length,
    }));

    return NextResponse.json({
      items: menuItemsWithRating,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      !data.name ||
      !data.description ||
      data.price === undefined ||
      !data.categoryId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the menu item with a transaction to ensure nutritional info is created together
    const result = await prisma.$transaction(async (tx) => {
      // Create the menu item
      const menuItem = await tx.menuItem.create({
        data: {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          image: data.image || "",
          categoryId: data.categoryId,
          ingredients: data.ingredients || [],
          isVegan: Boolean(data.isVegan),
          isGlutenFree: Boolean(data.isGlutenFree),
          isPopular: Boolean(data.isPopular),
          isNew: Boolean(data.isNew),
        },
      });

      // Create nutritional info if provided
      if (data.nutritionalInfo) {
        await tx.nutritionalInfo.create({
          data: {
            calories: parseInt(data.nutritionalInfo.calories) || 0,
            protein: parseInt(data.nutritionalInfo.protein) || 0,
            carbs: parseInt(data.nutritionalInfo.carbs) || 0,
            fat: parseInt(data.nutritionalInfo.fat) || 0,
            menuItemId: menuItem.id,
          },
        });
      }

      // Return the created menu item with its nutritional info
      return await tx.menuItem.findUnique({
        where: { id: menuItem.id },
        include: {
          category: true,
          nutritionalInfo: true,
        },
      });
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
