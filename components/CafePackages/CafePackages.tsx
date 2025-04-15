"use client";
import { cafePackages, ownerPhoneNumber } from "@/constants";
import { motion } from "framer-motion";
import { useState } from "react";

const CafePackages = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  // Utility function to open WhatsApp chat with owner and send package details
  const openWhatsAppWithPackageDetails = () => {
    if (selectedPackage === null) return;

    const selectedPkg = cafePackages[selectedPackage];
    const cleanedNumber = ownerPhoneNumber.replace(/\D/g, "");

    // Create message with package details
    const message = encodeURIComponent(
      `Hello! I'm interested in booking the following package:\n\n` +
        `📦 Package: ${selectedPkg.name}\n` +
        `💰 Price: ${selectedPkg.price} ${selectedPkg.per}\n` +
        `📝 Details: ${selectedPkg.description}\n\n` +
        `Please contact me to discuss further details.`
    );

    window.open(`https://wa.me/${cleanedNumber}?text=${message}`, "_blank");
  };

  // Original WhatsApp function for custom quote
  const openWhatsAppOwner = () => {
    const cleanedNumber = ownerPhoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanedNumber}`, "_blank");
  };

  const handleSelect = (index: number): void => {
    setSelectedPackage(index === selectedPackage ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elevate your event with our expertly crafted packages designed to
            meet your needs and exceed expectations.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cafePackages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden ${
                pkg.popular
                  ? "ring-2 ring-lavasecondary-600"
                  : "border border-gray-200"
              } bg-white shadow-lg relative flex flex-col h-full transition-all duration-300 ${
                selectedPackage === index ? "ring-4 ring-indigo-400" : ""
              }`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-lavasecondary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {pkg.tag}
                  </div>
                </div>
              )}

              {!pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-lavaprimary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {pkg.tag}
                  </div>
                </div>
              )}

              <div
                className={`p-6 ${pkg.popular ? "bg-indigo-50" : "bg-gray-50"}`}
              >
                <div className="text-4xl mb-4">{pkg.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline mb-1">
                  <div className="text-2xl font-bold text-gray-900">
                    {pkg.price}
                  </div>
                  <div className="text-sm text-gray-600 ml-1">{pkg.per}</div>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    {pkg.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                    {pkg.discount}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  {pkg.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        hoveredCard === index ? { opacity: 1, x: 0 } : {}
                      }
                      transition={{ delay: i * 0.1 }}
                    >
                      <svg
                        className="h-5 w-5 text-indigo-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0">
                <motion.button
                  onClick={() => handleSelect(index)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    selectedPackage === index
                      ? "bg-indigo-700 text-white"
                      : pkg.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPackage === index ? "Selected" : "Select Package"}
                </motion.button>
              </div>

              {pkg.popular && (
                <motion.div
                  className="absolute -z-10 inset-0 bg-indigo-100 rounded-2xl"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={
                    hoveredCard === index
                      ? { scale: 1.08, opacity: 0.2 }
                      : { scale: 0.85, opacity: 0 }
                  }
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Show "Contact Us About This Package" button when a package is selected */}
        {selectedPackage !== null && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.button
              onClick={openWhatsAppWithPackageDetails}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span>Contact Us About This Package</span>
            </motion.button>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need a custom package for your event?
          </p>
          <motion.button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            onClick={openWhatsAppOwner}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us for Custom Quote
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CafePackages;
