import { prisma } from "./prisma";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

// Define admin emails here
const ADMIN_EMAILS = [
  "mohamed2011305977@gmail.com",
  "Yehyamostafaofficial@gmail.com",
  "lavaacafee@gmail.com",
  "alsqrjlalalsqr@gmail.com",
];

/**
 * Creates or retrieves a user from the database based on the Kinde user info.
 * @param kindeUser - The user info from Kinde
 * @returns The user from your database, or null if not authenticated
 */
export async function getOrCreateUser(
  kindeUser: KindeUser<{ [key: string]: unknown }> | null
) {
  if (!kindeUser) return null;

  try {
    // Check if the user already exists
    const user = await prisma.user.findUnique({
      where: { kindeId: kindeUser.id },
    });

    if (user) return user;

    // Determine if this user should be admin
    const isAdmin =
      (await isFirstUser()) || ADMIN_EMAILS.includes(kindeUser.email || "");

    // Create the new user in the database
    return await prisma.user.create({
      data: {
        kindeId: kindeUser.id,
        email: kindeUser.email || "",
        firstName: kindeUser.given_name || null,
        lastName: kindeUser.family_name || null,
        profileImage: kindeUser.picture || null,
        role: isAdmin ? "admin" : "user",
      },
    });
  } catch (error) {
    console.error("Error getting or creating user:", error);
    throw error;
  }
}

/**
 * Checks if this is the first user in the database
 * @returns True if it's the first user, otherwise false
 */
async function isFirstUser() {
  const count = await prisma.user.count();
  return count === 0;
}
