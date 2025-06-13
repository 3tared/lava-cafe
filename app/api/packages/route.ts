// app/api/packages/route.ts
import { NextRequest, NextResponse } from "next/server";

import { CreatePackageData } from "@/types";
import { prisma } from "@/lib/prisma";

// GET - Fetch all packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// POST - Create new package
export async function POST(request: NextRequest) {
  try {
    const body: CreatePackageData = await request.json();

    const packageData = await prisma.package.create({
      data: {
        name: body.name,
        originalPrice: body.originalPrice,
        price: body.price,
        per: body.per,
        description: body.description,
        items: body.items,
        emoji: body.emoji,
        popular: body.popular,
        tag: body.tag,
        discount: body.discount,
      },
    });

    return NextResponse.json(packageData, { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}
