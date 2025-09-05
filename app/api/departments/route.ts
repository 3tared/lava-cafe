// app/api/departments/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET - Fetch all departments
export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json({ success: true, data: departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

// POST - Create a new department
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newDepartment = await prisma.department.create({
      data: {
        title: data.title,
        description: data.description || null,
      },
    });

    return NextResponse.json(
      { success: true, data: newDepartment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create department" },
      { status: 500 }
    );
  }
}
