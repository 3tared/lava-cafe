"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Category } from "@/lib/generated/prisma";

interface CategoryWithMenuItemCount extends Category {
  _count: {
    menuItems: number;
  };
}

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState<CategoryWithMenuItemCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showNotification("error", "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, categoryName: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${categoryName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        showNotification(
          "success",
          `Category "${categoryName}" deleted successfully`
        );
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      showNotification("error", "Failed to delete category");
    }
  };

  const handleToggleActive = async (id: string, currentIsActive: boolean) => {
    try {
      const category = categories.find((c) => c.id === id);
      if (!category) return;

      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...category,
          isActive: !currentIsActive,
        }),
      });

      if (response.ok) {
        setCategories(
          categories.map((c) =>
            c.id === id ? { ...c, isActive: !currentIsActive } : c
          )
        );
        showNotification(
          "success",
          `Category "${category.name}" ${!currentIsActive ? "activated" : "deactivated"}`
        );
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      showNotification("error", "Failed to update category status");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <TagIcon className="h-8 w-8 text-indigo-600" />
                Categories
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your menu categories and organize your items
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard/categories/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-5 w-5" />
                Add New Category
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`mb-6 p-4 rounded-lg border ${
                notification.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {notification.type === "success" ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                )}
                <p
                  className={
                    notification.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {notification.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.div variants={itemVariants}>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading categories...</p>
              </div>
            </div>
          ) : categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No categories yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first menu category
                </p>
                <Link
                  href="/dashboard/categories/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create First Category
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {categories
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((category, index) => (
                    <motion.div
                      key={category.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Category Image */}
                      <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <PhotoIcon className="h-16 w-16 text-gray-400" />
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              category.isActive
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {category.isActive ? (
                              <EyeIcon className="h-3 w-3" />
                            ) : (
                              <EyeSlashIcon className="h-3 w-3" />
                            )}
                            {category.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>

                        {/* Display Order */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 text-gray-700 rounded-full text-xs font-medium border">
                            <Bars3Icon className="h-3 w-3" />
                            {category.displayOrder}
                          </span>
                        </div>
                      </div>

                      {/* Category Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                          {category.name}
                        </h3>

                        {category.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {category.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">
                            {category._count.menuItems} menu items
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleToggleActive(category.id, category.isActive)
                            }
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              category.isActive
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {category.isActive ? "Deactivate" : "Activate"}
                          </motion.button>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={`/dashboard/categories/${category.id}`}
                              className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                              title="Edit category"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Link>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleDelete(category.id, category.name)
                            }
                            disabled={category._count.menuItems > 0}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={
                              category._count.menuItems > 0
                                ? `Cannot delete category with ${category._count.menuItems} menu items`
                                : "Delete category"
                            }
                          >
                            <TrashIcon className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
