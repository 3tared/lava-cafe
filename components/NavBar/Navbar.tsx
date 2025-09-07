// navbar.tsx
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

// Type for navigation/menu items, including optional 'section'
type NavMenuItem = {
  href: string;
  name: string;
  roles: string[];
  icon: React.ElementType;
  section?: string;
};

// Enhanced navigation items with role-based access and icons
const enhancedNavItems: NavMenuItem[] = [
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

    // Add debugging for production
    console.log("🔍 HasAccess Debug:", {
      requiredRoles: roles,
      userRole: userRole,
      isAuthenticated: isAuthenticated,
      user: user,
      userEmail: user?.email,
    });

    const hasRoleAccess = roles.includes(userRole);
    console.log("✅ Access granted:", hasRoleAccess);

    return hasRoleAccess;
  };

  // Filter navigation items based on user role
  const visibleNavItems = enhancedNavItems.filter((item) =>
    hasAccess(item.roles)
  );

  // Create unified menu items for mobile
  const getMobileMenuItems = () => {
    const items = [...visibleNavItems];

    if (isAuthenticated && user) {
      // Add account settings
      items.push({
        href: "/account",
        name: "Account Settings",
        roles: ["all"],
        icon: User,
        section: "account",
      });

      // Add occasions for eligible users
      if (hasAccess(["admin", "moderator", "employee_viewer"])) {
        items.push({
          href: "/occasions",
          name: "Manage Occasions",
          roles: ["admin", "moderator", "employee_viewer"],
          icon: Calendar,
          section: "account",
        });
      }

      // Add admin dashboard
      if (isAdmin) {
        items.push({
          href: "/dashboard",
          name: "Admin Dashboard",
          roles: ["admin"],
          icon: Shield,
          section: "admin",
        });
      }
    }

    return items;
  };

  // Updated admin check effect with better error handling
  useEffect(() => {
    const checkAdminStatus = async () => {
      // Only run if we have a confirmed authenticated user
      if (isAuthenticated && user?.email && !isLoading) {
        setIsCheckingAdmin(true);
        try {
          const response = await fetch(
            `/api/admin-check?email=${encodeURIComponent(user.email)}`,
            {
              method: "GET",
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
            setUserRole(data.role);
            setNotifications(Math.floor(Math.random() * 5));
          } else {
            console.error("Admin check failed:", response.status);
            setIsAdmin(false);
            setUserRole("user");
          }
        } catch (error) {
          console.error("Failed to check admin status:", error);
          setIsAdmin(false);
          setUserRole("user");
        } finally {
          setIsCheckingAdmin(false);
        }
      } else if (!isAuthenticated && !isLoading) {
        // Reset states when not authenticated
        setIsAdmin(false);
        setUserRole("user");
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isAuthenticated, user?.email, isLoading]);

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
      scale: 0.95,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 },
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
        <div className="flex items-center space-x-3">
          <div className="flex space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
            <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
            <div className="w-20 h-10 bg-white/20 rounded-xl animate-pulse hidden lg:block"></div>
          </div>
        </div>
      );
    }

    if (isAuthenticated && user && !isLoading && !isCheckingAdmin) {
      return (
        <div className="flex items-center space-x-3">
          {/* Search Icon */}
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 group"
            title="Search"
          >
            <Search
              size={20}
              className="text-white transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Notifications */}
          <div className="relative notification-container">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 group"
              title="Notifications"
            >
              <Bell
                size={20}
                className="text-white transition-transform group-hover:scale-110"
              />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white/20"
                >
                  {notifications > 9 ? "9+" : notifications}
                </motion.span>
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-200/50 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100/80 bg-gradient-to-r from-gray-50/50 to-white/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg">
                        Notifications
                      </h3>
                      {notifications > 0 && (
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
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
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-6 py-4 hover:bg-gray-50/70 border-b border-gray-50/50 last:border-b-0 cursor-pointer transition-all duration-200 hover:shadow-sm"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 font-semibold">
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
                        <div className="px-6 py-4 text-center border-t border-gray-100/80 bg-gradient-to-r from-gray-50/30 to-white/30">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            View all {notifications} notifications
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                      <Bell size={36} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-sm font-medium">
                        No new notifications
                      </p>
                      <p className="text-xs mt-1">
                        We&apos;ll notify you when something happens
                      </p>
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
              className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/15 hover:from-white/20 hover:to-white/25 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg"
            >
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white/40 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 bg-gradient-to-r from-white/20 to-white/30 rounded-full flex items-center justify-center border border-white/30">
                  <User size={20} className="text-white" />
                </div>
              )}
              <div className="text-left hidden lg:block">
                <p className="text-white text-sm font-semibold leading-tight">
                  {user.given_name || user.email?.split("@")[0]}
                </p>
                <p className="text-white/80 text-xs leading-tight font-medium">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/80 transition-transform duration-200 ${
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
                  className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-200/50 overflow-hidden"
                >
                  <div className="px-6 py-5 border-b border-gray-100/80 bg-gradient-to-r from-gray-50/50 to-white/50">
                    <div className="flex items-center space-x-4">
                      {user.picture ? (
                        <Image
                          src={user.picture}
                          alt="User avatar"
                          width={56}
                          height={56}
                          className="rounded-full border-3 border-gray-200/70 shadow-lg"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-3 border-gray-200/70 shadow-lg">
                          <User size={28} className="text-gray-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.given_name} {user.family_name}
                        </p>
                        <p className="text-xs text-gray-600 truncate font-medium">
                          {user.email}
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                            userRole === "admin"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : userRole === "moderator"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : userRole === "employee_viewer"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              userRole === "admin"
                                ? "bg-red-500"
                                : userRole === "moderator"
                                  ? "bg-blue-500"
                                  : userRole === "employee_viewer"
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                            }`}
                          />
                          {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50/70 transition-all duration-200 hover:shadow-sm group"
                    >
                      <User
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-medium">Account Settings</span>
                    </Link>

                    {hasAccess(["admin", "moderator", "employee_viewer"]) && (
                      <Link
                        href="/occasions"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50/70 transition-all duration-200 hover:shadow-sm group"
                      >
                        <Calendar
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span className="font-medium">Occasions</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-sm text-blue-600 hover:bg-blue-50/70 transition-all duration-200 hover:shadow-sm group"
                      >
                        <Shield
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span className="font-semibold">Admin Dashboard</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-gray-100/80 pt-2 bg-gradient-to-r from-gray-50/30 to-white/30">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50/70 transition-all duration-200 hover:shadow-sm group"
                    >
                      <LogOut
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-semibold">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
    // Only show auth buttons if we're definitively NOT authenticated
    if (!isAuthenticated && !isLoading && !isCheckingAdmin) {
      return (
        <div className="flex items-center space-x-3">
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <LoginLink className="flex items-center space-x-2 px-5 py-3 text-base font-semibold text-white/90 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 group">
              <LogIn
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="hidden sm:block">Sign In</span>
            </LoginLink>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <RegisterLink className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-white/20 to-white/30 hover:from-white/30 hover:to-white/40 rounded-xl text-base font-semibold text-white transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/40 shadow-lg hover:shadow-xl group">
              <UserPlus
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Get Started</span>
            </RegisterLink>
          </motion.div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-3">
        <div className="w-20 h-10 bg-white/20 rounded-xl animate-pulse"></div>
      </div>
    );
  };
  // Enhanced mobile authentication section - now unified with navigation
  const renderUnifiedMobileMenu = () => {
    if (isLoading || isCheckingAdmin) {
      return (
        <div className="px-4 py-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl"
              >
                <div className="w-8 h-8 bg-white/20 rounded-xl"></div>
                <div className="h-4 bg-white/20 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const mobileMenuItems = getMobileMenuItems();

    return (
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-2">
          {/* User Info Card for Authenticated Users */}
          {isAuthenticated && user && (
            <motion.div
              variants={navItemVariants}
              className="mb-6 p-4 bg-gradient-to-br from-white/15 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white/30 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/30 rounded-full flex items-center justify-center border border-white/30">
                    <User size={20} className="text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate">
                    {user.given_name} {user.family_name}
                  </p>
                  <p className="text-white/70 text-xs leading-tight truncate">
                    {user.email}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      userRole === "admin"
                        ? "bg-red-500/20 text-red-200 border border-red-400/30"
                        : userRole === "moderator"
                          ? "bg-blue-500/20 text-blue-200 border border-blue-400/30"
                          : userRole === "employee_viewer"
                            ? "bg-green-500/20 text-green-200 border border-green-400/30"
                            : "bg-gray-500/20 text-gray-200 border border-gray-400/30"
                    }`}
                  >
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Unified Menu Items */}
          {mobileMenuItems.map(({ href, name, icon: Icon, section }, index) => (
            <motion.div
              key={`${href}-${name}`}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center w-full px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl relative overflow-hidden
                  ${
                    pathname === href
                      ? "text-white bg-gradient-to-r from-white/20 via-white/15 to-white/10 border border-white/30 shadow-sm scale-[1.02]"
                      : section === "admin"
                        ? "text-blue-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-400/20 border border-blue-400/20 hover:border-blue-300/40"
                        : section === "account"
                          ? "text-white/90 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                          : "text-white/90 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                  }
                  active:scale-95 backdrop-blur-sm hover:scale-[1.01]
                `}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className={`
                      p-2 rounded-lg transition-all duration-200 shadow-sm flex-shrink-0
                      ${
                        pathname === href
                          ? "bg-white/20 text-white"
                          : section === "admin"
                            ? "bg-blue-500/20 text-blue-200 group-hover:bg-blue-400/30"
                            : "bg-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="font-medium truncate">{name}</span>
                </div>

                {pathname === href && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full shadow-sm flex-shrink-0"
                  />
                )}

                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out" />
              </Link>
            </motion.div>
          ))}

          {/* Authentication Actions for Non-Authenticated Users */}
          {!isAuthenticated && (
            <>
              <div className="border-t border-white/20 my-6"></div>

              <motion.div variants={navItemVariants} className="space-y-3">
                <LoginLink
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center w-full px-4 py-4 text-base font-semibold transition-all duration-200 rounded-xl text-white/90 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-95 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                      <LogIn size={18} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="block font-semibold">Sign In</span>
                      <span className="text-sm text-white/70">
                        Access your account
                      </span>
                    </div>
                  </div>
                </LoginLink>

                <RegisterLink
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center w-full px-4 py-4 text-base font-semibold transition-all duration-200 rounded-xl text-white bg-gradient-to-r from-white/20 to-white/15 hover:from-white/30 hover:to-white/25 border border-white/30 hover:border-white/40 shadow-sm hover:scale-[1.01] active:scale-95 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2.5 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
                      <UserPlus size={18} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="block font-semibold">Get Started</span>
                      <span className="text-sm text-white/80">
                        Create new account
                      </span>
                    </div>
                  </div>
                </RegisterLink>
              </motion.div>
            </>
          )}

          {/* Sign Out Section for Authenticated Users */}
          {isAuthenticated && user && (
            <>
              <div className="border-t border-white/20 my-6"></div>

              <motion.div variants={navItemVariants}>
                <button
                  onClick={handleLogout}
                  className="group flex items-center w-full px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl text-red-200 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 border border-red-400/20 hover:border-red-300/40 hover:scale-[1.01] active:scale-95 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-400/30 transition-colors">
                      <LogOut size={18} className="text-red-200" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </div>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
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
          ? "bg-lavasecondary-500/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-lavasecondary-500"
      }`}
    >
      <nav className="mx-auto max-w-8xl py-4 lg:py-5">
        {/* Enhanced Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Enhanced Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Link href="/" className="group flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={mainlogo.src}
                  alt={mainlogo.alt}
                  width={56}
                  height={56}
                  className="object-contain rounded-full transition-all duration-300 group-hover:scale-110 border-2 border-white/20 group-hover:border-white/40 shadow-lg group-hover:shadow-xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden xl:block">
                <h1 className="text-white font-bold text-2xl leading-tight group-hover:text-white/95 transition-colors">
                  Lava Cafe
                </h1>
                <p className="text-white/70 text-sm leading-tight font-medium">
                  Premium Experience
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Navigation Links */}
          <div className="flex items-center space-x-1 xl:space-x-2">
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
                    group relative flex items-center space-x-2 px-4 py-3 text-base font-semibold tracking-wide transition-all duration-300 rounded-xl overflow-hidden
                    ${
                      pathname === href
                        ? "text-white bg-gradient-to-r from-white/20 to-white/15 border border-white/30 shadow-lg"
                        : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                    }
                    backdrop-blur-sm
                  `}
                >
                  <Icon
                    size={18}
                    className="flex-shrink-0 group-hover:scale-110 transition-transform"
                  />
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Auth Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderAuthButtons()}
          </motion.div>
        </div>

        {/* Enhanced Mobile and Tablet Navigation */}
        <div className="flex justify-between items-center lg:hidden">
          {/* Enhanced Mobile Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <Image
                src={mainlogo.src}
                alt={mainlogo.alt}
                width={48}
                height={48}
                className="rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-105 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl leading-tight group-hover:text-white/95 transition-colors">
                Lava Cafe
              </h1>
              <p className="text-white/70 text-sm leading-tight font-medium">
                Premium Experience
              </p>
            </div>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search & Notifications for authenticated users */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2">
                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm border border-white/10 hover:border-white/20"
                >
                  <Search
                    size={20}
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm border border-white/10 hover:border-white/20"
                >
                  <Bell
                    size={20}
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg border border-white/20">
                      {notifications > 9 ? "9+" : notifications}
                    </span>
                  )}
                </motion.button>
              </div>
            )}

            {/* Enhanced Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="p-3 rounded-xl bg-gradient-to-r from-white/10 to-white/15 hover:from-white/20 hover:to-white/25 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg group"
              aria-label="Open menu"
            >
              <Menu
                size={24}
                className="text-white group-hover:scale-110 transition-transform"
              />
            </motion.button>
          </div>

          {/* Enhanced Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Enhanced Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
                />

                {/* Enhanced Mobile Menu Panel */}
                <motion.div
                  className="fixed top-0 right-0 z-50 bg-gradient-to-br from-lavasecondary-500 via-lavasecondary-500/95 to-lavasecondary-600/95 backdrop-blur-xl shadow-2xl w-full max-w-sm h-full flex flex-col border-l border-white/20 overflow-hidden"
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Enhanced Mobile Menu Header */}
                  <div className="relative flex justify-between items-center p-6 border-b border-white/20 bg-gradient-to-r from-white/5 to-transparent flex-shrink-0">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center space-x-3"
                    >
                      <div className="relative">
                        <Image
                          src={mainlogo.src}
                          alt={mainlogo.alt}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-xl leading-tight">
                          Lava Cafe
                        </h2>
                        <p className="text-white/80 text-sm leading-tight font-medium">
                          Navigation Menu
                        </p>
                      </div>
                    </Link>

                    <motion.button
                      onClick={() => setIsOpen(false)}
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm border border-red-400/40 group shadow-lg"
                      aria-label="Close menu"
                    >
                      <X
                        size={22}
                        className="text-red-300 group-hover:scale-110 transition-transform"
                      />
                    </motion.button>

                    {/* Decorative gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Unified Mobile Menu Content */}
                  {renderUnifiedMobileMenu()}

                  {/* Footer gradient */}
                  <div className="h-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 flex-shrink-0" />
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
