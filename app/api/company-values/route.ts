import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const values = await prisma.companyValue.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(values);
  } catch (error) {
    console.error("Error fetching company values:", error);
    return NextResponse.json(
      { error: "Failed to fetch company values" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { value, order } = body;

    const companyValue = await prisma.companyValue.create({
      data: { value, order: order || 0 },
    });

    return NextResponse.json(companyValue, { status: 201 });
  } catch (error) {
    console.error("Error creating company value:", error);
    return NextResponse.json(
      { error: "Failed to create company value" },
      { status: 500 }
    );
  }
}
