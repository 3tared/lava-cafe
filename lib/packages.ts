// lib/packages.ts
import { prisma } from "@/lib/prisma";

export async function getPackages() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        price: "asc", // Order packages by price in ascending order
      },
    });
    return packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages");
  }
}
