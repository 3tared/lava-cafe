// app/menu/bulk/page.tsx
"use client";

import { useState, useEffect } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
}

export default function BulkPriceEdit() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [originalItems, setOriginalItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setMessage("");
      setDebugInfo("Attempting to fetch menu items...");

      console.log("Frontend: Starting fetch request to /api/menu/items");

      const response = await fetch("/api/menu/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache", // Prevent caching issues
      });

      console.log("Frontend: Response received");
      console.log("Frontend: Response status:", response.status);
      console.log(
        "Frontend: Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const totalCount = response.headers.get("X-Total-Count");
      const debugMessage = response.headers.get("X-Debug-Message");

      if (debugMessage) {
        setDebugInfo(debugMessage);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Frontend: Response error:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        throw new Error(
          `Failed to fetch menu items: ${response.status} - ${errorData.message || errorText}`
        );
      }

      const data = await response.json();
      console.log("Frontend: Fetched data:", data);
      console.log("Frontend: Data type:", typeof data);
      console.log("Frontend: Data is array:", Array.isArray(data));
      console.log("Frontend: Data length:", data?.length);

      if (!Array.isArray(data)) {
        throw new Error("Expected array of menu items, got: " + typeof data);
      }

      if (data.length === 0) {
        setMessage(
          "No menu items found in database. Please add some menu items first."
        );
        setDebugInfo(`Total items in database: ${totalCount || "0"}`);
      } else {
        // Validate the data structure
        const validItems = data.filter((item) => {
          const isValid =
            item &&
            typeof item.id === "string" &&
            typeof item.name === "string" &&
            typeof item.price === "number";

          if (!isValid) {
            console.warn("Frontend: Invalid item found:", item);
          }
          return isValid;
        });

        if (validItems.length !== data.length) {
          console.warn(
            `Frontend: ${data.length - validItems.length} invalid items filtered out`
          );
        }

        setItems(validItems);
        setOriginalItems([...validItems]); // Create a deep copy
        setMessage("");
        setDebugInfo(`Successfully loaded ${validItems.length} menu items`);
      }
    } catch (error) {
      console.error("Frontend: Error fetching menu items:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setMessage(`Error loading menu items: ${errorMessage}`);
      setDebugInfo(`Fetch failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  );

  // Filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePriceChange = (id: string, newPrice: string) => {
    const price = parseFloat(newPrice) || 0;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price } : item))
    );
  };

  const handleBulkPriceUpdate = (percentage: number) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        price: Math.round(item.price * (1 + percentage / 100) * 100) / 100,
      }))
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/menu/bulk-update-prices", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(
          `Prices updated successfully! Updated ${result.updatedCount || items.length} items.`
        );
        setOriginalItems([...items]); // Update original items to reflect new baseline
        setTimeout(() => setMessage(""), 5000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update prices");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setMessage(`Error: ${errorMessage}`);
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setItems([...originalItems]);
    setMessage("Prices reset to original values");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRefresh = () => {
    fetchMenuItems();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Loading menu items...</p>
          {debugInfo && (
            <p className="text-sm text-gray-500 mt-2">{debugInfo}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bulk Price Editor
              </h1>
              <p className="text-gray-600">
                Update multiple menu item prices efficiently in one place
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Refresh Data
            </button>
          </div>

          {/* Debug Info */}
          {debugInfo && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Debug:</strong> {debugInfo}
              </p>
            </div>
          )}
        </div>

        {/* Show message if no items */}
        {items.length === 0 && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  No Menu Items Found
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>No menu items were found in your database. Please:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Check that your database is connected</li>
                    <li>Ensure you have menu items in your database</li>
                    <li>
                      Verify your Prisma schema and migrations are up to date
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions - only show if we have items */}
        {items.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Bulk Actions</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <button
                  onClick={() => handleBulkPriceUpdate(20)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  +20% All
                </button>
                <button
                  onClick={() => handleBulkPriceUpdate(10)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                >
                  +10% All
                </button>
                <button
                  onClick={() => handleBulkPriceUpdate(5)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  +5% All
                </button>
                <button
                  onClick={() => handleBulkPriceUpdate(-5)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  -5% All
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSaveAll}
                  disabled={saving}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    "Save All Changes"
                  )}
                </button>
                <button
                  onClick={handleReset}
                  disabled={saving}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  Reset to Original
                </button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    message.includes("Error")
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-green-100 text-green-700 border border-green-300"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Items
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Original Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        New Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map((item) => {
                      const originalPrice =
                        originalItems.find((orig) => orig.id === item.id)
                          ?.price || 0;
                      const priceChange = item.price - originalPrice;
                      const percentChange =
                        originalPrice > 0
                          ? (priceChange / originalPrice) * 100
                          : 0;

                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              {item.description && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {item.category || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${originalPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.price}
                              onChange={(e) =>
                                handlePriceChange(item.id, e.target.value)
                              }
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {priceChange !== 0 && (
                              <div
                                className={`font-medium ${
                                  priceChange > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {priceChange > 0 ? "+" : ""}$
                                {priceChange.toFixed(2)}
                                <div className="text-xs">
                                  ({percentChange > 0 ? "+" : ""}
                                  {percentChange.toFixed(1)}%)
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredItems.length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                No menu items found matching your search criteria.
              </div>
            )}

            <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
              <span>
                Showing {filteredItems.length} of {items.length} items
              </span>
              <span>
                Total items with changes:{" "}
                {
                  items.filter((item) => {
                    const original = originalItems.find(
                      (orig) => orig.id === item.id
                    );
                    return original && item.price !== original.price;
                  }).length
                }
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
