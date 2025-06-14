"use client";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, User, Shield, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { mainlogo, navItems } from "@/constants";

function Navbar() {
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isAdmin, setIsAdmin] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith("/dashboard") || false;

  // Fixed admin check effect with proper dependencies
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated && user?.email && !isLoading) {
        setIsCheckingAdmin(true);
        try {
          const response = await fetch(
            `/api/admin-check?email=${encodeURIComponent(user.email)}`
          );
          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Failed to check admin status:", error);
          setIsAdmin(false);
          setUserRole("user");
        } finally {
          setIsCheckingAdmin(false);
        }
      } else if (!isAuthenticated && !isLoading) {
        // Reset admin state when user is not authenticated
        setIsAdmin(false);
        setUserRole("user");
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, user?.email, isLoading]); // Added isLoading to dependencies

  useEffect(() => {
    setPrevScrollPos(window.scrollY);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      setIsScrolled(currentScrollPos > 50);
      setIsVisible(isScrollingUp || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        !(
          event.target instanceof Element &&
          event.target.closest(".user-menu-container")
        )
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const navLinkVariants = {
    rest: { scale: 1, x: 0, opacity: 1 },
    hover: {
      scale: 1.1,
      x: 10,
      opacity: 0.9,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const desktopLinkVariants = {
    rest: { scale: 1, y: 0, opacity: 1 },
    hover: {
      scale: 1.05,
      y: -3,
      opacity: 0.9,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const logoHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 3,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const navbarVariants = {
    hidden: { y: "-100%" },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
  };

  const handleLogout = async () => {
    window.location.href = "/api/auth/logout";
  };

  // Comprehensive loading check
  const isFullyLoaded = !isLoading && !isCheckingAdmin;

  // Improved renderAuthButtons with proper loading states
  const renderAuthButtons = () => {
    // Show loading state until ALL async operations complete
    if (isLoading || isCheckingAdmin) {
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      );
    }

    // Only render authenticated UI after loading is complete
    if (isAuthenticated && user) {
      return (
        <div className="relative user-menu-container">
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
          >
            {user.picture ? (
              <Image
                src={user.picture}
                alt="User avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <User size={20} className="text-white" />
            )}
            <span className="text-white text-sm font-medium hidden md:block">
              {user.given_name || user.email}
            </span>
          </motion.button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.given_name} {user.family_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    Role: {userRole}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <User size={16} />
                    <span>My Account</span>
                  </Link>
                </div>

                {isAdmin && (
                  <div className="py-1 border-t border-gray-200">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Shield size={16} />
                      <span>Admin Dashboard</span>
                    </Link>
                  </div>
                )}

                <div className="py-1 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Only show sign in/up if definitely not authenticated and loading is complete
    if (!isAuthenticated && isFullyLoaded) {
      return (
        <div className="flex items-center space-x-3">
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <LoginLink className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-900 hover:text-white transition-colors duration-300">
              <LogIn size={18} />
              <span>Sign In</span>
            </LoginLink>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <RegisterLink className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-sm font-medium text-white transition-all duration-300">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </RegisterLink>
          </motion.div>
        </div>
      );
    }

    // Fallback loading state
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    );
  };

  // Improved renderMobileAuth with proper loading states
  const renderMobileAuth = () => {
    if (isLoading || isCheckingAdmin) {
      return (
        <div className="py-4 text-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      return (
        <div className="py-4 border-t border-white border-opacity-20">
          <div className="flex items-center space-x-3 px-5 py-2">
            {user.picture ? (
              <Image
                src={user.picture}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <User size={24} className="text-white" />
            )}
            <div>
              <p className="text-white font-medium">
                {user.given_name} {user.family_name}
              </p>
              <p className="text-text-900 text-sm">{user.email}</p>
              <p className="text-blue-300 text-xs">Role: {userRole}</p>
            </div>
          </div>

          <motion.div
            className="py-2"
            variants={navLinkVariants}
            initial="rest"
            whileHover="hover"
          >
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-5 py-2 text-white hover:text-text-900 transition-colors duration-300"
            >
              <User size={20} />
              <span>My Account</span>
            </Link>
          </motion.div>

          {isAdmin && (
            <motion.div
              className="py-2"
              variants={navLinkVariants}
              initial="rest"
              whileHover="hover"
            >
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-5 py-2 text-blue-300 hover:text-white transition-colors duration-300"
              >
                <Shield size={20} />
                <span>Admin Dashboard</span>
              </Link>
            </motion.div>
          )}

          <motion.button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-5 py-2 text-red-400 hover:text-red-300 transition-colors duration-300"
            variants={navLinkVariants}
            initial="rest"
            whileHover="hover"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </motion.button>
        </div>
      );
    }

    // Only show sign in/up if definitely not authenticated and loading is complete
    if (!isAuthenticated && isFullyLoaded) {
      return (
        <div className="py-4 border-t border-white border-opacity-20 space-y-2">
          <motion.div
            variants={navLinkVariants}
            initial="rest"
            whileHover="hover"
          >
            <LoginLink
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 w-full px-5 py-2 text-text-900 hover:text-white transition-colors duration-300"
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </LoginLink>
          </motion.div>

          <motion.div
            variants={navLinkVariants}
            initial="rest"
            whileHover="hover"
          >
            <RegisterLink
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 w-full px-5 py-2 text-white hover:text-text-900 transition-colors duration-300"
            >
              <UserPlus size={20} />
              <span>Sign Up</span>
            </RegisterLink>
          </motion.div>
        </div>
      );
    }

    // Fallback loading state
    return (
      <div className="py-4 text-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
      </div>
    );
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      className={`${isDashboardPage ? "hidden" : "block"} fixed top-0 left-0 right-0 z-50 px-5 md:px-6 lg:px-7 bg-lavasecondary-500 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "shadow-md bg-opacity-90 backdrop-blur-sm"
          : "bg-opacity-100"
      }`}
    >
      <nav className="mx-auto container">
        <div className="justify-between items-center hidden sm:flex">
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
                  className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium tracking-wide ${
                    pathname === href
                      ? "text-white font-bold"
                      : "text-text-900 hover:text-white"
                  } transition-colors duration-300 relative`}
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

          <motion.div
            variants={logoHoverVariants}
            initial="rest"
            whileHover="hover"
            className="2xl:scale-110"
          >
            <Link href="/">
              <Image
                src={mainlogo.src}
                alt={mainlogo.alt}
                width={100}
                height={100}
                className="object-contain rounded-full transition-transform duration-300 hover:scale-105 xl:w-[100px] xl:h-[100px] 2xl:w-[140px] 2xl:h-[140px]"
              />
            </Link>
          </motion.div>

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
                  className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium tracking-wide ${
                    pathname === href
                      ? "text-white font-bold"
                      : "text-text-900 hover:text-white"
                  } transition-colors duration-300 relative`}
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

            {renderAuthButtons()}
          </div>
        </div>

        <div className="flex justify-between items-center sm:hidden">
          <Image src={mainlogo.src} alt={mainlogo.alt} width={80} height={80} />

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

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed top-0 right-0 z-10 bg-lavasecondary-500 shadow-xl w-screen h-screen flex flex-col"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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

                <Link
                  className="absolute top-0 left-5 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  href="/"
                >
                  <Image
                    src={mainlogo.src}
                    alt={mainlogo.alt}
                    width={80}
                    height={80}
                  />
                </Link>

                <div className="flex-1 flex justify-center items-center">
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
                          onClick={() => setIsOpen(false)}
                          className={`${pathname === href ? "text-white" : "text-text-900"} hover:text-white transition-colors duration-300`}
                        >
                          {name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {renderMobileAuth()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
