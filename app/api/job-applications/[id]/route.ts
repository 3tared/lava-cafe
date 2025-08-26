// app/api/job-applications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        position: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Job application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching job application:", error);
    return NextResponse.json(
      { error: "Failed to fetch job application" },
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
    const {
      name,
      age,
      address,
      phone,
      email,
      experience,
      status,
      positionId,
      pictureUrl,
    } = body;

    const application = await prisma.jobApplication.update({
      where: { id },
      data: {
        name,
        age,
        address,
        phone,
        email,
        experience,
        status,
        pictureUrl,
        positionId,
      },
      include: {
        position: true,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error updating job application:", error);
    return NextResponse.json(
      { error: "Failed to update job application" },
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

    await prisma.jobApplication.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Job application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job application:", error);
    return NextResponse.json(
      { error: "Failed to delete job application" },
      { status: 500 }
    );
  }
}
