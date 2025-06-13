// app/dashboard/menu-items/new/page.tsx
import MenuItemForm from "@/components/MenuItemForm/MenuItemForm";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Create New Menu Item",
};

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
  } finally {
    await prisma.$disconnect();
  }
}

export default async function CreateMenuItemPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Menu Item</h1>
      <MenuItemForm categories={categories} />
    </div>
  );
}
