import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyValue = await prisma.companyValue.findUnique({
      where: { id },
    });

    if (!companyValue) {
      return NextResponse.json(
        { error: "Company value not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(companyValue);
  } catch (error) {
    console.error("Error fetching company value:", error);
    return NextResponse.json(
      { error: "Failed to fetch company value" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { value, order, isActive } = body;

    const companyValue = await prisma.companyValue.update({
      where: { id },
      data: {
        value,
        order,
        isActive,
      },
    });

    return NextResponse.json(companyValue);
  } catch (error) {
    console.error("Error updating company value:", error);
    return NextResponse.json(
      { error: "Failed to update company value" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.companyValue.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Company value deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company value:", error);
    return NextResponse.json(
      { error: "Failed to delete company value" },
      { status: 500 }
    );
  }
}
