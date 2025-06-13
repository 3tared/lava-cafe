// dashboard-layout.tsx - Server Component
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/user";
import ClientDashboard from "@/components/ClientDashboard/client-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Lava Cafe",
  description: "Dashboard for Lava Cafe management",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const kindeUser = await getUser();
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/api/auth/login");
  }

  // Create/fetch user in your database
  const user = await getOrCreateUser(kindeUser);

  if (user?.role !== "admin") {
    redirect("/");
  }

  return (
    <ClientDashboard
      user={{
        id: user?.id || "",
        firstName: user?.firstName || "",
        role: user?.role || "",
      }}
      kindeUser={{
        id: kindeUser?.id || "",
        given_name: kindeUser?.given_name || "",
      }}
    >
      {children}
    </ClientDashboard>
  );
}
