import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        position: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, address, phone, email, experience, positionId } = body;

    const application = await prisma.jobApplication.create({
      data: {
        name,
        age,
        address,
        phone,
        email,
        experience,
        positionId,
      },
      include: {
        position: true,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
