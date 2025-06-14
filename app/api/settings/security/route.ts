import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// app/api/settings/security/route.ts
export async function GET() {
  try {
    let settings = await prisma.securitySettings.findFirst();

    if (!settings) {
      settings = await prisma.securitySettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching security settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const securitySchema = z.object({
      twoFactorAuth: z.boolean(),
      passwordExpiry: z.enum([
        "30days",
        "60days",
        "90days",
        "180days",
        "never",
      ]),
      sessionTimeout: z.enum(["15min", "30min", "1hour", "4hours", "8hours"]),
      ipRestriction: z.boolean(),
      loginAttempts: z.number().min(1).max(10).optional(),
      lockoutDuration: z.number().min(1).max(1440).optional(), // max 24 hours
      allowedIPs: z.array(z.string()).optional(),
      minPasswordLength: z.number().min(6).max(128).optional(),
      requireSpecialChars: z.boolean().optional(),
      requireNumbers: z.boolean().optional(),
      requireUppercase: z.boolean().optional(),
    });

    const validatedData = securitySchema.parse(body);

    let settings = await prisma.securitySettings.findFirst();

    if (settings) {
      settings = await prisma.securitySettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    } else {
      settings = await prisma.securitySettings.create({
        data: validatedData,
      });
    }

    await prisma.activityLog.create({
      data: {
        action: "UPDATED_SETTINGS",
        resource: "SecuritySettings",
        resourceId: settings.id,
        details: { updatedFields: Object.keys(validatedData) },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating security settings:", error);
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
