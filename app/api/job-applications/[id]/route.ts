// app/api/job-applications/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: params.id },
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, age, address, phone, email, experience, status, positionId } =
      body;

    const application = await prisma.jobApplication.update({
      where: { id: params.id },
      data: {
        name,
        age,
        address,
        phone,
        email,
        experience,
        status,
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
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jobApplication.delete({
      where: { id: params.id },
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
