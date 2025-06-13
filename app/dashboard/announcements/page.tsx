import AnnouncementsDashboard from "@/components/AnnouncementsDashboard/AnnouncementsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Announcements - Dashboard",
  description: "Create and manage announcements",
};

export default function DashboardAnnouncementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnnouncementsDashboard />
    </div>
  );
}
