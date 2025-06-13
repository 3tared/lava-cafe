// File path: app/dashboard/users/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteUserButton from "@/components/DeleteUserButton/DeleteUserButton";

// Define the User type based on your Prisma schema
type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Date;
};

export default async function DashboardUsers() {
  // Fetch all users from the database
  const users = (
    await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  ).map((user) => ({
    id: user.id,
    name:
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : null,
    email: user.email,
    image: user.profileImage,
    createdAt: user.createdAt,
  })) as User[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link
          href="/dashboard"
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.image ? (
                      <Image
                        className="rounded-full mr-3"
                        src={user.image}
                        alt={`${user.name}'s avatar`}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </span>
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || "Unnamed User"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/users/${user.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <DeleteUserButton
                      userId={user.id}
                      userName={user.name || "this user"}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
