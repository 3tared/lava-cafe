import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// app/api/settings/notifications/route.ts
export async function GET() {
  try {
    let settings = await prisma.notificationSettings.findFirst();

    if (!settings) {
      settings = await prisma.notificationSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const notificationSchema = z.object({
      emailNotifications: z.boolean(),
      newUserNotifications: z.boolean(),
      newOrderNotifications: z.boolean(),
      systemUpdates: z.boolean(),
      marketingEmails: z.boolean(),
      smsNotifications: z.boolean().optional(),
      smsOrderUpdates: z.boolean().optional(),
      pushNotifications: z.boolean().optional(),
      pushOrderAlerts: z.boolean().optional(),
    });

    const validatedData = notificationSchema.parse(body);

    let settings = await prisma.notificationSettings.findFirst();

    if (settings) {
      settings = await prisma.notificationSettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    } else {
      settings = await prisma.notificationSettings.create({
        data: validatedData,
      });
    }

    await prisma.activityLog.create({
      data: {
        action: "UPDATED_SETTINGS",
        resource: "NotificationSettings",
        resourceId: settings.id,
        details: { updatedFields: Object.keys(validatedData) },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating notification settings:", error);
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
