// File path: app/dashboard/users/[userId]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface UserViewPageProps {
  params: {
    userId: string;
  };
}

export default async function UserViewPage({ params }: UserViewPageProps) {
  const { userId } = params;

  // Fetch user details
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If user doesn't exist, show 404
  if (!user) {
    notFound();
  }

  // Format user name
  const fullName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Unnamed User";

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Details</h1>
        <div className="flex space-x-4">
          <Link
            href={`/dashboard/users/${userId}/edit`}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-md text-sm flex items-center"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit User
          </Link>
          <Link
            href="/dashboard/users"
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
            Back to Users
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="mr-6">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={`${fullName}'s avatar`}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">
                    {fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500">First Name</td>
                    <td className="py-2">{user.firstName || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Last Name</td>
                    <td className="py-2">{user.lastName || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Email</td>
                    <td className="py-2">{user.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Role</td>
                    <td className="py-2">{user.role || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500">User ID</td>
                    <td className="py-2">{user.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Kinde ID</td>
                    <td className="py-2">{user.kindeId}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Created At</td>
                    <td className="py-2">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Last Updated</td>
                    <td className="py-2">
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
