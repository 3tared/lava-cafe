// app/api/employees/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch a specific employee by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { success: false, error: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch employee" },
      { status: 500 }
    );
  }
}

// PATCH - Update an employee
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Parse the date string into a Date object
    const parsedStartDate = data.startDate
      ? new Date(data.startDate)
      : undefined;

    const updatedEmployee = await prisma.employee.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update employee" },
      { status: 500 }
    );
  }
}

// DELETE - Remove an employee
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
