import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const position = await prisma.jobPosition.findUnique({
      where: { id },
    });

    if (!position) {
      return NextResponse.json(
        { error: "Job position not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(position);
  } catch (error) {
    console.error("Error fetching job position:", error);
    return NextResponse.json(
      { error: "Failed to fetch job position" },
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
    const { title, description, requirements, isActive } = body;

    const position = await prisma.jobPosition.update({
      where: { id },
      data: { title, description, requirements, isActive },
    });

    return NextResponse.json(position);
  } catch (error) {
    console.error("Error updating job position:", error);
    return NextResponse.json(
      { error: "Failed to update job position" },
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

    await prisma.jobPosition.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Job position deleted successfully" });
  } catch (error) {
    console.error("Error deleting job position:", error);
    return NextResponse.json(
      { error: "Failed to delete job position" },
      { status: 500 }
    );
  }
}
