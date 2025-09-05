// app/occasions/page.tsx
import { requireAuth, canAdd, canEdit, canDelete } from "@/lib/auth";
import OccasionsClient from "./OccasionsClient";
import { prisma } from "@/lib/prisma";

export default async function OccasionsPage() {
  // Require authentication and specific roles
  const user = await requireAuth(["admin", "moderator", "employee_viewer"]);

  // Fetch occasions and packages
  const [occasions, packages] = await Promise.all([
    prisma.occasion.findMany({
      include: {
        packageType: true,
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.package.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const serializedOccasions = occasions.map((o) => ({
    ...o,
    date: o.date.toISOString(),
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    notes: o.notes ?? undefined,
    createdBy: {
      firstName: o.createdBy.firstName ?? undefined,
      lastName: o.createdBy.lastName ?? undefined,
      email: o.createdBy.email,
    },
    packageType: {
      ...o.packageType,
      createdAt: o.packageType.createdAt.toISOString(),
      updatedAt: o.packageType.updatedAt.toISOString(),
    },
  }));

  const userPermissions = {
    canAdd: canAdd(user.role),
    canEdit: canEdit(user.role),
    canDelete: canDelete(user.role),
    canView: true,
  };

  const userName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.lastName || user.email;

  const formatRole = (role: string) => {
    return role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25";
      case "moderator":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25";
      case "employee_viewer":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/25";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 my-10 rounded-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header Section with Enhanced Styling */}
        <div className="mb-8 lg:mb-12">
          <div className="backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/20 p-6 sm:p-8 lg:p-10">
            {/* Title with Animation */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Occasions Management
                  </h1>
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Manage birthdays, engagements, and other special occasions
                  with style and precision
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-200">
                  <div className="text-2xl font-bold">
                    {serializedOccasions.length}
                  </div>
                  <div className="text-xs opacity-90">Total Events</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-200">
                  <div className="text-2xl font-bold">{packages.length}</div>
                  <div className="text-xs opacity-90">Packages</div>
                </div>
              </div>
            </div>

            {/* User Info with Enhanced Design */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-2xl border border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Logged in as:
                  </div>
                  <div className="text-gray-900 font-semibold">{userName}</div>
                </div>
              </div>

              <div className="flex items-center">
                <span
                  className={`px-4 py-2 ${getRoleBadgeColor(user.role)} rounded-full text-xs font-bold tracking-wider uppercase transform hover:scale-105 transition-all duration-200`}
                >
                  {formatRole(user.role)}
                </span>
              </div>

              {/* Quick Actions Indicator */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="text-xs text-gray-500">Quick Actions:</div>
                <div className="flex gap-1">
                  {userPermissions.canAdd && (
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      title="Can Add"
                    ></div>
                  )}
                  {userPermissions.canEdit && (
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"
                      title="Can Edit"
                    ></div>
                  )}
                  {userPermissions.canDelete && (
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"
                      title="Can Delete"
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area with Enhanced Container */}
        <div className="backdrop-blur-sm bg-white/60 rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/20 overflow-hidden">
          {/* Content Header */}
          <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 px-6 sm:px-8 lg:px-10 py-4 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Event Dashboard
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live Data</span>
              </div>
            </div>
          </div>

          {/* Client Component Container */}
          <div className="p-6 sm:p-8 lg:p-10">
            <OccasionsClient
              initialOccasions={serializedOccasions}
              packages={packages}
              permissions={userPermissions}
              user={{
                ...user,
                firstName: user.firstName ?? undefined,
                lastName: user.lastName ?? undefined,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Status: Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
