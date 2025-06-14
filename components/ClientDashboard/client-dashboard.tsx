"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  Building2,
  CircuitBoard,
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  ExternalLink,
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

// Search result interface
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: React.ReactNode;
}

// Notification interface
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
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
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Sample notifications data
  const sampleNotifications: Notification[] = [
    {
      id: "1",
      title: "New Employee Added",
      message:
        "John Doe has been successfully added to the Accounting department.",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      actionUrl: "/dashboard/employees",
    },
    {
      id: "2",
      title: "Menu Update Required",
      message: "The lunch menu for next week needs to be updated by Friday.",
      type: "warning",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: "/dashboard/menu",
    },
    {
      id: "3",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
      type: "info",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
    },
    {
      id: "4",
      title: "Event Registration Full",
      message: "The company picnic event has reached maximum capacity.",
      type: "error",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      actionUrl: "/dashboard/events",
    },
    {
      id: "5",
      title: "New Package Created",
      message:
        "Premium catering package has been created and is ready for review.",
      type: "success",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      actionUrl: "/dashboard/packages",
    },
  ];

  // Initialize notifications
  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  // Get unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      keywords: ["dashboard", "home", "overview", "main", "summary"],
    },
    {
      name: "Employees",
      href: "/dashboard/employees",
      icon: <Users size={20} />,
      id: "employees",
      keywords: ["employees", "staff", "workers", "team", "people", "hr"],
    },
    {
      name: "Departments",
      href: "/dashboard/departments",
      icon: <Building2 size={20} />,
      id: "departments",
      keywords: ["departments", "divisions", "sections", "groups", "teams"],
    },
    {
      name: "Menu Items",
      href: "/dashboard/menu",
      icon: <MenuIcon size={20} />,
      id: "menu",
      keywords: ["menu", "food", "items", "dishes", "meals", "catering"],
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: <CircuitBoard size={20} />,
      id: "categories",
      keywords: ["categories", "types", "groups", "classification"],
    },
    {
      name: "Gallery",
      href: "/dashboard/gallery",
      icon: <GalleryIcon size={20} />,
      id: "gallery",
      keywords: ["gallery", "images", "photos", "pictures", "media"],
    },
    {
      name: "Events",
      href: "/dashboard/events",
      icon: <Calendar size={20} />,
      id: "events",
      keywords: ["events", "calendar", "meetings", "appointments", "schedule"],
    },
    {
      name: "Packages",
      href: "/dashboard/packages",
      icon: <Package size={20} />,
      id: "packages",
      keywords: ["packages", "bundles", "offers", "deals", "services"],
    },
    {
      name: "Careers",
      href: "/dashboard/careers",
      icon: <Building2 size={20} />,
      id: "careers",
      keywords: ["careers", "jobs", "hiring", "recruitment", "positions"],
    },
    {
      name: "Announcements",
      href: "/dashboard/announcements",
      icon: <Bell size={20} />,
      id: "announcements",
      keywords: ["announcements", "notifications", "news", "updates", "alerts"],
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
      id: "settings",
      keywords: ["settings", "configuration", "preferences", "admin", "setup"],
    },
  ];

  // Search functionality
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search through navigation items
    navItems.forEach((item) => {
      const matchesName = item.name.toLowerCase().includes(searchTerm);
      const matchesKeywords = item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm)
      );

      if (matchesName || matchesKeywords) {
        results.push({
          id: `nav-${item.id}`,
          title: item.name,
          description: `Navigate to ${item.name} section`,
          category: "Navigation",
          href: item.href,
          icon: item.icon,
        });
      }
    });

    // Add some sample content results
    const sampleContent = [
      {
        id: "emp-john",
        title: "John Doe",
        description: "Accounting Department - Senior Accountant",
        category: "Employees",
        href: "/dashboard/employees?search=john",
        icon: <User size={16} />,
      },
      {
        id: "event-picnic",
        title: "Company Picnic",
        description: "Annual company picnic scheduled for next month",
        category: "Events",
        href: "/dashboard/events?id=picnic",
        icon: <Calendar size={16} />,
      },
      {
        id: "menu-lunch",
        title: "Lunch Menu",
        description: "Current lunch offerings and daily specials",
        category: "Menu",
        href: "/dashboard/menu?category=lunch",
        icon: <MenuIcon size={16} />,
      },
    ];

    sampleContent.forEach((item) => {
      if (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      ) {
        results.push(item);
      }
    });

    setSearchResults(results);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
  };

  // Handle navigation item click
  const handleNavItemClick = (itemId: string) => {
    setActivePage(itemId);
    setMobileMenuOpen(false);
    clearSearch();
  };

  // Toggle mobile search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      clearSearch();
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Get notification icon
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-green-500" />;
      case "warning":
        return <AlertCircle size={16} className="text-yellow-500" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="flex h-screen bg-gray-50 mt-[-80px] sm:mt-[-100px] px-[-16px] sm:px-[-24px] lg:px-[-32px] overflow-hidden">
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
        <header className="bg-white shadow-sm z-10 relative">
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

            <div className="flex items-center relative">
              {/* Search - toggle on mobile, always visible on desktop */}
              <AnimatePresence>
                {(searchOpen || isDesktop) && (
                  <motion.div
                    className={`${
                      searchOpen && !isDesktop
                        ? "absolute top-0 left-0 right-0 bg-white p-3 z-20 shadow-md"
                        : "relative hidden md:block mr-4"
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search dashboard..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        autoFocus={searchOpen && !isDesktop}
                      />
                      <Search
                        size={18}
                        className="absolute left-3 top-2.5 text-gray-400"
                      />
                      {(searchQuery || searchOpen) && (
                        <button
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={clearSearch}
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-30"
                      >
                        <div className="p-2">
                          <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                            Search Results ({searchResults.length})
                          </div>
                          {searchResults.map((result) => (
                            <Link key={result.id} href={result.href}>
                              <motion.div
                                className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                                whileHover={{ x: 2 }}
                                onClick={clearSearch}
                              >
                                <div className="flex-shrink-0 mr-3">
                                  {result.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {result.title}
                                    </p>
                                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                      {result.category}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 truncate">
                                    {result.description}
                                  </p>
                                </div>
                                <ExternalLink
                                  size={14}
                                  className="text-gray-400 group-hover:text-gray-600"
                                />
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
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
                <div className="relative" ref={notificationRef}>
                  <motion.button
                    className="relative cursor-pointer p-1"
                    onClick={() => setShowNotifications(!showNotifications)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell size={20} className="text-gray-600" />
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-medium">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Notification Panel */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                              Notifications
                            </h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Mark all read
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <motion.div
                                key={notification.id}
                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                                  !notification.read ? "bg-blue-50/50" : ""
                                }`}
                                onClick={() => {
                                  markAsRead(notification.id);
                                  if (notification.actionUrl) {
                                    window.location.href =
                                      notification.actionUrl;
                                  }
                                }}
                                whileHover={{ x: 2 }}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {notification.title}
                                      </p>
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <div className="flex items-center mt-2 text-xs text-gray-500">
                                      <Clock size={12} className="mr-1" />
                                      {formatTimestamp(notification.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="p-8 text-center text-gray-500">
                              <Bell
                                size={32}
                                className="mx-auto mb-2 text-gray-300"
                              />
                              <p className="text-sm">No notifications</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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
