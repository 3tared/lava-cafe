// app/dashboard/menu-items/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Menu Item Not Found</h2>
      <p className="mb-6">
        The menu item you&#39;re looking for doesn&#39;t exist or was removed.
      </p>
      <Link
        href="/dashboard/menu"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Return to Menu Items
      </Link>
    </div>
  );
}
