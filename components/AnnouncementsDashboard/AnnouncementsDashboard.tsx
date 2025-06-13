"use client";
import { useState } from "react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Announcement } from "@/types";

interface AnnouncementForm {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  badge: string;
}

export default function AnnouncementsDashboard() {
  const { announcements, loading, error, refetch } = useAnnouncements();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AnnouncementForm>({
    imageUrl: "",
    title: "",
    description: "",
    link: "",
    linkText: "",
    badge: "",
  });

  const resetForm = () => {
    setFormData({
      imageUrl: "",
      title: "",
      description: "",
      link: "",
      linkText: "",
      badge: "",
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      const url = editingId
        ? `/api/announcements/${editingId}`
        : "/api/announcements";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          badge: formData.badge || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save announcement");
      }

      resetForm();
      refetch();
    } catch (err) {
      console.error("Error saving announcement:", err);
      alert("Failed to save announcement");
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      imageUrl: announcement.imageUrl,
      title: announcement.title,
      description: announcement.description,
      link: announcement.link,
      linkText: announcement.linkText,
      badge: announcement.badge || "",
    });
    setEditingId(announcement.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete announcement");
      }

      refetch();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Failed to delete announcement");
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const announcement = announcements.find((a) => a.id === id);
      if (!announcement) return;

      const response = await fetch(`/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...announcement,
          isActive: !isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update announcement");
      }

      refetch();
    } catch (err) {
      console.error("Error updating announcement:", err);
      alert("Failed to update announcement");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading announcements...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Error Loading Announcements
          </h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Announcements Dashboard
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage and organize your announcements
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <span>✨</span>
                <span className="text-sm sm:text-base">
                  Create Announcement
                </span>
              </span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm sm:text-base">
                    📢
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    Total Announcements
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {announcements.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm sm:text-base">
                    ✅
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    Active
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {announcements.filter((a) => a.isActive).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm sm:text-base">
                    ⏸️
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    Inactive
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {announcements.filter((a) => !a.isActive).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Form */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isCreating
              ? "opacity-100 translate-y-0 mb-6 sm:mb-8"
              : "opacity-0 -translate-y-4 h-0 overflow-hidden"
          }`}
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs sm:text-sm">✏️</span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                {editingId ? "Edit" : "Create"} Announcement
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 text-sm sm:text-base"
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 text-sm sm:text-base"
                    required
                    placeholder="Enter announcement title"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl h-24 sm:h-32 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 resize-none text-sm sm:text-base"
                  required
                  placeholder="Describe your announcement..."
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Link
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 text-sm sm:text-base"
                    required
                    placeholder="https://example.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) =>
                      setFormData({ ...formData, linkText: e.target.value })
                    }
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 text-sm sm:text-base"
                    required
                    placeholder="Learn More"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Badge (optional)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 text-sm sm:text-base"
                  placeholder="e.g., New, Hot, Limited Time"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  {editingId
                    ? "💾 Update Announcement"
                    : "✨ Create Announcement"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="space-y-6">
          {announcements.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📢</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No announcements yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first announcement to get started!
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Create Your First Announcement
              </button>
            </div>
          ) : (
            announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] p-6"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Section */}
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner">
                      {announcement.imageUrl ? (
                        <img
                          src={announcement.imageUrl}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          🖼️
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-800 flex-1 min-w-0">
                        {announcement.title}
                      </h3>

                      {announcement.badge && (
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm animate-pulse">
                          {announcement.badge}
                        </span>
                      )}

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                          announcement.isActive
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                        }`}
                      >
                        {announcement.isActive ? "🟢 Active" : "🔴 Inactive"}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {announcement.description}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">
                            Link:
                          </span>
                          <p className="text-blue-600 truncate">
                            {announcement.link}
                          </p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">
                            Link Text:
                          </span>
                          <p className="text-gray-600">
                            {announcement.linkText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          toggleActive(announcement.id, announcement.isActive)
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ${
                          announcement.isActive
                            ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                            : "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                        }`}
                      >
                        {announcement.isActive
                          ? "⏸️ Deactivate"
                          : "▶️ Activate"}
                      </button>

                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
