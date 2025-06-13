// app/api/menu/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        nutritionalInfo: true,
      },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    // 👇 Fetch related products in the same category (excluding the current one)
    const relatedItems = await prisma.menuItem.findMany({
      where: {
        categoryId: menuItem.categoryId,
        id: { not: id },
      },
      take: 4, // Limit to 4 related items
    });

    return NextResponse.json({
      ...menuItem,
      relatedItems,
    });
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu item" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await params in Next.js 15+
  const { id } = await params;

  try {
    const data = await request.json();
    console.log("🔄 PUT request data:", JSON.stringify(data, null, 2));

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

    // Check if menu item exists
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        nutritionalInfo: true,
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    console.log("📄 Existing item found:", existingItem.name);

    // Start a transaction to handle both menu item and nutritional info updates
    await prisma.$transaction(async (tx) => {
      console.log("🔄 Starting transaction...");
      console.log("📝 Data being processed:", {
        ingredients: data.ingredients,
        nutritionalInfo: data.nutritionalInfo,
        name: data.name,
      });

      // Update the menu item with ingredients
      console.log("📝 Updating menu item with ingredients:", data.ingredients);
      const updatedMenuItem = await tx.menuItem.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          image: data.image || null,
          categoryId: data.categoryId,
          // Handle ingredients array - make sure it's properly formatted
          ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
          isVegan: Boolean(data.isVegan),
          isGlutenFree: Boolean(data.isGlutenFree),
          isPopular: Boolean(data.isPopular),
          isNew: Boolean(data.isNew),
        },
      });
      console.log(
        "✅ Menu item updated, ingredients:",
        updatedMenuItem.ingredients
      );

      // Handle nutritional information
      if (data.nutritionalInfo) {
        const nutritionData = {
          calories: parseInt(data.nutritionalInfo.calories) || 0,
          protein: parseInt(data.nutritionalInfo.protein) || 0,
          carbs: parseInt(data.nutritionalInfo.carbs) || 0,
          fat: parseInt(data.nutritionalInfo.fat) || 0,
        };

        console.log("🍎 Processing nutritional info:", nutritionData);
        console.log(
          "🔍 Existing nutrition info exists:",
          !!existingItem.nutritionalInfo
        );

        try {
          if (existingItem.nutritionalInfo) {
            // Update existing nutritional info
            console.log("🔄 Updating existing nutritional info...");
            const updatedNutrition = await tx.nutritionalInfo.update({
              where: { menuItemId: id },
              data: nutritionData,
            });
            console.log("✅ Nutritional info updated:", updatedNutrition);
          } else {
            // Create new nutritional info
            console.log("➕ Creating new nutritional info...");
            const newNutrition = await tx.nutritionalInfo.create({
              data: {
                ...nutritionData,
                menuItemId: id,
              },
            });
            console.log("✅ Nutritional info created:", newNutrition);
          }
        } catch (nutritionError) {
          console.error("💥 Error handling nutrition info:", nutritionError);
          throw nutritionError;
        }
      } else {
        console.log("⚠️ No nutritional info provided in request");
      }

      console.log("✅ Transaction completed successfully");
    });

    // Fetch the complete updated item with all relations
    const completeUpdatedItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        nutritionalInfo: true,
      },
    });

    console.log(
      "✅ Menu item updated successfully:",
      completeUpdatedItem?.name
    );
    console.log("🧅 Updated ingredients:", completeUpdatedItem?.ingredients);
    console.log("🍎 Updated nutrition:", completeUpdatedItem?.nutritionalInfo);

    return NextResponse.json(completeUpdatedItem);
  } catch (error) {
    console.error("💥 Error updating menu item:", error);

    // Enhanced error logging
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        error: "Failed to update menu item",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("🔍 DELETE request received");
  console.log("🌐 Request URL:", request.url);
  console.log("🔗 Request method:", request.method);

  let id: string;

  try {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    id = resolvedParams.id;
    console.log("🆔 Menu item ID from params:", id);

    // Validate ID format (assuming UUID or similar)
    if (!id || id.trim() === "") {
      console.log("❌ Invalid ID: empty or null");
      return NextResponse.json(
        { error: "Invalid menu item ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Error resolving params:", error);
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  try {
    // Test database connection first
    console.log("🔍 Testing database connection...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");

    // Check if menu item exists
    console.log("🔍 Checking if menu item exists...");
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        nutritionalInfo: true,
      },
    });

    console.log("📄 Existing item:", existingItem);

    if (!existingItem) {
      console.log("❌ Menu item not found with ID:", id);
      return NextResponse.json(
        {
          error: "Menu item not found",
          details: `No menu item found with ID: ${id}`,
        },
        { status: 404 }
      );
    }

    console.log("🗑️ Attempting to delete menu item...");
    console.log("📄 Item details:", {
      id: existingItem.id,
      name: existingItem.name,
      categoryId: existingItem.categoryId,
    });

    // Delete nutritional info first if it exists and isn't automatically cascaded
    if (existingItem.nutritionalInfo) {
      console.log("🗑️ Deleting related nutritional info...");
      await prisma.nutritionalInfo.delete({
        where: { menuItemId: id },
      });
      console.log("✅ Nutritional info deleted");
    }

    // Now delete the menu item
    const deletedItem = await prisma.menuItem.delete({
      where: { id },
    });

    console.log("✅ Menu item deleted successfully:", {
      id: deletedItem.id,
      name: deletedItem.name,
    });

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully",
      deletedItem: {
        id: deletedItem.id,
        name: deletedItem.name,
      },
    });
  } catch (error) {
    console.error("💥 Error deleting menu item:", error);

    // Enhanced error analysis
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      // Handle specific Prisma errors
      if (error.message.includes("Foreign key constraint")) {
        console.error(
          "🔗 Foreign key constraint error - item may be referenced elsewhere"
        );
        return NextResponse.json(
          {
            error: "Cannot delete menu item",
            details:
              "This menu item is referenced by other records and cannot be deleted. Please remove related records first.",
          },
          { status: 409 }
        );
      }

      if (error.message.includes("Record to delete does not exist")) {
        console.error("👻 Item was already deleted or never existed");
        return NextResponse.json(
          {
            error: "Menu item not found",
            details: "The menu item may have already been deleted.",
          },
          { status: 404 }
        );
      }

      // Handle database connection errors
      if (
        error.message.includes("connect") ||
        error.message.includes("timeout")
      ) {
        console.error("🔌 Database connection error");
        return NextResponse.json(
          {
            error: "Database connection error",
            details: "Unable to connect to database. Please try again later.",
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to delete menu item",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
        itemId: id,
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log("🔌 Prisma connection closed");
    } catch (disconnectError) {
      console.error("⚠️ Error disconnecting from Prisma:", disconnectError);
    }
  }
}
