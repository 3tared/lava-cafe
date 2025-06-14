// app/api/settings/general/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const generalSettingsSchema = z.object({
  siteName: z.string().min(1),
  contactEmail: z.string().email(),
  phoneNumber: z.string().min(1),
  address: z.string().min(1),
  timezone: z.string().min(1),
  currency: z.string().default("USD"),
  taxRate: z.number().min(0).max(1).default(0.08),
});

export async function GET() {
  try {
    let settings = await prisma.restaurantSettings.findFirst();

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.restaurantSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching general settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = generalSettingsSchema.parse(body);

    // Find existing settings or create new one
    let settings = await prisma.restaurantSettings.findFirst();

    if (settings) {
      settings = await prisma.restaurantSettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    } else {
      settings = await prisma.restaurantSettings.create({
        data: validatedData,
      });
    }

    // Log the activity
    await prisma.activityLog.create({
      data: {
        action: "UPDATED_SETTINGS",
        resource: "RestaurantSettings",
        resourceId: settings.id,
        details: { updatedFields: Object.keys(validatedData) },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating general settings:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
