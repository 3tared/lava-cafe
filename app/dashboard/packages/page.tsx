// app/dashboard/packages/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPackage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Tag,
  X,
  Package,
  Sparkles,
} from "lucide-react";

export default function PackagesDashboardPage() {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<IPackage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    price: "",
    per: "",
    description: "",
    items: [""],
    emoji: "",
    popular: false,
    tag: "",
    discount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name,
        originalPrice: editingPackage.originalPrice,
        price: editingPackage.price,
        per: editingPackage.per,
        description: editingPackage.description,
        items: editingPackage.items.length > 0 ? editingPackage.items : [""],
        emoji: editingPackage.emoji,
        popular: editingPackage.popular,
        tag: editingPackage.tag,
        discount: editingPackage.discount,
      });
    } else {
      setFormData({
        name: "",
        originalPrice: "",
        price: "",
        per: "",
        description: "",
        items: [""],
        emoji: "",
        popular: false,
        tag: "",
        discount: "",
      });
    }
  }, [editingPackage]);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 800); // Smooth loading transition
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Package name is required";
    }
    if (!formData.originalPrice.trim()) {
      newErrors.originalPrice = "Original price is required";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }
    if (!formData.per.trim()) {
      newErrors.per = "Per unit is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.emoji.trim()) {
      newErrors.emoji = "Emoji is required";
    }
    if (!formData.tag.trim()) {
      newErrors.tag = "Tag is required";
    }
    if (!formData.discount.trim()) {
      newErrors.discount = "Discount is required";
    }

    const validItems = formData.items.filter((item) => item.trim() !== "");
    if (validItems.length === 0) {
      newErrors.items = "At least one item is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const validItems = formData.items.filter((item) => item.trim() !== "");
    const submitData = {
      ...formData,
      items: validItems,
    };

    try {
      if (editingPackage) {
        const response = await fetch(`/api/packages/${editingPackage.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        if (response.ok) {
          const updatedPackage = await response.json();
          setPackages(
            packages.map((pkg) =>
              pkg.id === updatedPackage.id ? updatedPackage : pkg
            )
          );
        }
      } else {
        const response = await fetch("/api/packages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });

        if (response.ok) {
          const newPackage = await response.json();
          setPackages([newPackage, ...packages]);
        }
      }

      setShowForm(false);
      setEditingPackage(null);
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleDelete = async (packageId: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg.id !== packageId));
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete package");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = value;
    setFormData((prev) => ({ ...prev, items: newItems }));
    if (errors.items) {
      setErrors((prev) => ({ ...prev, items: "" }));
    }
  };

  const addItem = () => {
    setFormData((prev) => ({ ...prev, items: [...prev.items, ""] }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12"
        >
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg"
            >
              <Package className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Packages Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-lg">
                Manage your event packages and pricing with style
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                setEditingPackage(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Package
            </Button>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8 max-w-md"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
          />
        </motion.div>

        {/* Packages Grid */}
        <AnimatePresence mode="wait">
          {filteredPackages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-8xl mb-6"
              >
                📦
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No packages found
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "Get started by creating your first package."}
              </p>
              {!searchTerm && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {
                      setEditingPackage(null);
                      setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Package
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      layout: { duration: 0.3 },
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 p-6 transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.span
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-3xl"
                          >
                            {pkg.emoji}
                          </motion.span>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                              {pkg.name}
                            </h3>
                            <div className="flex flex-col items-start mt-2 space-y-2">
                              <AnimatePresence>
                                {pkg.popular && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md"
                                  >
                                    <Star className="w-3 h-3" />
                                    Popular
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
                                <Tag className="w-3 h-3" />
                                {pkg.tag}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingPackage(pkg);
                                setShowForm(true);
                              }}
                              className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pkg.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Items */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                          What&#39;s included:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 max-h-20 overflow-y-auto">
                          {pkg.items.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center"
                            >
                              <motion.span
                                whileHover={{ scale: 1.5 }}
                                className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex-shrink-0"
                              ></motion.span>
                              <span className="line-clamp-1">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                            {pkg.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            /{pkg.per}
                          </span>
                          {pkg.originalPrice !== pkg.price && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {pkg.originalPrice}
                            </span>
                          )}
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                        >
                          {pkg.discount} OFF
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Package Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                        {editingPackage ? "Edit Package" : "Create New Package"}
                      </h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingPackage(null);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Package Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="e.g., Birthday Deluxe"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Emoji *
                        </label>
                        <Input
                          value={formData.emoji}
                          onChange={(e) =>
                            handleInputChange("emoji", e.target.value)
                          }
                          placeholder="🎉"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.emoji
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.emoji && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.emoji}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Perfect for birthday celebrations..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                          errors.description
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        rows={3}
                      />
                      <AnimatePresence>
                        {errors.description && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Original Price *
                        </label>
                        <Input
                          value={formData.originalPrice}
                          onChange={(e) =>
                            handleInputChange("originalPrice", e.target.value)
                          }
                          placeholder="$150"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.originalPrice
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.originalPrice && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.originalPrice}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Price *
                        </label>
                        <Input
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          placeholder="$120"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.price
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.price && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.price}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Per, Tag, Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Per *
                        </label>
                        <Input
                          value={formData.per}
                          onChange={(e) =>
                            handleInputChange("per", e.target.value)
                          }
                          placeholder="person"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.per
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.per && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.per}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tag *
                        </label>
                        <Input
                          value={formData.tag}
                          onChange={(e) =>
                            handleInputChange("tag", e.target.value)
                          }
                          placeholder="Best Value"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.tag
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.tag && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.tag}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Discount *
                        </label>
                        <Input
                          value={formData.discount}
                          onChange={(e) =>
                            handleInputChange("discount", e.target.value)
                          }
                          placeholder="20%"
                          className={`transition-all duration-200 rounded-xl ${
                            errors.discount
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-blue-500"
                          }`}
                        />
                        <AnimatePresence>
                          {errors.discount && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.discount}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Popular Checkbox */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.popular}
                        onChange={(e) =>
                          handleInputChange("popular", e.target.checked)
                        }
                        className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 transition-all duration-200"
                      />
                      <span className="text-sm font-semibold text-gray-700 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-600" />
                        Mark as Popular Package
                      </span>
                    </motion.div>

                    {/* Items */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Items Included *
                      </label>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {formData.items.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-3"
                            >
                              <div className="flex-1 relative">
                                <Input
                                  value={item}
                                  onChange={(e) =>
                                    handleItemChange(index, e.target.value)
                                  }
                                  placeholder="e.g., Decorated cake"
                                  className="rounded-xl focus:ring-blue-500 pr-12"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                  #{index + 1}
                                </div>
                              </div>
                              <AnimatePresence>
                                {formData.items.length > 1 && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(index)}
                                      className="h-10 w-10 p-0 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                            className="w-full mt-3 border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 rounded-xl py-3"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Item
                          </Button>
                        </motion.div>

                        <AnimatePresence>
                          {errors.items && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.items}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowForm(false);
                            setEditingPackage(null);
                          }}
                          className="w-full py-3 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-200"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {editingPackage ? "Update Package" : "Create Package"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
