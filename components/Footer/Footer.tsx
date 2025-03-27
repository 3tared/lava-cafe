"use client";
// Import necessary dependencies and components
import { mainlogo, navItems, socialItems } from "@/constants";
import { Mail, MapPin, UserCheck, UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// Type definition for social media platforms to ensure type safety
type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "whatsapp"
  | "tiktok"
  | "youtube";

// Define hover colors for each social media platform
// Uses a type-safe record to map platform names to their unique hover background styles
const socialColors: Record<SocialPlatform, string> = {
  facebook: "hover:bg-[#3b5998]",
  instagram: "hover:bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  twitter: "hover:bg-[#000000]",
  linkedin: "hover:bg-[#000000]",
  whatsapp: "hover:bg-[#25D366]",
  tiktok: "hover:bg-[#000000]",
  youtube: "hover:bg-[#FF0000]",
};

const Footer = () => {
  // Store contact phone numbers for easy management
  const managerPhoneNumber = "+201223411732";
  const ownerPhoneNumber = "+201148494119";

  // Utility function to open WhatsApp chat with manager
  // Removes non-digit characters and opens WhatsApp web
  const openWhatsAppManager = () => {
    const cleanedNumber = managerPhoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanedNumber}`, "_blank");
  };

  // Utility function to open WhatsApp chat with owner
  const openWhatsAppOwner = () => {
    const cleanedNumber = ownerPhoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanedNumber}`, "_blank");
  };

  // Framer Motion animation variants for different components
  // Provides interactive animations for hover and initial render states

  // Logo animation - slight scale and rotation on hover
  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 3,
      transition: { duration: 0.3 },
    },
  };

  // Link animation - fade in from left, golden highlight on hover
  const linkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      color: "#ffd700", // golden highlight on hover
    },
  };

  // Social icon animation - rise up on initial render, rotate and scale on hover
  const socialIconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
  };

  // Contact item animation - slide in from right, slight scale on hover
  const contactItemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  };

  return (
    // Footer main container with background and responsive layout
    <footer className="bg-lavasecondary-500 py-8 px-4 relative">
      {/* Copyright notice - positioned absolutely at the bottom */}
      <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-text-900 text-xs sm:text-sm px-4 max-w-full">
        &copy; {new Date().getFullYear()} Lava Restuarant & Cafe. All rights
        reserved
      </p>

      <div className="container mx-auto">
        {/* Responsive grid layout - adjusts from 1 to 4 columns based on screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo Section - With hover animations and brief description */}
          <motion.div
            className="flex items-center flex-col text-center bg-lavasecondary-400 p-4 rounded-2xl sm:col-span-2 md:col-span-1"
            whileHover="hover"
            initial="initial"
            animate="animate"
          >
            <Link href="/" className="mb-4">
              <motion.div variants={logoVariants}>
                <Image
                  src={mainlogo.src}
                  alt={mainlogo.alt}
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </motion.div>
            </Link>
            <p className="max-w-xs text-text-800 text-sm leading-relaxed">
              Lava Café - Your cozy spot for premium coffee and delicious snacks
              in Mokattam, Street 9. Perfect for work, friends, or relaxation.
            </p>
          </motion.div>

          {/* Quick Links Section - Dynamic navigation from constants */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl lg:text-2xl text-text-900 font-semibold mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2 text-center sm:text-left">
                {navItems.map(({ href, name }, index) => (
                  <motion.li
                    key={name}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={href}
                      className="text-white font-medium text-sm xl:text-lg hover:text-gray-200 transition-colors"
                    >
                      {name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Us Section - With interactive contact methods */}
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl lg:text-2xl text-text-900 font-semibold mb-4">
                Contact Us
              </h2>
              <ul className="space-y-2 text-sm text-white text-center sm:text-left">
                {/* Owner Contact - Opens WhatsApp on click */}
                <motion.li
                  className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer text-sm xl:text-lg"
                  onClick={openWhatsAppOwner}
                  variants={contactItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <UserCheck size={20} color="#262626" />
                  <p>{ownerPhoneNumber}</p>
                </motion.li>

                {/* Manager Contact - Opens WhatsApp on click */}
                <motion.li
                  className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer text-sm xl:text-lg"
                  onClick={openWhatsAppManager}
                  variants={contactItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <UserCog size={20} color="#262626" />
                  <p>{managerPhoneNumber}</p>
                </motion.li>

                {/* Location - Opens Google Maps on click */}
                <motion.li
                  className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer text-sm xl:text-lg"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/vGhjHRf4bx6mYCRL8",
                      "_blank"
                    )
                  }
                  variants={contactItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <MapPin size={20} color="#262626" className="ml-[-3]" />
                  <p>Mokattam, Street 9</p>
                </motion.li>

                {/* Email Contact */}
                <motion.li
                  className="flex items-center justify-center sm:justify-start gap-2 text-sm xl:text-lg"
                  variants={contactItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Mail size={20} color="#262626" className="ml-[-3]" />
                  <p>lavaacafee@gmail.com</p>
                </motion.li>
              </ul>
            </div>
          </div>

          {/* Stay Connected Section - Social Media Links */}
          <div className="flex flex-col items-center sm:col-span-2 md:col-span-1 mb-8 lg:mb-0">
            <h2 className="text-xl lg:text-2xl text-text-900 font-semibold mb-4">
              Stay Connected
            </h2>
            <ul className="flex items-center justify-center gap-x-4 sm:gap-x-5">
              {/* Dynamic social media icons from constants */}
              {socialItems.map(({ href, Icon, name }, index) => {
                // Extract the platform name in lowercase
                const platformName = name.toLowerCase() as SocialPlatform;

                // Safely get the hover class
                const hoverClass =
                  socialColors[platformName] || "hover:bg-gray-700";

                return (
                  <motion.li
                    key={name}
                    className="group"
                    variants={socialIconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={href}
                      target="_blank"
                      className={`
                      p-2 rounded-full transition-all duration-300 ease-in-out
                      transform group-hover:scale-110 group-hover:rotate-6
                      flex items-center justify-center
                      ${hoverClass}
                    `}
                    >
                      <Image
                        src={Icon}
                        alt={name}
                        width={30}
                        height={30}
                        className="transition-transform duration-300"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
