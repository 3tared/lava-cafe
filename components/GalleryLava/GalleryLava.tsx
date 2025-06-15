"use client";
import { useState, useEffect, useRef, JSX } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Updated GalleryImage type to match your Prisma model
interface GalleryImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

type Category =
  | "All"
  | "indoor"
  | "outdoor"
  | "Events"
  | "Food"
  | "Decoration"
  | "Drinks"
  | "Hokkah";

const categories: Category[] = [
  "indoor",
  "outdoor",
  "Events",
  "Food",
  "Decoration",
  "Drinks",
  "Hokkah",
];

export default function GalleryLava(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const imagesPerPage: number = 9;
  const galleryRef = useRef<HTMLElement | null>(null);

  // Fetch images from API
  const fetchImages = async (category?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const url =
        category && category !== "All"
          ? `/api/gallery?category=${category}`
          : "/api/gallery";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setGalleryImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching gallery images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages: GalleryImage[] =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  // Calculate pagination
  const indexOfLastImage: number = currentPage * imagesPerPage;
  const indexOfFirstImage: number = indexOfLastImage - imagesPerPage;
  const currentImages: GalleryImage[] = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const totalPages: number = Math.ceil(filteredImages.length / imagesPerPage);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    // Optionally fetch filtered data from server instead of client-side filtering
    // fetchImages(category);
  };

  const openLightbox = (image: GalleryImage): void => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = (): void => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "next" | "prev"): void => {
    if (!selectedImage) return;

    const currentIndex: number = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex: number;

    if (direction === "next") {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Error state
  if (error) {
    return (
      <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-red-500">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => fetchImages()}
            className="mt-4 px-6 py-2 bg-lavasecondary-500 text-white rounded-lg hover:bg-lavasecondary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={galleryRef}
      className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-2 text-lavasecondary-500">
          Our Gallery
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our collection of beautiful venue spaces, delicious cuisine,
          and memorable events
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition shadow-sm ${
              selectedCategory === cat
                ? "bg-lavasecondary-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-96"
          >
            <div className="w-12 h-12 rounded-full border-4 border-lavasecondary-500 border-t-transparent animate-spin"></div>
          </motion.div>
        ) : galleryImages.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No images found</p>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
          >
            {currentImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.4,
                  },
                }}
                className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 group relative h-full"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={500}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => openLightbox(img)}
                      className="bg-white text-lavasecondary-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ZoomIn size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-lavasecondary-500">
                    {img.title}
                  </h3>
                  <p className="text-sm text-gray-600">{img.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-12 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className={`p-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-lavasecondary-500 hover:bg-gray-100"}`}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <motion.button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  pageNumber === currentPage
                    ? "bg-lavasecondary-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {pageNumber}
              </motion.button>
            )
          )}

          <button
            onClick={() =>
              handlePageChange(
                currentPage < totalPages ? currentPage + 1 : currentPage
              )
            }
            className={`p-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-lavasecondary-500 hover:bg-gray-100"}`}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="object-contain w-full h-full"
                  width={1200}
                  height={800}
                />
              </div>

              <div className="absolute top-2 right-2">
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => navigateImage("prev")}
                  className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => navigateImage("next")}
                  className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
