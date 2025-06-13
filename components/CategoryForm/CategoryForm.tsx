import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/lib/generated/prisma";
import {
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    displayOrder: number;
  }) => void;
  isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    isActive: initialData?.isActive ?? true,
    displayOrder: initialData?.displayOrder || 999,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? parseInt(value) || 0
            : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await onSubmit(formData);
      setSuccess(
        initialData
          ? "Category updated successfully!"
          : "Category created successfully!"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? "Edit Category" : "Create New Category"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Update the category details below"
              : "Fill in the details to add a new category to your menu"}
          </p>
        </motion.div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-green-800">{success}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 space-y-8">
            {/* Category Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                placeholder="Enter category name"
              />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                placeholder="Describe this category..."
              />
              <p className="mt-2 text-xs text-gray-500">
                Optional description to help customers understand this category
              </p>
            </motion.div>

            {/* Image URL */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Image
              </label>
              <div className="relative">
                <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="https://example.com/category-image.jpg"
                />
              </div>
              {formData.image && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 p-3 bg-gray-50 rounded-lg"
                >
                  <p className="text-xs text-gray-600 mb-2">Image Preview:</p>
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      width={96}
                      height={96}
                      src={formData.image}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkw4IDEyTDEyIDhMMTYgMTJMMTIgMTZaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Display Order & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Order
                </label>
                <div className="relative">
                  <Bars3Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="displayOrder"
                    min="1"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="999"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Lower numbers appear first in the menu
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Visibility Status
                </label>
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.isActive
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                      formData.isActive
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <CheckCircleIcon className="h-4 w-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {formData.isActive ? (
                      <EyeIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {formData.isActive ? "Active" : "Inactive"}
                      </span>
                      <p className="text-xs text-gray-500">
                        {formData.isActive
                          ? "Visible on menu"
                          : "Hidden from menu"}
                      </p>
                    </div>
                  </div>
                </motion.label>
              </motion.div>
            </div>

            {/* Category Summary Card */}
            <motion.div variants={itemVariants} className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category Preview
              </h3>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Category"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <PhotoIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                      {formData.name || "Category Name"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {formData.description || "No description provided"}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          formData.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {formData.isActive ? (
                          <EyeIcon className="h-3 w-3" />
                        ) : (
                          <EyeSlashIcon className="h-3 w-3" />
                        )}
                        {formData.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Order: {formData.displayOrder}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-4 justify-end">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </div>
              ) : initialData ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CategoryForm;
