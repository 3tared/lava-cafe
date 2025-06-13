import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const position = await prisma.jobPosition.findUnique({
      where: { id: params.id },
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, requirements, isActive } = body;

    const position = await prisma.jobPosition.update({
      where: { id: params.id },
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jobPosition.delete({
      where: { id: params.id },
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
