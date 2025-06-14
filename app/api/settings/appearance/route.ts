import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// app/api/settings/appearance/route.ts
export async function GET() {
  try {
    let settings = await prisma.appearanceSettings.findFirst();

    if (!settings) {
      settings = await prisma.appearanceSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching appearance settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const appearanceSchema = z.object({
      theme: z.enum(["light", "dark", "system"]),
      accentColor: z.string(),
      menuLayout: z.enum(["grid", "list"]),
      animationsEnabled: z.boolean(),
      logoUrl: z.string().nullable().optional(),
      faviconUrl: z.string().nullable().optional(),
      brandColor: z.string().optional(),
      showPrices: z.boolean().optional(),
      showDescription: z.boolean().optional(),
      showImages: z.boolean().optional(),
    });

    const validatedData = appearanceSchema.parse(body);

    let settings = await prisma.appearanceSettings.findFirst();

    if (settings) {
      settings = await prisma.appearanceSettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    } else {
      settings = await prisma.appearanceSettings.create({
        data: validatedData,
      });
    }

    await prisma.activityLog.create({
      data: {
        action: "UPDATED_SETTINGS",
        resource: "AppearanceSettings",
        resourceId: settings.id,
        details: { updatedFields: Object.keys(validatedData) },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating appearance settings:", error);
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
