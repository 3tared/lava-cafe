// lib/actions/departments.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function getDepartments() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return {
      success: true,
      data: departments,
    };
  } catch (error) {
    console.error("Error fetching departments:", error);
    return {
      success: false,
      error: "Failed to fetch departments",
    };
  }
}

export async function createDepartment(data: {
  title: string;
  description?: string;
}) {
  try {
    const department = await prisma.department.create({
      data: {
        title: data.title,
        description: data.description || null,
      },
    });

    revalidatePath("/employees");
    revalidatePath("/departments");

    return {
      success: true,
      data: department,
    };
  } catch (error) {
    console.error("Error creating department:", error);
    return {
      success: false,
      error: "Failed to create department",
    };
  }
}
