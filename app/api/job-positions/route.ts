import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const positions = await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(positions);
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return NextResponse.json(
      { error: "Failed to fetch job positions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, requirements } = body;

    const position = await prisma.jobPosition.create({
      data: { title, description, requirements },
    });

    return NextResponse.json(position, { status: 201 });
  } catch (error) {
    console.error("Error creating job position:", error);
    return NextResponse.json(
      { error: "Failed to create job position" },
      { status: 500 }
    );
  }
}
