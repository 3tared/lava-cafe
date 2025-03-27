"use client";
// Import necessary dependencies and components
import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { mainlogo, navItems } from "@/constants";

function Navbar() {
  // State to manage mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  // Get current pathname to highlight active page
  const pathname = usePathname();

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      // Add background and shadow when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation configuration for mobile menu slide-in effect
  // Defines how the mobile menu enters, stays, and exits the screen
  const mobileMenuVariants = {
    // Initial hidden state (offscreen to the right)
    hidden: {
      x: "100%",
      opacity: 0,
    },
    // Visible state when menu is open
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween", // Smooth, predictable animation
        duration: 0.3, // Quick transition
      },
    },
    // Exit state when closing the menu
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  // Hover animation for interactive icons
  // Provides a subtle scale and rotation effect on hover
  const iconHoverVariants = {
    // Default state of the icon
    rest: {
      scale: 1,
      rotate: 0,
    },
    // State when icon is hovered
    hover: {
      scale: 1.2, // Slightly enlarge
      rotate: 5, // Slight rotation
      transition: {
        type: "spring", // Bouncy, natural feeling animation
        stiffness: 300,
      },
    },
  };

  // Animation variants for navigation links in mobile menu
  // Provides interactive feedback when hovering over links
  const navLinkVariants = {
    // Default state of the link
    rest: {
      scale: 1,
      x: 0,
      opacity: 1,
    },
    // State when link is hovered
    hover: {
      scale: 1.1, // Slightly enlarge
      x: 10, // Shift slightly to the right
      opacity: 0.9, // Slightly fade
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  // Desktop Link Animation Variants
  const desktopLinkVariants = {
    rest: {
      scale: 1,
      y: 0,
      opacity: 1,
    },
    hover: {
      scale: 1.05,
      y: -3,
      opacity: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  // Logo Hover Animation Variants
  const logoHoverVariants = {
    rest: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: 3,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    // Main header with fixed positioning, background color, and responsive padding
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        px-5 md:px-6 lg:px-7 
        bg-lavasecondary-500 
        transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "shadow-md bg-opacity-90 backdrop-blur-sm"
            : "bg-opacity-100"
        }
      `}
    >
      <nav className="mx-auto container">
        {/* Desktop navigation - hidden on small screens */}
        {/* Enhanced Desktop Navigation */}
        <div className="justify-between items-center hidden sm:flex">
          {/* First Half of Navigation Items */}
          <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-12">
            {navItems.slice(0, 3).map(({ href, name }) => (
              <motion.div
                key={name}
                variants={desktopLinkVariants}
                initial="rest"
                whileHover="hover"
                className="relative"
              >
                <Link
                  href={href}
                  className={`
                    text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
                    font-medium tracking-wide 
                    ${
                      pathname === href
                        ? "text-white font-bold"
                        : "text-text-900 hover:text-white"
                    }
                    transition-colors duration-300 relative
                  `}
                >
                  {name}
                  {pathname === href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Centered Logo with Hover Animation */}
          <motion.div
            variants={logoHoverVariants}
            initial="rest"
            whileHover="hover"
            className="2xl:scale-110"
          >
            <Link href={"/"}>
              <Image
                src={mainlogo.src}
                alt={mainlogo.alt}
                width={100}
                height={100}
                className="object-contain rounded-full transition-transform duration-300 hover:scale-105 xl:w-[100px] xl:h-[100px] 2xl:w-[140px] 2xl:h-[140px]"
              />
            </Link>
          </motion.div>

          {/* Second Half of Navigation Items */}
          <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-12">
            {navItems.slice(3, 6).map(({ href, name }) => (
              <motion.div
                key={name}
                variants={desktopLinkVariants}
                initial="rest"
                whileHover="hover"
                className="relative"
              >
                <Link
                  href={href}
                  className={`
                    text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl
                    font-medium tracking-wide 
                    ${
                      pathname === href
                        ? "text-white font-bold"
                        : "text-text-900 hover:text-white"
                    }
                    transition-colors duration-300 relative
                  `}
                >
                  {name}
                  {pathname === href && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile navigation - visible on small screens */}
        <div className="flex justify-between items-center sm:hidden">
          {/* Mobile logo */}
          <Image src={mainlogo.src} alt={mainlogo.alt} width={80} height={80} />

          {/* Mobile menu open button with hover animation */}
          <motion.span
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
            variants={iconHoverVariants}
            initial="rest"
            whileHover="hover"
          >
            <Menu
              size={33}
              className="text-text-900"
              aria-label="Open mobile menu"
            />
          </motion.span>

          {/* Animated mobile menu with enter/exit transitions */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed top-0 right-0 z-10 bg-lavasecondary-500 shadow-xl w-screen h-screen flex items-center justify-center"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Close button for mobile menu */}
                <motion.span
                  className="absolute top-6 right-5 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  variants={iconHoverVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <LogOut
                    size={30}
                    className="text-red-700"
                    aria-label="Close mobile menu"
                  />
                </motion.span>

                {/* Home link with logo in mobile menu */}
                <Link
                  className="absolute top-0 left-5 cursor-pointer"
                  // Added onClick handler to close menu when link is clicked
                  onClick={() => setIsOpen(false)}
                  href={"/"}
                >
                  <Image
                    src={mainlogo.src}
                    alt={mainlogo.alt}
                    width={80}
                    height={80}
                  />
                </Link>

                {/* Mobile menu navigation links */}
                <div className="p-5 flex justify-center items-center flex-col">
                  {navItems.map(({ href, name }) => (
                    <motion.div
                      key={name}
                      className="py-4 text-[20px]"
                      variants={navLinkVariants}
                      initial="rest"
                      whileHover="hover"
                    >
                      <Link
                        href={href}
                        // Added onClick handler to close menu when link is clicked
                        onClick={() => setIsOpen(false)}
                        className={`
                          ${pathname === href ? "text-white" : "text-text-900"}
                          hover:text-white transition-colors duration-300
                        `}
                      >
                        {name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
