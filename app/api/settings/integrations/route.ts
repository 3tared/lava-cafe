import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// app/api/settings/integrations/route.ts
export async function GET() {
  try {
    let settings = await prisma.integrationSettings.findFirst();

    if (!settings) {
      settings = await prisma.integrationSettings.create({
        data: {},
      });
    }

    const safeSettings = {
      ...settings,
      stripeSecretKey: settings.stripeSecretKey
        ? "••••••••••••" + settings.stripeSecretKey.slice(-4)
        : "",
      mailchimpApiKey: settings.mailchimpApiKey
        ? "••••••••••••" + settings.mailchimpApiKey.slice(-4)
        : "",
      posApiKey: settings.posApiKey
        ? "••••••••••••" + settings.posApiKey.slice(-4)
        : "",
    };

    return NextResponse.json(safeSettings);
  } catch (error) {
    console.error("Error fetching integration settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const integrationSchema = z.object({
      googleAnalyticsId: z.string().nullable().optional(),
      facebookPixelId: z.string().nullable().optional(),
      mailchimpApiKey: z.string().nullable().optional(),
      mailchimpListId: z.string().nullable().optional(),
      stripePublicKey: z.string().nullable().optional(),
      stripeSecretKey: z.string().nullable().optional(),
      paypalClientId: z.string().nullable().optional(),
      facebookPageId: z.string().nullable().optional(),
      instagramUsername: z.string().nullable().optional(),
      twitterHandle: z.string().nullable().optional(),
      posSystemType: z.string().nullable().optional(),
      posApiKey: z.string().nullable().optional(),
    });

    const validatedData = integrationSchema.parse(body);

    let settings = await prisma.integrationSettings.findFirst();

    if (settings) {
      settings = await prisma.integrationSettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    } else {
      settings = await prisma.integrationSettings.create({
        data: validatedData,
      });
    }

    await prisma.activityLog.create({
      data: {
        action: "UPDATED_SETTINGS",
        resource: "IntegrationSettings",
        resourceId: settings.id,
        details: { updatedFields: Object.keys(validatedData) },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating integration settings:", error);
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
