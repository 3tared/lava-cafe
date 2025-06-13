// lib/actions/employees.ts
"use server";

import { revalidatePath } from "next/cache";

import { EmployeeFormData } from "@/types";
import { prisma } from "../prisma";

export async function getEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      data: employees,
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    return {
      success: false,
      error: "Failed to fetch employees",
    };
  }
}

export async function getEmployeeById(id: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });

    if (!employee) {
      return {
        success: false,
        error: "Employee not found",
      };
    }

    return {
      success: true,
      data: employee,
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return {
      success: false,
      error: "Failed to fetch employee",
    };
  }
}

export async function createEmployee(data: EmployeeFormData) {
  try {
    const parsedStartDate = new Date(data.startDate);

    const employee = await prisma.employee.create({
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
    });

    revalidatePath("/employees");

    return {
      success: true,
      data: employee,
    };
  } catch (error) {
    console.error("Error creating employee:", error);
    return {
      success: false,
      error: "Failed to create employee",
    };
  }
}

export async function updateEmployee(id: string, data: EmployeeFormData) {
  try {
    const parsedStartDate = new Date(data.startDate);

    const employee = await prisma.employee.update({
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
    });

    revalidatePath("/employees");
    revalidatePath(`/employees/${id}`);

    return {
      success: true,
      data: employee,
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    return {
      success: false,
      error: "Failed to update employee",
    };
  }
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.delete({
      where: { id },
    });

    revalidatePath("/employees");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    return {
      success: false,
      error: "Failed to delete employee",
    };
  }
}
