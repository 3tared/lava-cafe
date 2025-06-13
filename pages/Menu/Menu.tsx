// app/menu/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "@/components/MenuCard/MenuCard";
import Pagination from "@/components/Pagination/Pagination";
import { MenuItem, Category, MenuApiResponse } from "@/types";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch menu items when filters change
  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory, searchTerm, currentPage, itemsPerPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    }
  };

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(`/api/menu?${params}`);
      if (!response.ok) throw new Error("Failed to fetch menu items");

      const data: MenuApiResponse = await response.json();
      setMenuItems(data.items);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Calculate display range for results summary
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-7 md:mt-12 lg:mt-15 xl:mt-20">
      <div className="p-4 max-w-6xl mx-auto pt-8 md:pt-16">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-lavasecondary-500 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of drinks and treats, made
            with premium ingredients for an exceptional experience.
          </p>
        </motion.div>

        {/* Search and filter container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10 bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lavasecondary-400 transition-all duration-300"
              />
            </div>

            {/* Items per page selector */}
            <div className="flex items-center min-w-fit">
              <label
                htmlFor="perPage"
                className="mr-2 text-sm text-gray-600 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="perPage"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavasecondary-400"
              >
                <option value={6}>6 items</option>
                <option value={9}>9 items</option>
                <option value={12}>12 items</option>
                <option value={15}>15 items</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            <motion.button
              key="All"
              onClick={() => handleCategoryChange("All")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedCategory === "All"
                  ? "bg-lavasecondary-500 text-white border-lavasecondary-500"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-lavasecondary-400 hover:text-white hover:border-lavasecondary-400 transition-all duration-300`}
            >
              All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  selectedCategory === category.name
                    ? "bg-lavasecondary-500 text-white border-lavasecondary-500"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-lavasecondary-400 hover:text-white hover:border-lavasecondary-400 transition-all duration-300`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results summary */}
        {!isLoading && !error && totalItems > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm">
              Showing {startIndex} to {endIndex} of {totalItems} items
            </p>
          </div>
        )}

        {/* Menu Items */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: itemsPerPage }, (_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg h-64 animate-pulse"
              >
                <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                <div className="p-4">
                  <div className="bg-gray-200 h-4 w-2/3 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <MenuCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {menuItems.length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center col-span-full py-12"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xl font-medium text-gray-500">
                    No items found
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try adjusting your search or filter
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-lavasecondary-500 text-white rounded-full hover:bg-lavasecondary-600 transition-colors"
                  >
                    Clear filters
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Pagination component */}
            {totalItems > 0 && totalPages > 1 && (
              <div className="mt-12 mb-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
