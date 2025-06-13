// app/menu/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Define types matching your Prisma schema
interface Category {
  id: string;
  name: string;
}

interface NutritionalInfo {
  id: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  menuItemId: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  ingredients: string[];
  isVegan: boolean;
  isGlutenFree: boolean;
  isPopular: boolean;
  isNew: boolean;
  categoryId: string;
  category: Category;
  nutritionalInfo: NutritionalInfo | null;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  // Unwrap the params with React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("description");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<MenuItem | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const productResponse = await fetch(`/api/menu/${id}`);
        if (!productResponse.ok) {
          if (productResponse.status === 404) {
            return notFound();
          }
          throw new Error("Failed to fetch product");
        }

        const productData = await productResponse.json();
        setProduct(productData);
        setRelatedProducts(productData.relatedItems || []);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-7 md:mt-12 lg:mt-15 xl:mt-20">
        <div className="max-w-6xl mx-auto p-6 pt-8 md:pt-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Error Loading Product
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 bg-lavasecondary-500 text-white rounded-full font-medium hover:bg-lavasecondary-600 transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-7 md:mt-12 lg:mt-15 xl:mt-20">
        <div className="max-w-6xl mx-auto p-6 pt-8 md:pt-12 animate-pulse">
          <div className="bg-gray-200 h-4 w-64 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-200 h-96 w-full rounded-2xl"></div>
            <div>
              <div className="bg-gray-200 h-8 w-2/3 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-5/6 rounded mb-4"></div>
              <div className="bg-gray-200 h-6 w-24 rounded mb-6"></div>
              <div className="bg-gray-200 h-10 w-32 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const tabContent = {
    description: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </motion.div>
    ),
    ingredients: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {product.ingredients && product.ingredients.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No ingredients information available.
          </p>
        )}
      </motion.div>
    ),
    nutrition: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {product.nutritionalInfo ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-lavasecondary-100 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-lg font-semibold">
                {product.nutritionalInfo.calories} kcal
              </p>
            </div>
            <div className="bg-lavasecondary-100  p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-lg font-semibold">
                {product.nutritionalInfo.protein}g
              </p>
            </div>
            <div className="bg-lavasecondary-100  p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="text-lg font-semibold">
                {product.nutritionalInfo.carbs}g
              </p>
            </div>
            <div className="bg-lavasecondary-100  p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Fat</p>
              <p className="text-lg font-semibold">
                {product.nutritionalInfo.fat}g
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No nutritional information available.
          </p>
        )}
      </motion.div>
    ),
    reviews: (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center py-6">
          <p className="text-gray-500 italic">Reviews feature coming soon!</p>
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-7 md:mt-12 lg:mt-15 xl:mt-20">
      <div className="max-w-6xl mx-auto p-6 pt-8 md:pt-12">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <button
            onClick={() => router.push("/")}
            className="hover:text-lavasecondary-600 transition-colors"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => router.push("/menu")}
            className="hover:text-lavasecondary-600 transition-colors"
          >
            Menu
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() =>
              router.push(`/menu?categoryId=${product.categoryId}`)
            }
            className="hover:text-lavasecondary-600 transition-colors"
          >
            {product.category.name}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src={product.image || "/fallback-image.jpg"}
              alt={product.name}
              className="w-full object-cover"
              width={600}
              height={450}
              priority
            />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.isPopular && (
                <motion.div
                  initial={{ x: 50 }}
                  animate={{ x: 0 }}
                  className="bg-red-500 text-white py-1 px-3 rounded-full text-xs font-bold"
                >
                  Popular
                </motion.div>
              )}

              {product.isVegan && (
                <motion.div
                  initial={{ x: 50 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-green-500 text-white py-1 px-3 rounded-full text-xs font-bold flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Vegan
                </motion.div>
              )}

              {product.isGlutenFree && (
                <motion.div
                  initial={{ x: 50 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-500 text-white py-1 px-3 rounded-full text-xs font-bold"
                >
                  Gluten Free
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
              {product.name}
            </h1>
            <div className="mb-4">
              <span className="inline-block bg-lavasecondary-600 text-white text-sm font-medium px-2.5 py-0.5 rounded-full mr-2">
                {product.category.name}
              </span>
              {product.isNew && (
                <span className="inline-block bg-orange-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>

            <p className="text-2xl font-bold text-lavasecondary-600 mb-6">
              {product.price} EGP
            </p>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-2 px-4 text-sm font-medium ${
                      selectedTab === tab
                        ? "border-b-2 border-lavasecondary-500 text-lavasecondary-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="py-4">
                <AnimatePresence mode="wait">
                  {tabContent[selectedTab as keyof typeof tabContent]}
                </AnimatePresence>
              </div>
            </div>

            {/* Back button only - no cart functionality */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/menu")}
              className="px-6 py-3 bg-lavasecondary-500 text-white rounded-full font-medium hover:bg-lavasecondary-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <button onClick={() => router.push(`/menu/${item.id}`)}>
                    <div className="relative h-40">
                      <Image
                        src={item.image || "/fallback-image.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-lavasecondary-600 font-bold">
                        {item.price} EGP
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
