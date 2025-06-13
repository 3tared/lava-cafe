// app/api/menu/items/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("API: Starting to fetch menu items...");

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    console.log(
      "API: Query params - categoryId:",
      categoryId,
      "search:",
      search
    );

    // Build where clause for filtering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive" as const,
      };
    }

    console.log("API: Where clause:", JSON.stringify(whereClause));

    // Test database connection first
    console.log("API: Testing database connection...");
    await prisma.$connect();
    console.log("API: Database connected successfully");

    // First, let's check if we have any menu items at all
    const totalCount = await prisma.menuItem.count();
    console.log("API: Total menu items in database:", totalCount);

    if (totalCount === 0) {
      console.log("API: No menu items found in database at all");
      return NextResponse.json([], {
        headers: {
          "X-Debug-Message": "No menu items exist in database",
          "X-Total-Count": "0",
        },
      });
    }

    // Try to fetch menu items with better error handling
    console.log("API: Attempting to fetch menu items with filters...");

    const menuItems = await prisma.menuItem.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          category: {
            name: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });

    console.log("API: Raw menu items found:", menuItems.length);
    console.log(
      "API: Sample item:",
      menuItems[0] ? JSON.stringify(menuItems[0]) : "No items"
    );

    // Transform data to match frontend interface
    const serializedItems = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price), // Ensure price is a number
      description: item.description || "",
      category: item.category?.name || "Uncategorized",
      categoryId: item.categoryId,
    }));

    console.log("API: Serialized items count:", serializedItems.length);
    console.log(
      "API: Sample serialized item:",
      serializedItems[0] ? JSON.stringify(serializedItems[0]) : "No items"
    );

    return NextResponse.json(serializedItems, {
      headers: {
        "X-Total-Count": String(serializedItems.length),
        "X-Debug-Message": `Successfully fetched ${serializedItems.length} items`,
      },
    });
  } catch (error) {
    console.error("API: Error fetching menu items:", error);

    // Enhanced error logging
    if (error instanceof Error) {
      console.error("API: Error name:", error.name);
      console.error("API: Error message:", error.message);
      console.error("API: Error stack:", error.stack);
    }

    // Check if it's a Prisma error
    if (error && typeof error === "object" && "code" in error) {
      interface PrismaError {
        code: string;
        meta?: unknown;
      }
      const prismaError = error as PrismaError;
      console.error("API: Prisma error code:", prismaError.code);
      console.error("API: Prisma error meta:", prismaError.meta);

      // Handle specific database errors
      switch (prismaError.code) {
        case "P1001":
          return NextResponse.json(
            {
              message: "Cannot connect to database",
              error: "Database connection failed",
              debug:
                "Check your database connection string and ensure the database is running",
            },
            { status: 503 }
          );

        case "P2021":
          return NextResponse.json(
            {
              message: "Table 'menuItem' does not exist",
              error: "Database schema issue",
              debug:
                "Run 'npx prisma db push' or 'npx prisma migrate dev' to create the tables",
            },
            { status: 500 }
          );

        case "P1017":
          return NextResponse.json(
            {
              message: "Server has been closed",
              error: "Database connection closed",
              debug: "Database connection was terminated",
            },
            { status: 503 }
          );
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        message: "Internal server error while fetching menu items",
        error: errorMessage,
        debug: "Check server logs for more details",
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log("API: Database disconnected successfully");
    } catch (disconnectError) {
      console.error("API: Error disconnecting from database:", disconnectError);
    }
  }
}

export async function POST(request: NextRequest) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    const {
      name,
      price,
      categoryId,
      description,
      image,
      ingredients,
      isVegan,
      isGlutenFree,
      isPopular,
      isNew,
    } = body;

    // Enhanced validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { message: "Price must be a non-negative number" },
        { status: 400 }
      );
    }

    if (!categoryId || typeof categoryId !== "string") {
      return NextResponse.json(
        { message: "CategoryId is required and must be a string" },
        { status: 400 }
      );
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Description is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    await prisma.$connect();

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Category with provided ID does not exist" },
        { status: 400 }
      );
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        price,
        categoryId,
        description: description.trim(),
        image: image || "",
        ingredients: Array.isArray(ingredients) ? ingredients : [],
        isVegan: Boolean(isVegan),
        isGlutenFree: Boolean(isGlutenFree),
        isPopular: Boolean(isPopular),
        isNew: Boolean(isNew),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        id: newMenuItem.id,
        name: newMenuItem.name,
        price: newMenuItem.price,
        description: newMenuItem.description,
        category: newMenuItem.category.name,
        categoryId: newMenuItem.category.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating menu item:", error);

    const errorCode =
      error && typeof error === "object" && "code" in error
        ? (error as { code: string }).code
        : undefined;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    if (errorCode === "P2002") {
      return NextResponse.json(
        { message: "Menu item with this name already exists" },
        { status: 409 }
      );
    }

    if (errorCode === "P2003") {
      return NextResponse.json(
        { message: "Invalid category ID provided" },
        { status: 400 }
      );
    }

    if (errorCode === "P1001") {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error while creating menu item",
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
