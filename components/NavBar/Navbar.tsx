"use client";
// Import necessary dependencies and components
import Image from "next/image";
import Link from "next/link";
import {
  LogOut,
  Menu,
  User,
  Shield,
  LogIn,
  UserPlus,
  Calendar,
  Bell,
  Search,
  ChevronDown,
  X,
  Home,
  Camera,
  UtensilsCrossed,
  Info,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { mainlogo } from "@/constants";

// Enhanced navigation items with role-based access and icons
const enhancedNavItems = [
  { href: "/", name: "Home", roles: ["all"], icon: Home },
  { href: "/events", name: "Events", roles: ["all"], icon: Calendar },
  { href: "/gallery", name: "Gallery", roles: ["all"], icon: Camera },
  {
    href: "/occasions",
    name: "Occasions",
    roles: ["admin", "moderator", "employee_viewer"],
    icon: Calendar,
  },
  { href: "/menu", name: "Menu", roles: ["all"], icon: UtensilsCrossed },
  { href: "/about-us", name: "About Us", roles: ["all"], icon: Info },
  { href: "/contact-us", name: "Contact Us", roles: ["all"], icon: Phone },
];

function Navbar() {
  // Kinde authentication hooks
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  // Fixed admin check - fetch from database instead of Kinde permissions
  const [userRole, setUserRole] = useState<string>("user");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<number>(0);

  // State to manage mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // State to manage user dropdown menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // State to manage notifications dropdown
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // State to track scroll position and direction
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Get current pathname to highlight active page
  const pathname = usePathname();

  // Check if we are on the dashboard page
  const isDashboardPage = pathname?.startsWith("/dashboard") || false;

  // Check if user has access to a specific nav item
  const hasAccess = (roles: string[]) => {
    if (roles.includes("all")) return true;
    if (!isAuthenticated) return false;
    return roles.includes(userRole);
  };

  // Filter navigation items based on user role
  const visibleNavItems = enhancedNavItems.filter((item) =>
    hasAccess(item.roles)
  );

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated && user?.email) {
        setIsCheckingAdmin(true);
        try {
          const response = await fetch(
            `/api/admin-check?email=${encodeURIComponent(user.email)}`
          );
          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
            setUserRole(data.role);

            // Simulate notifications for demo (replace with actual API call)
            setNotifications(Math.floor(Math.random() * 5));
          }
        } catch (error) {
          console.error("Failed to check admin status:", error);
          setIsAdmin(false);
          setUserRole("user");
        } finally {
          setIsCheckingAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, user]);

  // Enhanced scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Update scroll state
      setIsScrolled(currentScrollPos > 20);

      // Show/hide navbar with smooth transition
      setIsVisible(isScrollingUp || currentScrollPos < 120);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (isUserMenuOpen && !target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }

      if (isNotificationOpen && !target.closest(".notification-container")) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen, isNotificationOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Enhanced animation variants
  const navbarVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.25,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: -15,
      transition: { duration: 0.15 },
    },
  };

  // Handle user logout
  const handleLogout = async () => {
    window.location.href = "/api/auth/logout";
  };

  // Render professional authentication buttons for desktop
  const renderAuthButtons = () => {
    if (isLoading || isCheckingAdmin) {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
            <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
            <div className="w-20 h-10 bg-white/20 rounded-xl animate-pulse hidden lg:block"></div>
          </div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      return (
        <div className="flex items-center space-x-3 xl:space-x-4">
          {/* Search Icon */}
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
            title="Search"
          >
            <Search size={20} className="text-white" />
          </motion.button>

          {/* Notifications */}
          <div className="relative notification-container">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 relative backdrop-blur-sm border border-white/10 hover:border-white/20"
              title="Notifications"
            >
              <Bell size={20} className="text-white" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg"
                >
                  {notifications > 9 ? "9+" : notifications}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl py-3 z-50 border border-gray-200 overflow-hidden backdrop-blur-lg"
                >
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Notifications
                      </h3>
                      {notifications > 0 && (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {notifications} new
                        </span>
                      )}
                    </div>
                  </div>
                  {notifications > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {Array.from({ length: Math.min(notifications, 5) }).map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-5 py-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 font-medium">
                                  New occasion event #{i + 1}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {i === 0
                                    ? "2 minutes ago"
                                    : `${(i + 1) * 5} minutes ago`}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                      {notifications > 5 && (
                        <div className="px-5 py-3 text-center border-t border-gray-100">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View all {notifications} notifications
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-5 py-12 text-center text-gray-500">
                      <Bell size={32} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No new notifications</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative user-menu-container">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
            >
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white/30"
                />
              ) : (
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              )}
              <div className="text-left hidden lg:block">
                <p className="text-white text-sm font-medium leading-tight">
                  {user.given_name || user.email?.split("@")[0]}
                </p>
                <p className="text-white/70 text-xs leading-tight">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/70 transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl py-3 z-50 border border-gray-200 overflow-hidden backdrop-blur-lg"
                >
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {user.picture ? (
                        <Image
                          src={user.picture}
                          alt="User avatar"
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={24} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.given_name} {user.family_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                            userRole === "admin"
                              ? "bg-red-100 text-red-700"
                              : userRole === "moderator"
                                ? "bg-blue-100 text-blue-700"
                                : userRole === "employee_viewer"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={18} />
                      <span>Account Settings</span>
                    </Link>

                    {hasAccess(["admin", "moderator", "employee_viewer"]) && (
                      <Link
                        href="/occasions"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Calendar size={18} />
                        <span>Occasions</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-5 py-3 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Shield size={18} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <LoginLink className="flex items-center space-x-2 px-5 py-3 text-base font-medium text-text-900 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20">
            <LogIn size={20} />
            <span className="hidden sm:block">Sign In</span>
          </LoginLink>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <RegisterLink className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-white/15 to-white/25 hover:from-white/25 hover:to-white/35 rounded-xl text-base font-medium text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl">
            <UserPlus size={20} />
            <span>Get Started</span>
          </RegisterLink>
        </motion.div>
      </div>
    );
  };

  // Enhanced mobile authentication section
  const renderMobileAuth = () => {
    if (isLoading || isCheckingAdmin) {
      return (
        <div className="py-6 text-center border-t border-white/20">
          <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse mx-auto"></div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      return (
        <motion.div
          className="py-6 border-t border-white/20"
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* User Profile Card */}
          <div className="px-6 mb-4">
            <div className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-white/15 to-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="User avatar"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-white/40 shadow-lg"
                />
              ) : (
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <User size={28} className="text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-lg leading-tight truncate">
                  {user.given_name} {user.family_name}
                </p>
                <p className="text-white/70 text-sm leading-tight truncate">
                  {user.email}
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    userRole === "admin"
                      ? "bg-red-500/25 text-red-200 border border-red-400/40"
                      : userRole === "moderator"
                        ? "bg-blue-500/25 text-blue-200 border border-blue-400/40"
                        : userRole === "employee_viewer"
                          ? "bg-green-500/25 text-green-200 border border-green-400/40"
                          : "bg-gray-500/25 text-gray-200 border border-gray-400/40"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      userRole === "admin"
                        ? "bg-red-400"
                        : userRole === "moderator"
                          ? "bg-blue-400"
                          : userRole === "employee_viewer"
                            ? "bg-green-400"
                            : "bg-gray-400"
                    }`}
                  />
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="py-6 border-t border-white/20"
        variants={navItemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-6">
          <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider px-2 pb-3 mb-2">
            Get Started
          </h3>
          <div className="space-y-3">
            <LoginLink
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between w-full px-5 py-4 text-base font-medium transition-all duration-300 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 hover:transform hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg transition-colors duration-300 bg-white/5 text-white/70 group-hover:bg-white/15 group-hover:text-white">
                  <LogIn size={20} />
                </div>
                <span className="font-medium">Sign In</span>
              </div>
              <motion.div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            </LoginLink>

            <RegisterLink
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between w-full px-5 py-4 text-base font-medium transition-all duration-300 rounded-2xl text-white bg-gradient-to-r from-white/15 to-white/10 hover:from-white/25 hover:to-white/15 border border-white/20 hover:border-white/30 shadow-lg hover:transform hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg transition-colors duration-300 bg-white/20 text-white">
                  <UserPlus size={20} />
                </div>
                <span className="font-medium">Get Started</span>
              </div>
              <motion.div className="w-2 h-2 bg-white rounded-full shadow-lg" />
            </RegisterLink>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      className={`${
        isDashboardPage ? "hidden" : "block"
      } fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isScrolled
          ? "bg-lavasecondary-500/95 backdrop-blur-lg shadow-2xl border-b border-white/10"
          : "bg-lavasecondary-500"
      }`}
    >
      <nav className="mx-auto max-w-8xl py-4 lg:py-5">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={mainlogo.src}
                  alt={mainlogo.alt}
                  width={56}
                  height={56}
                  className="object-contain rounded-full transition-transform duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                />
              </div>
              <div className="hidden xl:block">
                <h1 className="text-white font-bold text-2xl leading-tight">
                  Lava Cafe
                </h1>
                <p className="text-white/70 text-sm leading-tight">
                  Premium Experience
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2 xl:space-x-4">
            {visibleNavItems.map(({ href, name, icon: Icon }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Link
                  href={href}
                  className={`
                    group relative flex items-center space-x-2 px-4 py-3 text-base font-medium tracking-wide transition-all duration-300 rounded-xl
                    ${
                      pathname === href
                        ? "text-white bg-white/15 border border-white/20 shadow-lg"
                        : "text-text-900 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                    }
                    backdrop-blur-sm
                  `}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="hidden xl:block">{name}</span>
                  {pathname === href && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderAuthButtons()}
          </motion.div>
        </div>

        {/* Mobile and Tablet Navigation */}
        <div className="flex justify-between items-center lg:hidden">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={mainlogo.src}
              alt={mainlogo.alt}
              width={48}
              height={48}
              className="rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            />
            <div className="block sm:hidden">
              <h1 className="text-white font-bold text-lg leading-tight">
                Lava Cafe
              </h1>
            </div>
          </Link>

          {/* Mobile Auth + Menu */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search & Notifications for authenticated users */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2">
                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 sm:hidden"
                >
                  <Search size={20} className="text-white" />
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Bell size={20} className="text-white" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {notifications > 9 ? "9+" : notifications}
                    </span>
                  )}
                </motion.button>
              </div>
            )}

            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-white" />
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
                />

                {/* Mobile Menu Panel */}
                <motion.div
                  className="fixed top-0 right-0 z-50 bg-lavasecondary-500/95 backdrop-blur-xl shadow-2xl w-full max-w-sm h-full flex flex-col border-l border-white/10"
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Mobile Menu Header */}
                  <div className="flex justify-between items-center p-6 border-b border-white/20">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3"
                    >
                      <Image
                        src={mainlogo.src}
                        alt={mainlogo.alt}
                        width={44}
                        height={44}
                        className="rounded-full border-2 border-white/30"
                      />
                      <div>
                        <h2 className="text-white font-bold text-lg leading-tight">
                          Lava Cafe
                        </h2>
                        <p className="text-white/70 text-sm leading-tight">
                          Menu
                        </p>
                      </div>
                    </Link>

                    <motion.button
                      onClick={() => setIsOpen(false)}
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm border border-red-400/30"
                      aria-label="Close menu"
                    >
                      <X size={22} className="text-red-300" />
                    </motion.button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 py-4 overflow-y-auto">
                    <div className="px-4">
                      <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider px-4 pb-3 mb-2">
                        Navigation
                      </h3>
                      <div className="space-y-1">
                        {visibleNavItems.map(
                          ({ href, name, icon: Icon }, index) => (
                            <motion.div
                              key={name}
                              variants={navItemVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.06 }}
                            >
                              <Link
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                group flex items-center justify-between w-full px-5 py-4 text-base font-medium transition-all duration-300 rounded-2xl
                                ${
                                  pathname === href
                                    ? "text-white bg-gradient-to-r from-white/20 to-white/10 border border-white/30 shadow-lg transform"
                                    : "text-white/80 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 hover:transform hover:scale-[1.02]"
                                }
                                active:scale-95
                              `}
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`
                                  p-2 rounded-lg transition-colors duration-300
                                  ${
                                    pathname === href
                                      ? "bg-white/20 text-white"
                                      : "bg-white/5 text-white/70 group-hover:bg-white/15 group-hover:text-white"
                                  }
                                `}
                                  >
                                    <Icon size={20} />
                                  </div>
                                  <span className="font-medium">{name}</span>
                                </div>

                                {pathname === href ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-white rounded-full shadow-lg"
                                  />
                                ) : (
                                  <motion.div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                                )}
                              </Link>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Auth Section */}
                  {renderMobileAuth()}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
