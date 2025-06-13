// categories/menuItemForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Category, MenuItem, NutritionalInfo } from "@/lib/generated/prisma";
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface MenuItemFormProps {
  menuItem?: MenuItem & { nutritionalInfo?: NutritionalInfo | null };
  categories: Category[];
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  menuItem,
  categories,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Image preview states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Ref for debouncing image URL validation
  const imageDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: menuItem?.name || "",
    description: menuItem?.description || "",
    price: menuItem?.price || 0,
    image: menuItem?.image || "",
    categoryId: menuItem?.categoryId || categories[0]?.id || "",
    ingredients: menuItem?.ingredients || [],
    nutritionalInfo: {
      calories: menuItem?.nutritionalInfo?.calories || 0,
      protein: menuItem?.nutritionalInfo?.protein || 0,
      carbs: menuItem?.nutritionalInfo?.carbs || 0,
      fat: menuItem?.nutritionalInfo?.fat || 0,
    },
    isVegan: menuItem?.isVegan || false,
    isGlutenFree: menuItem?.isGlutenFree || false,
    isPopular: menuItem?.isPopular || false,
    isNew: menuItem?.isNew || false,
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [showNutrition, setShowNutrition] = useState(false);

  // Initialize image preview if editing existing item
  useEffect(() => {
    if (menuItem?.image) {
      setImagePreview(menuItem.image);
    }
  }, [menuItem]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (imageDebounceRef.current) {
        clearTimeout(imageDebounceRef.current);
      }
    };
  }, []);

  // Handle image URL validation and preview
  const validateImageUrl = async (url: string) => {
    if (!url.trim()) {
      setImagePreview(null);
      setImageError(false);
      return;
    }

    setImageLoading(true);
    setImageError(false);

    try {
      const img = new window.Image();
      img.onload = () => {
        setImagePreview(url);
        setImageLoading(false);
        setImageError(false);
      };
      img.onerror = () => {
        setImagePreview(null);
        setImageLoading(false);
        setImageError(true);
      };
      img.src = url;
    } catch {
      setImagePreview(null);
      setImageLoading(false);
      setImageError(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith("nutritionalInfo.")) {
      const nutritionField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [nutritionField]:
            type === "number" ? parseInt(value, 10) || 0 : value,
        },
      }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Handle image URL changes with proper debouncing
    if (name === "image") {
      // Clear existing timer
      if (imageDebounceRef.current) {
        clearTimeout(imageDebounceRef.current);
      }

      // Set new timer
      imageDebounceRef.current = setTimeout(() => {
        validateImageUrl(value);
      }, 500);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
    setImageError(false);
  };

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !formData.ingredients.includes(currentIngredient.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient.trim()],
      }));
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const url = menuItem ? `/api/menu/${menuItem.id}` : "/api/menu";
      const method = menuItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to save menu item");
      }

      setSuccess(
        menuItem
          ? "Menu item updated successfully!"
          : "Menu item created successfully!"
      );

      setTimeout(() => {
        router.push("/dashboard/menu");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error("Error saving menu item:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
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
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {menuItem ? "Edit Menu Item" : "Create New Menu Item"}
          </h1>
          <p className="text-gray-600">
            {menuItem
              ? "Update the details below"
              : "Fill in the details to add a new item to your menu"}
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
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Describe your menu item..."
                  />
                </div>
              </motion.div>
            </div>

            {/* Enhanced Image Section */}
            <motion.div variants={itemVariants} className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Item Image
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image URL Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <PhotoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                        imageError
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.image && (
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {imageError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      Unable to load image. Please check the URL.
                    </motion.p>
                  )}
                </div>

                {/* Image Preview */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="relative h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <AnimatePresence mode="wait">
                      {imageLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
                            <p className="text-sm text-gray-500">
                              Loading image...
                            </p>
                          </div>
                        </motion.div>
                      ) : imagePreview ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="relative h-full group"
                        >
                          <Image
                            width={63}
                            height={63}
                            src={imagePreview}
                            alt="Menu item preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <motion.button
                              type="button"
                              onClick={() =>
                                window.open(imagePreview, "_blank")
                              }
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              No image URL provided
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ingredients Section */}
            <motion.div variants={itemVariants} className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ingredients
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={handleIngredientKeyPress}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter an ingredient"
                  />
                  <motion.button
                    type="button"
                    onClick={addIngredient}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Add
                  </motion.button>
                </div>

                <AnimatePresence>
                  {formData.ingredients.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-2"
                    >
                      {formData.ingredients.map((ingredient, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center bg-indigo-50 text-indigo-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          <span>{ingredient}</span>
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="ml-2 hover:bg-indigo-200 rounded-full p-1 transition-colors duration-200"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Attributes */}
            <motion.div variants={itemVariants} className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attributes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: "isVegan", label: "Vegan", color: "green" },
                  {
                    key: "isGlutenFree",
                    label: "Gluten Free",
                    color: "yellow",
                  },
                  { key: "isPopular", label: "Popular", color: "red" },
                  { key: "isNew", label: "New", color: "blue" },
                ].map(({ key, label, color }) => (
                  <motion.label
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      formData[key as keyof typeof formData]
                        ? `border-${color}-300 bg-${color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={key}
                      checked={
                        formData[key as keyof typeof formData] as boolean
                      }
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        formData[key as keyof typeof formData]
                          ? `border-${color}-500 bg-${color}-500`
                          : "border-gray-300"
                      }`}
                    >
                      {formData[key as keyof typeof formData] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <CheckCircleIcon className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {label}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Nutritional Information */}
            <motion.div variants={itemVariants} className="border-t pt-8">
              <button
                type="button"
                onClick={() => setShowNutrition(!showNutrition)}
                className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4 hover:text-indigo-600 transition-colors duration-200 w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="h-5 w-5" />
                  Nutritional Information
                </div>
                <motion.div
                  animate={{ rotate: showNutrition ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {showNutrition && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {[
                      { key: "calories", label: "Calories", unit: "" },
                      { key: "protein", label: "Protein", unit: "g" },
                      { key: "carbs", label: "Carbs", unit: "g" },
                      { key: "fat", label: "Fat", unit: "g" },
                    ].map(({ key, label, unit }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label} {unit && `(${unit})`}
                        </label>
                        <input
                          type="number"
                          name={`nutritionalInfo.${key}`}
                          value={
                            formData.nutritionalInfo[
                              key as keyof typeof formData.nutritionalInfo
                            ]
                          }
                          onChange={handleChange}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-4 justify-end">
            <motion.button
              type="button"
              onClick={() => router.push("/dashboard/menu")}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </div>
              ) : menuItem ? (
                "Update Item"
              ) : (
                "Create Item"
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default MenuItemForm;
