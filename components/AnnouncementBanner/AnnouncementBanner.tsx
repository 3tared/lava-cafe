"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Updated interface to match your database schema
interface Announcement {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  badge?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Component now fetches its own data
const AnnouncementBanner: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/announcements");

        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }

        const data = await response.json();
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Failed to load announcements");
        setAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (announcements.length <= 1 || !isVisible) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, announcements.length, isVisible]);

  // Don't render if loading, error, or no announcements
  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-600 py-6 shadow-lg relative overflow-hidden rounded-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
          <div className="text-white">Loading announcements...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail - don't show error banner to users
  }

  if (!announcements || announcements.length === 0 || !isVisible) {
    return null;
  }

  const currentAnnouncement: Announcement = announcements[currentIndex];

  const handlePrev = (): void => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNext = (): void => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === announcements.length - 1 ? 0 : prev + 1
    );
  };

  const handleClose = (): void => {
    setIsVisible(false);
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  const bannerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  return (
    <motion.div
      initial="visible"
      animate="visible"
      exit="hidden"
      variants={bannerVariants}
      className="w-full bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-600 py-2 shadow-lg relative overflow-hidden rounded-lg"
    >
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="flex items-center justify-between py-3">
              <div className="flex-1 flex items-center justify-center relative">
                {/* Left navigation arrow */}
                {announcements.length > 1 && (
                  <motion.button
                    onClick={handlePrev}
                    className="absolute left-0 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
                    aria-label="Previous announcement"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </motion.button>
                )}

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl">
                  {currentAnnouncement.imageUrl && (
                    <motion.div
                      className="relative w-[120px] h-[80px] md:w-[180px] md:h-[100px] overflow-hidden rounded-lg shadow-lg"
                      whileHover={{
                        scale: 1.05,
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Image
                        src={currentAnnouncement.imageUrl}
                        alt={currentAnnouncement.title || "Announcement"}
                        fill
                        className="object-cover"
                      />
                      {currentAnnouncement.badge && (
                        <motion.div
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          {currentAnnouncement.badge}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  <div className="text-center md:text-left flex-1 text-white">
                    <motion.h3
                      className="font-bold text-lg md:text-xl mb-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentAnnouncement.title || "Announcement"}
                    </motion.h3>
                    {currentAnnouncement.description && (
                      <motion.p
                        className="text-sm md:text-base text-white/90"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentAnnouncement.description}
                      </motion.p>
                    )}
                    {currentAnnouncement.link && (
                      <motion.div
                        className="inline-block"
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          href={currentAnnouncement.link}
                          className="inline-block mt-2 bg-white text-lavasecondary-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
                        >
                          {currentAnnouncement.linkText || "Learn more"}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Right navigation arrow */}
                {announcements.length > 1 && (
                  <motion.button
                    onClick={handleNext}
                    className="absolute right-0 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200"
                    aria-label="Next announcement"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots for multiple announcements */}
        {announcements.length > 1 && (
          <div className="flex justify-center gap-1 mt-1 mb-1">
            {announcements.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-4 bg-white" : "w-2 bg-white/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close button */}
      <motion.button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/10 hover:bg-white/30 transition-colors duration-200"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close announcements"
      >
        <X className="w-4 h-4 text-white" />
      </motion.button>
    </motion.div>
  );
};

export default AnnouncementBanner;
