// lib/auth.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type UserRole = "admin" | "moderator" | "employee_viewer" | "user";

export interface AuthUser {
  id: string;
  kindeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: UserRole;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return null;
  }

  const kindeUser = await getUser();
  if (!kindeUser?.id) {
    return null;
  }

  // Get or create user in database
  let user = await prisma.user.findUnique({
    where: { kindeId: kindeUser.id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        kindeId: kindeUser.id,
        email: kindeUser.email!,
        firstName: kindeUser.given_name || null,
        lastName: kindeUser.family_name || null,
        profileImage: kindeUser.picture || null,
        role: "user", // Default role
      },
    });
  }

  return {
    id: user.id,
    kindeId: user.kindeId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    role: user.role as UserRole,
  };
}

export async function requireAuth(allowedRoles?: UserRole[]) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}

export function canEdit(role: UserRole): boolean {
  return role === "admin" || role === "moderator";
}

export function canDelete(role: UserRole): boolean {
  return role === "admin" || role === "moderator";
}

export function canAdd(role: UserRole): boolean {
  return role === "admin" || role === "moderator";
}

export function canView(role: UserRole): boolean {
  return role === "admin" || role === "moderator" || role === "employee_viewer";
}
