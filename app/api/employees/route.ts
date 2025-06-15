// app/api/employees/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

// GET - Fetch all employees with their departments
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

// POST - Create a new employee
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const parsedStartDate = new Date(data.startDate);

    const newEmployee = await prisma.employee.create({
      data: {
        name: data.name,
        position: data.position,
        email: data.email || null,
        phone: data.phone || null,
        bio: data.bio || null,
        imageUrl: data.imageUrl || null,
        funFact: data.funFact || null,
        status: data.status,
        startDate: parsedStartDate,
        departmentId: data.departmentId || null,
      },
      include: {
        department: true,
      },
    });

    return NextResponse.json(
      { success: true, data: newEmployee },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
