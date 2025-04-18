import { MenuItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tag } from "lucide-react";

type IMenuProps = {
  item: MenuItem;
  isImageLoading?: boolean;
};

export default function MenuCard({ item, isImageLoading = false }: IMenuProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(!isImageLoading);

  return (
    <Link href={`/menu/${item.id}`} className="block">
      <motion.div
        className="rounded-2xl overflow-hidden bg-white cursor-pointer relative h-full flex flex-col"
        initial={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        whileHover={{
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          y: -5,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative">
          {item.image && (
            <div className="overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Skeleton while image is loading */}
                {!imageLoaded && (
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                )}
                <Image
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-48 object-cover ${!imageLoaded ? "hidden" : ""}`}
                  width={500}
                  height={500}
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
            </div>
          )}

          {item.isNew && (
            <motion.div
              className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Tag size={12} className="mr-1" />
              <span>NEW</span>
            </motion.div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <motion.h3
              className="text-xl font-semibold text-gray-800"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: isHovered ? 1 : 0.9 }}
            >
              {item.name}
            </motion.h3>

            <motion.div
              className="px-2 py-1 bg-lavasecondary-100 rounded-lg border border-lavasecondary-100"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg font-bold text-lavasecondary-600">
                {item.price} EGP
              </p>
            </motion.div>
          </div>

          {item.description && (
            <motion.p
              className="text-sm text-gray-600 mt-2 line-clamp-2 flex-grow"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {item.description}
            </motion.p>
          )}

          <motion.div
            className="mt-4 flex items-center justify-center bg-lavasecondary-500 text-white py-2 rounded-lg font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
          >
            View Details
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
