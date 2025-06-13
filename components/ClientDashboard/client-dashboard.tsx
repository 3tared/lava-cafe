"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Menu as MenuIcon,
  Image as GalleryIcon,
  Calendar,
  Settings,
  LogOut,
  User,
  Users,
  ChevronLeft,
  Bell,
  Search,
  X,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MoreVertical,
  Building2,
  CircuitBoard,
  Package,
} from "lucide-react";

// Define types for user and kindeUser
interface UserType {
  id: string;
  firstName: string;
  role: string;
}

interface KindeUserType {
  id: string;
  given_name: string;
}

// Client component to handle interactive elements
export default function ClientDashboard({
  children,
  user,
  kindeUser,
}: {
  children: React.ReactNode;
  user: UserType;
  kindeUser: KindeUserType;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [notifications] = useState(3);
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Navigation items
  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <Home size={20} />,
      id: "overview",
    },
    {
      name: "Employees",
      href: "/dashboard/employees",
      icon: <Users size={20} />,
      id: "employees",
    },
    {
      name: "Departments",
      href: "/dashboard/departments",
      icon: <Building2 size={20} />,
      id: "departments",
    },
    {
      name: "Menu Items",
      href: "/dashboard/menu",
      icon: <MenuIcon size={20} />,
      id: "menu",
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <CircuitBoard size={20} />,
      id: "categories",
    },
    {
      name: "Gallery",
      href: "/dashboard/gallery",
      icon: <GalleryIcon size={20} />,
      id: "gallery",
    },
    {
      name: "Events",
      href: "/dashboard/events",
      icon: <Calendar size={20} />,
      id: "events",
    },
    {
      name: "Packages",
      href: "/dashboard/packages",
      icon: <Package size={20} />,
      id: "packages",
    },
    {
      name: "Careers",
      href: "/dashboard/careers",
      icon: <Building2 size={20} />,
      id: "careers",
    },
    {
      name: "Announcements",
      href: "/dashboard/announcements",
      icon: <Bell size={20} />,
      id: "announcements",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
      id: "settings",
    },
  ];

  // Handle closing the mobile menu when clicking a nav item
  const handleNavItemClick = (itemId: string) => {
    setActivePage(itemId);
    setMobileMenuOpen(false);
  };

  // Toggle mobile search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-[-80px] sm:mt-[-100px] px-[-16px] sm:px-[-24px] lg:px-[-32px] overflow-hidden]">
      {/* Sidebar Navigation - Hidden on mobile, unless menu button is clicked */}
      <AnimatePresence>
        {((!mobileMenuOpen && !collapsed) || (mobileMenuOpen && collapsed)) && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setMobileMenuOpen(false);
              setCollapsed(true);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`bg-white shadow-lg flex flex-col justify-between fixed lg:relative z-30 h-full ${
          mobileMenuOpen
            ? "left-0"
            : collapsed
              ? "-left-20 lg:left-0"
              : "-left-64 lg:left-0"
        }`}
        initial={{ width: 250 }}
        animate={{ width: collapsed ? 80 : 250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo and collapse button */}
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-xl text-blue-600"
            >
              Admin Panel
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCollapsed(!collapsed);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft
              size={18}
              className={`transform transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </motion.button>
        </div>

        {/* User profile */}
        <div className="p-4 border-b">
          {collapsed ? (
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium"
              >
                {(
                  user?.firstName?.[0] ||
                  kindeUser?.given_name?.[0] ||
                  "A"
                ).toUpperCase()}
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {(
                  user?.firstName?.[0] ||
                  kindeUser?.given_name?.[0] ||
                  "A"
                ).toUpperCase()}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="font-medium">
                  {user?.firstName || kindeUser?.given_name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <motion.div
                    className={`flex items-center rounded-lg px-3 py-2.5 cursor-pointer ${
                      activePage === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleNavItemClick(item.id)}
                    whileHover={{ x: collapsed ? 0 : 4 }}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <motion.span
                        className="ml-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Link href="/api/auth/logout">
            <motion.div
              className="flex items-center rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-100 cursor-pointer"
              whileHover={{ x: collapsed ? 0 : 4 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogOut size={20} />
              {!collapsed && (
                <motion.span
                  className="ml-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Sign Out
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center space-x-3">
              {/* Mobile menu toggle */}
              <button
                className="lg:hidden mr-2"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setCollapsed(false);
                }}
              >
                <MenuIcon size={20} />
              </button>

              <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                {navItems.find((item) => item.id === activePage)?.name ||
                  "Dashboard"}
              </h1>
              <span className="text-xs md:text-sm text-gray-500 hidden sm:inline-block">
                {currentTime}
              </span>
            </div>

            <div className="flex items-center">
              {/* Search - toggle on mobile, always visible on desktop */}
              <AnimatePresence>
                {(searchOpen || isDesktop) && (
                  <motion.div
                    className={`${searchOpen ? "absolute top-0 left-0 right-0 bg-white p-3 z-20 shadow-md" : "relative hidden md:block"}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        autoFocus={searchOpen}
                      />
                      <Search
                        size={18}
                        className="absolute left-3 top-2.5 text-gray-400"
                      />
                      {searchOpen && (
                        <button
                          className="absolute right-3 top-2.5 text-gray-400"
                          onClick={() => setSearchOpen(false)}
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center space-x-3 md:space-x-4 ml-2">
                {/* Search toggle (mobile only) */}
                <motion.button
                  className="md:hidden"
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} className="text-gray-600" />
                </motion.button>

                {/* Notifications */}
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell size={20} className="text-gray-600" />
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">
                        {notifications}
                      </span>
                    </motion.div>
                  )}
                </motion.div>

                {/* User menu (mobile only) */}
                <div className="md:hidden">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={20} className="text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-3 sm:p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
