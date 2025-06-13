import {
  ICONS,
  QuickAction,
  QuickActionGrid,
} from "@/components/QuickAction/QuickAction";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardOverview() {
  // Fetch counts for dashboard metrics
  const galleryCount = await prisma.galleryItem.count();
  const userCount = await prisma.user.count();
  const employeeCount = await prisma.employee.count();
  const menuCount = await prisma.menuItem.count();

  const cards = [
    {
      title: "Gallery Items",
      count: galleryCount,
      link: "/dashboard/gallery",
      color: "bg-green-500",
    },
    {
      title: "Users",
      count: userCount,
      link: "/dashboard/users",
      color: "bg-orange-500",
    },
    {
      title: "Employees",
      count: employeeCount,
      link: "/dashboard/employees",
      color: "bg-blue-500",
    },
    {
      title: "Menu Items",
      count: menuCount,
      link: "/dashboard/menu",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.link}>
            <div
              className={`${card.color} text-white rounded-lg shadow-md p-6 hover:opacity-90 transition-opacity`}
            >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-3xl font-bold">{card.count}</p>
              <p className="mt-4 text-sm">Manage {card.title.toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>

      <QuickActionGrid>
        <QuickAction href="/dashboard/menu/new" icon={ICONS.MENU} color="blue">
          Add Menu Item
        </QuickAction>

        <QuickAction
          href="/dashboard/gallery"
          icon={ICONS.GALLERY}
          color="green"
        >
          Add Gallery Item
        </QuickAction>

        <QuickAction
          href="/dashboard/events"
          icon={ICONS.CALENDAR}
          color="purple"
        >
          Add Event
        </QuickAction>
        <QuickAction
          href="/dashboard/packages"
          icon={ICONS.DOCUMENT}
          color="pink"
        >
          Add Package
        </QuickAction>
        <QuickAction
          href="/dashboard/carrers"
          icon={ICONS.CAREERS}
          color="blue"
        >
          Carrers
        </QuickAction>
        <QuickAction
          href="/dashboard/employees/new"
          icon={ICONS.USER}
          color="orange"
        >
          Add Employee
        </QuickAction>

        <QuickAction
          href="/dashboard/settings"
          icon={ICONS.SETTINGS}
          color="gray"
        >
          System Settings
        </QuickAction>
      </QuickActionGrid>
    </div>
  );
}
