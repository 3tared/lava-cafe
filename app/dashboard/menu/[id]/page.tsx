// app/dashboard/menu-items/[id]/page.tsx
import MenuItemForm from "@/components/MenuItemForm/MenuItemForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getMenuItem(id: string) {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return null;
    }

    return JSON.parse(JSON.stringify(menuItem));
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return null;
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const menuItem = await getMenuItem(id);

  return {
    title: menuItem ? `Edit ${menuItem.name}` : "Edit Menu Item",
  };
}

export default async function EditMenuItemPage({ params }: PageProps) {
  const { id } = await params;

  const [menuItem, categories] = await Promise.all([
    getMenuItem(id),
    getCategories(),
  ]);

  if (!menuItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Menu Item</h1>
      <MenuItemForm menuItem={menuItem} categories={categories} />
    </div>
  );
}
