// app/product/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { MENU_ITEMS } from "@/constants";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  const product = MENU_ITEMS.find((item) => item.id === id);

  useEffect(() => {
    // Simulate loading for smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!product) return notFound();

  // Find related products of the same category
  const relatedProducts = MENU_ITEMS.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 3);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 animate-pulse">
        <div className="bg-gray-200 h-64 w-full rounded-2xl mb-6"></div>
        <div className="bg-gray-200 h-8 w-2/3 rounded mb-4"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-5/6 rounded mb-4"></div>
        <div className="bg-gray-200 h-6 w-24 rounded mb-6"></div>
        <div className="bg-gray-200 h-10 w-32 rounded-full"></div>
      </div>
    );
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
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="flex text-lavasecondary-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < review.rating ? "text-lavasecondary-400 fill-current" : "text-gray-300"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {review.author}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 italic">No reviews yet.</p>
          </div>
        )}
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
            onClick={() => router.push(`/menu?category=${product.category}`)}
            className="hover:text-lavasecondary-600 transition-colors"
          >
            {product.category}
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
                {product.category}
              </span>
              {product.availableSizes && (
                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {product.availableSizes.join(", ")} Available
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
                        src={item.image}
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
