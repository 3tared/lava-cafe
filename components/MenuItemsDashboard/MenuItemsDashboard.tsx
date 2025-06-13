"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Category, MenuItem } from "@/lib/generated/prisma";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Filter,
  Sparkles,
  Leaf,
  Star,
  Clock,
  AlertTriangle,
  X,
  Eye,
  Tag,
  DollarSign,
  Info,
} from "lucide-react";

interface MenuItemWithCategory extends MenuItem {
  category: Category;
  isAvailable: boolean;
}

interface DashboardProps {
  initialMenuItems: MenuItemWithCategory[];
}

// View Menu Item Modal Component
const ViewMenuItemModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItemWithCategory | null;
}> = ({ isOpen, onClose, menuItem }) => {
  if (!isOpen || !menuItem) return null;

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case "vegan":
        return <Leaf className="w-4 h-4" />;
      case "popular":
        return <Star className="w-4 h-4" />;
      case "new":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Menu Item Details
                  </h3>
                  <p className="text-sm text-slate-500">
                    View complete information
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image Section */}
            <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-6 overflow-hidden">
              {menuItem.image ? (
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-slate-400 text-center">
                    <div className="w-20 h-20 mx-auto mb-3 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🍽️</span>
                    </div>
                    <span className="text-lg">No Image Available</span>
                  </div>
                </div>
              )}

              {/* Attributes Overlay */}
              {(menuItem.isVegan ||
                menuItem.isGlutenFree ||
                menuItem.isPopular ||
                menuItem.isNew) && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {menuItem.isVegan && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full flex items-center gap-1 shadow-lg">
                      {getAttributeIcon("vegan")}
                      Vegan
                    </span>
                  )}
                  {menuItem.isGlutenFree && (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full shadow-lg">
                      Gluten Free
                    </span>
                  )}
                  {menuItem.isPopular && (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full flex items-center gap-1 shadow-lg">
                      {getAttributeIcon("popular")}
                      Popular
                    </span>
                  )}
                  {menuItem.isNew && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full flex items-center gap-1 shadow-lg">
                      {getAttributeIcon("new")}
                      New
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">
                    {menuItem.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600 font-medium">
                      {menuItem.category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      ${menuItem.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h5 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Item Properties
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          menuItem.isAvailable ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span>
                        {menuItem.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          menuItem.isVegan ? "bg-green-500" : "bg-slate-300"
                        }`}
                      />
                      <span>Vegan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          menuItem.isGlutenFree
                            ? "bg-yellow-500"
                            : "bg-slate-300"
                        }`}
                      />
                      <span>Gluten Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          menuItem.isPopular ? "bg-red-500" : "bg-slate-300"
                        }`}
                      />
                      <span>Popular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          menuItem.isNew ? "bg-blue-500" : "bg-slate-300"
                        }`}
                      />
                      <span>New Item</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {menuItem.description && (
              <div className="mb-6">
                <h5 className="font-semibold text-slate-700 mb-3">
                  Description
                </h5>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700 leading-relaxed">
                    {menuItem.description}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <h6 className="font-medium text-slate-700 mb-2">Created</h6>
                <p className="text-sm text-slate-600">
                  {new Date(menuItem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h6 className="font-medium text-slate-700 mb-2">
                  Last Updated
                </h6>
                <p className="text-sm text-slate-600">
                  {new Date(menuItem.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Link
                href={`/dashboard/menu/${menuItem.id}`}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Item
              </Link>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isDeleting: boolean;
}> = ({ isOpen, onClose, onConfirm, itemName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Delete Menu Item
                </h3>
                <p className="text-sm text-slate-500">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-slate-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                &quot;{itemName}&quot;
              </span>
              ?
            </p>
            <p className="text-sm text-slate-500 mt-2">
              This will permanently remove the item from your menu.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const MenuItemsDashboard: React.FC<DashboardProps> = ({ initialMenuItems }) => {
  // Enhanced state initialization with better error handling
  const [menuItems, setMenuItems] = useState<MenuItemWithCategory[]>(() => {
    // Ensure initialMenuItems is always an array
    if (Array.isArray(initialMenuItems)) {
      console.log("✅ Initial menu items loaded:", initialMenuItems.length);
      return initialMenuItems;
    } else {
      console.warn("⚠️ initialMenuItems is not an array:", initialMenuItems);
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemWithCategory | null>(
    null
  );
  const [showViewModal, setShowViewModal] = useState(false);
  const [itemToView, setItemToView] = useState<MenuItemWithCategory | null>(
    null
  );

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Fetching menu items...");
      const response = await fetch("/api/menu");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📡 API Response:", data);

      // Validate that data is an array
      if (Array.isArray(data)) {
        console.log("✅ Menu items fetched successfully:", data.length);
        setMenuItems(data);
      } else {
        console.error("❌ API response is not an array:", data);
        throw new Error("Invalid data format received from API");
      }
    } catch (error) {
      console.error("💥 Error fetching menu items:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);

      // Don't clear existing menu items if fetch fails
      // setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we don't have initial data
    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      fetchMenuItems();
    }
  }, []);

  const openDeleteModal = (item: MenuItemWithCategory) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (!deletingId) {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const openViewModal = (item: MenuItemWithCategory) => {
    setItemToView(item);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setItemToView(null);
  };

  const handleDelete = async () => {
    if (!itemToDelete) {
      console.log("❌ No item to delete");
      return;
    }

    console.log("🗑️ Starting delete process for:", itemToDelete.name);
    setDeletingId(itemToDelete.id);
    setError(null);

    try {
      const deleteUrl = `/api/menu/${itemToDelete.id}`;
      console.log("🌐 DELETE URL:", deleteUrl);

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Response received - Status:", response.status);

      if (response.ok) {
        console.log("✅ Delete successful, updating UI");

        const updatedItems = menuItems.filter(
          (item) => item.id !== itemToDelete.id
        );
        console.log("📊 Updated menu items count:", updatedItems.length);

        setMenuItems(updatedItems);
        setShowDeleteModal(false);
        setItemToDelete(null);

        console.log("🎉 Menu item deleted successfully!");
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.error ||
          errorData?.message ||
          `HTTP ${response.status}: ${response.statusText}`;

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("💥 Error in delete process:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete menu item";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Ensure menuItems is always an array before operations
  const safeMenuItems = Array.isArray(menuItems) ? menuItems : [];

  const categories = Array.from(
    new Set(safeMenuItems.map((item) => item.category?.name).filter(Boolean))
  );

  const filteredMenuItems = safeMenuItems.filter((item) => {
    if (!item || !item.category) return false;

    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      item.category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const matchesCategory =
      selectedCategory === "all" || item.category.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case "vegan":
        return <Leaf className="w-3 h-3" />;
      case "popular":
        return <Star className="w-3 h-3" />;
      case "new":
        return <Sparkles className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  // Debug logging
  console.log("🔍 Current state:", {
    menuItemsType: typeof menuItems,
    menuItemsIsArray: Array.isArray(menuItems),
    menuItemsLength: Array.isArray(menuItems) ? menuItems.length : "N/A",
    isLoading,
    error,
    filteredCount: filteredMenuItems.length,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Menu Items
            </h1>
            <p className="text-slate-600">
              Manage your restaurant&#39;s delicious offerings
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard/menu/bulk"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4 sm:mt-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Edit All Items Price
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard/menu/new"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4 sm:mt-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Item
            </Link>
          </motion.div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={() => fetchMenuItems()}
              className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white min-w-[200px]"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Debug Info (remove in production) */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
          <strong>Debug Info:</strong>
          <br />
          Menu Items Type: {typeof menuItems}
          <br />
          Is Array: {Array.isArray(menuItems).toString()}
          <br />
          Length: {Array.isArray(menuItems) ? menuItems.length : "N/A"}
          <br />
          Filtered Length: {filteredMenuItems.length}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0"></div>
              </div>
            </motion.div>
          ) : filteredMenuItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No menu items found
              </h3>
              <p className="text-slate-500 mb-4">
                {safeMenuItems.length === 0
                  ? "No menu items available. Start by adding your first item!"
                  : "Try adjusting your search or filters"}
              </p>
              {safeMenuItems.length === 0 && (
                <Link
                  href="/dashboard/menu/new"
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Menu Item
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredMenuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    layout
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-slate-400 text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-slate-200 rounded-full flex items-center justify-center">
                              <span className="text-2xl">🍽️</span>
                            </div>
                            <span className="text-sm">No Image</span>
                          </div>
                        </div>
                      )}

                      {/* Attributes Overlay */}
                      {(item.isVegan ||
                        item.isGlutenFree ||
                        item.isPopular ||
                        item.isNew) && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {item.isVegan && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                              {getAttributeIcon("vegan")}
                              Vegan
                            </span>
                          )}
                          {item.isGlutenFree && (
                            <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                              GF
                            </span>
                          )}
                          {item.isPopular && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">
                              {getAttributeIcon("popular")}
                              Popular
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full flex items-center gap-1">
                              {getAttributeIcon("new")}
                              New
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">
                          {item.category.name}
                        </p>
                        <p className="text-xl font-bold text-indigo-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {/* View Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openViewModal(item)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors duration-200 font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                        </motion.button>

                        {/* Edit Button */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Link
                            href={`/dashboard/menu/${item.id}`}
                            className="w-full inline-flex items-center justify-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors duration-200 font-medium"
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                          </Link>
                        </motion.div>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openDeleteModal(item)}
                          disabled={deletingId === item.id}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View Menu Item Modal */}
      <ViewMenuItemModal
        isOpen={showViewModal}
        onClose={closeViewModal}
        menuItem={itemToView}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={itemToDelete?.name || ""}
        isDeleting={deletingId !== null}
      />
    </div>
  );
};

export default MenuItemsDashboard;
