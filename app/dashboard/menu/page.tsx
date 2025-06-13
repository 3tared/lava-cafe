// app/dashboard/menu-items/page.tsx

import MenuItemsDashboard from "@/components/MenuItemsDashboard/MenuItemsDashboard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Equivalent to SSR in Pages Router

async function getMenuItems() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return JSON.parse(JSON.stringify(menuItems));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Page() {
  const initialMenuItems = await getMenuItems();

  return <MenuItemsDashboard initialMenuItems={initialMenuItems} />;
}
