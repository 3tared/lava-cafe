import { PrismaClient } from "../lib/generated/prisma";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Use existing Prisma client if it exists, or create a new one
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Attach Prisma client to global object in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
