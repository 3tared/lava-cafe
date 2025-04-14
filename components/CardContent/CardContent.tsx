import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ICardContentProps {
  title: string;
  description: string;
  image: string;
}

const CardContent = ({ description, image, title }: ICardContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 space-y-8 md:space-y-16">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {title}
          </span>{" "}
          {description}
        </p>
        <div className="cursor-pointer" onClick={openModal}>
          <Image
            src={image}
            alt="Card image"
            height={500}
            width={500}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-lg transition-all duration-300 hover:opacity-90"
          />
        </div>
      </div>

      {/* Modal for enlarged image with animation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300 z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              aria-label="Close modal"
            >
              ✕
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt="Enlarged card image"
                width={600}
                height={400}
                className="w-full max-w-4xl max-h-screen rounded-3xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardContent;
