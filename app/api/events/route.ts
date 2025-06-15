// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";

import { CreateEventData } from "@/types";
import { prisma } from "@/lib/prisma";

// Force dynamic behavior to prevent caching
export const dynamic = "force-dynamic";

// GET - Fetch all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        package: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body: CreateEventData = await request.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        date: new Date(body.date),
        image: body.image,
        type: body.type,
        location: body.location,
        time: body.time,
        packageId: body.packageId,
      },
      include: {
        package: true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
