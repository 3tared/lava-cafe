"use client";

import { useAnnouncements } from "@/hooks/useAnnouncements";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementsList() {
  const { announcements, loading, error } = useAnnouncements();

  if (loading) {
    return <div className="text-center py-8">Loading announcements...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading announcements
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No announcements available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="border rounded-lg p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={announcement.imageUrl}
                alt={announcement.title}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                {announcement.badge && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {announcement.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{announcement.description}</p>
              <Link
                href={announcement.link}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {announcement.linkText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
