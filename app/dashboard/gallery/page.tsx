// dashboard/gallery/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  X,
  Upload,
  Eye,
  Calendar,
} from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryFormData {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const GalleryDashboard: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    imageUrl: "",
    category: "indoor",
  });

  const categories = ["indoor", "outdoor", "commercial", "residential"];

  const categoryColors = {
    indoor: "bg-blue-100 text-blue-800 border-blue-200",
    outdoor: "bg-green-100 text-green-800 border-green-200",
    commercial: "bg-purple-100 text-purple-800 border-purple-200",
    residential: "bg-orange-100 text-orange-800 border-orange-200",
  };

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);

    try {
      setLoading(true);

      if (editingItem) {
        const response = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: editingItem.id }),
        });

        if (response.ok) {
          await fetchGalleryItems();
          closeModal();
        }
      } else {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchGalleryItems();
          closeModal();
        }
      }
    } catch (error) {
      console.error("Error saving gallery item:", error);
    } finally {
      setLoading(false);
      setIsAnimating(false);
    }
  };

  // Delete item with animation
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        const response = await fetch(`/api/gallery?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Add fade out animation before removing
          const element = document.getElementById(`gallery-item-${id}`);
          if (element) {
            element.style.transform = "scale(0.8)";
            element.style.opacity = "0";
            setTimeout(() => fetchGalleryItems(), 300);
          } else {
            fetchGalleryItems();
          }
        }
      } catch (error) {
        console.error("Error deleting gallery item:", error);
      }
    }
  };

  // Handle edit
  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
    });
    setShowModal(true);
  };

  // Close modal with animation
  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      setIsAnimating(false);
    }, 150);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: "indoor",
    });
    setEditingItem(null);
  };

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400 to-cyan-500 rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Header with Glassmorphism */}
          <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Gallery Management
                </h1>
                <p className="text-slate-600 mt-2">
                  Manage your stunning collection with ease
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <div className="relative flex items-center gap-2">
                  <Plus size={20} />
                  Add Gallery Item
                </div>
              </button>
            </div>
          </div>

          {/* Search and Filter with Enhanced Styling */}
          <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-64">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search gallery items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/90"
                />
              </div>
              <div className="relative">
                <Filter
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/90 min-w-48"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mt-4 flex items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Showing {filteredItems.length} of {galleryItems.length} items
            </div>
          </div>

          {/* Gallery Grid with Enhanced Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  className="group backdrop-blur-lg bg-white/80 rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      width={400}
                      height={300}
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${categoryColors[item.category as keyof typeof categoryColors]}`}
                      >
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => setSelectedImage(item.imageUrl)}
                        className="bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar size={12} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/20 shadow-xl p-12">
                <div className="text-slate-400 mb-6">
                  <Search size={64} className="mx-auto opacity-50" />
                </div>
                <h3 className="text-2xl font-bold text-slate-600 mb-2">
                  No items found
                </h3>
                <p className="text-slate-500">
                  {searchTerm
                    ? `No gallery items match "${searchTerm}"`
                    : `No items in the ${filterCategory} category`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div
            className={`bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter a captivating title..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe this amazing piece..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Image URL
                </label>
                <div className="relative">
                  <Upload
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      Saving...
                    </div>
                  ) : editingItem ? (
                    "Update Item"
                  ) : (
                    "Create Item"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] animate-scaleIn">
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={600}
              className="rounded-2xl shadow-2xl object-contain max-h-[90vh]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-slate-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default GalleryDashboard;
