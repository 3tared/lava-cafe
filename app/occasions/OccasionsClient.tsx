"use client";

import { useState, useEffect } from "react";
import { format, startOfDay, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  DollarSign,
  StickyNote,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  AlertTriangle,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";

interface Package {
  id: string;
  name: string;
  originalPrice: string;
  price: string;
  per: string;
  description: string;
  items: string[];
  emoji: string;
  popular: boolean;
  tag: string;
  discount: string;
}

interface Occasion {
  id: string;
  name: string;
  date: string;
  type: string;
  packageType: Package;
  peopleCount: number;
  time: string;
  contactNumber: string;
  prepaid: number;
  notes?: string | null;
  status?: "upcoming" | "today" | "expired" | "completed";
  location?: string;
  priority?: "low" | "medium" | "high";
  createdBy: {
    firstName?: string;
    lastName?: string;
    email: string;
  };
  createdAt: string;
}

interface Permissions {
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
}

interface Props {
  initialOccasions: Occasion[];
  packages: Package[];
  permissions: Permissions;
  user: User;
}

export default function OccasionsClient({
  initialOccasions,
  packages,
  permissions,
}: Props) {
  const [occasions, setOccasions] = useState<Occasion[]>(initialOccasions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState<Occasion | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  const [expiredOccasions, setExpiredOccasions] = useState<Occasion[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "",
    packageId: "",
    peopleCount: "",
    time: "",
    contactNumber: "",
    prepaid: "",
    notes: "",
    location: "",
    priority: "medium",
  });

  // State for time input (12-hour format)
  const [timeInput, setTimeInput] = useState<{
    time: string;
    period: "AM" | "PM";
  }>({
    time: "",
    period: "AM",
  });

  // Sync timeInput with formData.time (for editing)
  useEffect(() => {
    if (isModalOpen) {
      if (formData.time) {
        // Convert 24h to 12h
        const [h, m] = formData.time.split(":");
        let hour = parseInt(h, 10);
        let period: "AM" | "PM" = "AM";
        if (hour >= 12) {
          period = "PM";
          if (hour > 12) hour -= 12;
        } else if (hour === 0) {
          hour = 12;
        }
        setTimeInput({
          time: `${hour.toString().padStart(2, "0")}:${m}`,
          period,
        });
      } else {
        setTimeInput({ time: "", period: "AM" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, formData.time]);

  // Handle time input changes
  const handleTimeChange = (field: "time" | "period", value: string) => {
    setTimeInput((prev) => {
      const updated = { ...prev, [field]: value };
      // Convert to 24h and update formData.time
      if (updated.time) {
        const [h, m] = updated.time.split(":");
        let hour = parseInt(h, 10);
        if (updated.period === "PM" && hour < 12) hour += 12;
        if (updated.period === "AM" && hour === 12) hour = 0;
        const time24 = `${hour.toString().padStart(2, "0")}:${m}`;
        setFormData((prevForm) => ({ ...prevForm, time: time24 }));
      }
      return updated;
    });
  };

  const occasionTypes = [
    "Birthday",
    "Engagement",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Corporate Event",
    "Baby Shower",
    "Retirement",
    "Holiday Party",
    "Other",
  ];

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    today: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  };

  // Convert 24h to 12h format
  const formatTime12Hour = (time24: string) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Update occasion status based on date
  const updateOccasionStatus = (occasion: Occasion): Occasion => {
    const today = startOfDay(new Date());
    const occasionDate = startOfDay(new Date(occasion.date));

    let status: Occasion["status"] = "upcoming";

    if (occasionDate < today) {
      status = "expired";
    } else if (occasionDate.getTime() === today.getTime()) {
      status = "today";
    }

    return { ...occasion, status };
  };

  // Auto-delete expired occasions (older than 7 days)
  const cleanupExpiredOccasions = async () => {
    const today = new Date();
    const expiredToDelete = occasions.filter((occasion) => {
      const occasionDate = new Date(occasion.date);
      return differenceInDays(today, occasionDate) > 7;
    });

    if (expiredToDelete.length > 0) {
      setExpiredOccasions(expiredToDelete);
      setShowExpiredAlert(true);

      // Auto-delete after showing alert for 5 seconds
      setTimeout(async () => {
        for (const occasion of expiredToDelete) {
          try {
            await fetch(`/api/occasions/${occasion.id}`, {
              method: "DELETE",
            });
          } catch (error) {
            console.error("Error auto-deleting expired occasion:", error);
          }
        }

        setOccasions((prev) =>
          prev.filter(
            (o) => !expiredToDelete.some((expired) => expired.id === o.id)
          )
        );
        setShowExpiredAlert(false);
        setExpiredOccasions([]);
      }, 5000);
    }
  };

  // Update occasions status and cleanup expired ones
  useEffect(() => {
    const updatedOccasions = occasions.map(updateOccasionStatus);
    setOccasions(updatedOccasions);
    cleanupExpiredOccasions();
  }, []);

  // Cleanup check every hour
  useEffect(() => {
    const interval = setInterval(
      () => {
        cleanupExpiredOccasions();
      },
      60 * 60 * 1000
    ); // Check every hour

    return () => clearInterval(interval);
  }, [occasions]);

  // Filter occasions based on search, type, and status
  const filteredOccasions = occasions.filter((occasion) => {
    const matchesSearch =
      occasion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occasion.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (occasion.location &&
        occasion.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !filterType || occasion.type === filterType;
    const matchesStatus = !statusFilter || occasion.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort occasions by priority and date
  const sortedOccasions = [...filteredOccasions].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority || "medium"];
    const bPriority = priorityOrder[b.priority || "medium"];

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      type: "",
      packageId: "",
      peopleCount: "",
      time: "",
      contactNumber: "",
      prepaid: "",
      notes: "",
      location: "",
      priority: "medium",
    });
    setEditingOccasion(null);
  };

  const openModal = (occasion?: Occasion) => {
    if (occasion && permissions.canEdit) {
      setEditingOccasion(occasion);
      setFormData({
        name: occasion.name,
        date: format(new Date(occasion.date), "yyyy-MM-dd"),
        type: occasion.type,
        packageId: occasion.packageType.id,
        peopleCount: occasion.peopleCount.toString(),
        time: occasion.time,
        contactNumber: occasion.contactNumber,
        prepaid: occasion.prepaid.toString(),
        notes: occasion.notes || "",
        location: occasion.location || "",
        priority: occasion.priority || "medium",
      });
    } else if (!occasion && permissions.canAdd) {
      resetForm();
    } else {
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingOccasion
        ? `/api/occasions/${editingOccasion.id}`
        : "/api/occasions";

      const method = editingOccasion ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { occasion } = await response.json();
        const updatedOccasion = updateOccasionStatus(occasion);

        if (editingOccasion) {
          setOccasions((prev) =>
            prev.map((o) => (o.id === updatedOccasion.id ? updatedOccasion : o))
          );
        } else {
          setOccasions((prev) => [updatedOccasion, ...prev]);
        }

        closeModal();
      } else {
        const error = await response.json();
        alert(error.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error saving occasion:", error);
      alert("An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (occasion: Occasion) => {
    if (!permissions.canDelete) return;

    if (!confirm("Are you sure you want to delete this occasion?")) return;

    try {
      const response = await fetch(`/api/occasions/${occasion.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOccasions((prev) => prev.filter((o) => o.id !== occasion.id));
      } else {
        const error = await response.json();
        alert(error.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error deleting occasion:", error);
      alert("An error occurred while deleting");
    }
  };

  const handleMarkComplete = async (occasion: Occasion) => {
    try {
      const response = await fetch(`/api/occasions/${occasion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...occasion, status: "completed" }),
      });

      if (response.ok) {
        setOccasions((prev) =>
          prev.map((o) =>
            o.id === occasion.id ? { ...o, status: "completed" as const } : o
          )
        );
      }
    } catch (error) {
      console.error("Error marking occasion as complete:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCreatorName = (creator: Occasion["createdBy"]) => {
    if (creator.firstName && creator.lastName) {
      return `${creator.firstName} ${creator.lastName}`;
    }
    return creator.firstName || creator.lastName || creator.email;
  };

  const getDaysUntil = (date: string) => {
    const today = startOfDay(new Date());
    const occasionDate = startOfDay(new Date(date));
    return differenceInDays(occasionDate, today);
  };

  const getStatusIcon = (status: Occasion["status"]) => {
    switch (status) {
      case "today":
        return <Star className="w-4 h-4" />;
      case "expired":
        return <AlertTriangle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  // Stats calculation
  const stats = {
    total: occasions.length,
    upcoming: occasions.filter((o) => o.status === "upcoming").length,
    today: occasions.filter((o) => o.status === "today").length,
    expired: occasions.filter((o) => o.status === "expired").length,
    completed: occasions.filter((o) => o.status === "completed").length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Expired Occasions Alert */}
      <AnimatePresence>
        {showExpiredAlert && expiredOccasions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Auto-cleanup in progress</h4>
                <p className="text-sm opacity-90">
                  {expiredOccasions.length} expired occasion(s) older than 7
                  days will be automatically deleted.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Occasions
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your special events and celebrations
              </p>
            </div>

            {permissions.canAdd && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus size={20} />
                Add New Occasion
              </motion.button>
            )}
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6"
          >
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600">
                {stats.upcoming}
              </div>
              <div className="text-sm text-gray-600">Upcoming</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">
                {stats.today}
              </div>
              <div className="text-sm text-gray-600">Today</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-red-600">
                {stats.expired}
              </div>
              <div className="text-sm text-gray-600">Expired</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-gray-600">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search occasions, types, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px]"
              >
                <option value="">All Types</option>
                {occasionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px]"
              >
                <option value="">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="today">Today</option>
                <option value="expired">Expired</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>Total: {occasions.length}</span>
                <span>Showing: {sortedOccasions.length}</span>
              </div>
              {(searchTerm || filterType || statusFilter) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("");
                    setStatusFilter("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Occasions Grid */}
      <div className="max-w-7xl mx-auto">
        {sortedOccasions.length > 0 ? (
          <motion.div
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {sortedOccasions.map((occasion) => {
              const daysUntil = getDaysUntil(occasion.date);
              return (
                <motion.div
                  key={occasion.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`group bg-white rounded-2xl shadow-lg border-2 p-6 relative overflow-hidden cursor-pointer ${
                    occasion.status === "today"
                      ? "border-green-300 shadow-green-100"
                      : occasion.status === "expired"
                        ? "border-red-300 shadow-red-100"
                        : "border-gray-100"
                  }`}
                >
                  {/* Gradient background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Priority Badge */}
                  {occasion.priority && (
                    <div
                      className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${priorityColors[occasion.priority]}`}
                    >
                      {occasion.priority}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="relative">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {occasion.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                            {occasion.type}
                          </span>
                          {occasion.status && (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusColors[occasion.status]}`}
                            >
                              {getStatusIcon(occasion.status)}
                              {occasion.status}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {occasion.status !== "completed" &&
                          occasion.status !== "expired" && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkComplete(occasion);
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark as completed"
                            >
                              <CheckCircle size={16} />
                            </motion.button>
                          )}
                        {permissions.canEdit && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(occasion);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={16} />
                          </motion.button>
                        )}
                        {permissions.canDelete && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(occasion);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Days Until */}
                    {daysUntil >= 0 &&
                      daysUntil <= 30 &&
                      occasion.status !== "completed" && (
                        <div
                          className={`mb-4 p-2 rounded-lg text-sm font-medium ${
                            daysUntil === 0
                              ? "bg-green-100 text-green-800"
                              : daysUntil <= 3
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {daysUntil === 0
                            ? "Today!"
                            : daysUntil === 1
                              ? "Tomorrow"
                              : `In ${daysUntil} days`}
                        </div>
                      )}

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CalendarDays
                          size={16}
                          className="text-blue-500 flex-shrink-0"
                        />
                        <span>
                          {format(new Date(occasion.date), "MMM dd, yyyy")}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock
                          size={16}
                          className="text-green-500 flex-shrink-0"
                        />
                        <span>{formatTime12Hour(occasion.time)}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users
                          size={16}
                          className="text-purple-500 flex-shrink-0"
                        />
                        <span>{occasion.peopleCount} people</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone
                          size={16}
                          className="text-orange-500 flex-shrink-0"
                        />
                        <span className="truncate">
                          {occasion.contactNumber}
                        </span>
                      </div>

                      {occasion.location && (
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <MapPin
                            size={16}
                            className="text-red-500 flex-shrink-0"
                          />
                          <span className="truncate">{occasion.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <DollarSign
                          size={16}
                          className="text-green-500 flex-shrink-0"
                        />
                        <span>Prepaid: ${occasion.prepaid}</span>
                      </div>

                      {/* Package Info */}
                      <div className="bg-gray-50 rounded-xl p-3 mt-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">
                            {occasion.packageType.emoji}
                          </span>
                          <span className="font-medium text-gray-900 text-sm">
                            {occasion.packageType.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          ${occasion.packageType.price}{" "}
                          {occasion.packageType.per}
                        </div>
                      </div>

                      {occasion.notes && (
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                          <StickyNote
                            size={16}
                            className="text-yellow-500 flex-shrink-0 mt-0.5"
                          />
                          <span className="line-clamp-2">{occasion.notes}</span>
                        </div>
                      )}

                      {/* Creator */}
                      <div className="pt-3 mt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Created by {getCreatorName(occasion.createdBy)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <CalendarDays size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterType || statusFilter
                  ? "No matching occasions found"
                  : "No occasions yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType || statusFilter
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first occasion"}
              </p>
              {permissions.canAdd &&
                !searchTerm &&
                !filterType &&
                !statusFilter && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus size={20} />
                    Add First Occasion
                  </motion.button>
                )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {editingOccasion ? "Edit Occasion" : "Add New Occasion"}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occasion Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter occasion name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select type</option>
                        {occasionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={timeInput.time}
                          onChange={(e) =>
                            handleTimeChange("time", e.target.value)
                          }
                          required
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <select
                          value={timeInput.period}
                          onChange={(e) =>
                            handleTimeChange("period", e.target.value)
                          }
                          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                      {timeInput.time && (
                        <div className="text-xs text-gray-500 mt-1">
                          Time: {timeInput.time} {timeInput.period}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package *
                      </label>
                      <select
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select package</option>
                        {packages.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.emoji} {pkg.name} - ${pkg.price} {pkg.per}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        People Count *
                      </label>
                      <input
                        type="number"
                        name="peopleCount"
                        value={formData.peopleCount}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Number of people"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prepaid Amount
                      </label>
                      <input
                        type="number"
                        name="prepaid"
                        value={formData.prepaid}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter contact number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Event location"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Add any additional notes..."
                      />
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-3 pt-6 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>
                            {editingOccasion ? "Updating..." : "Creating..."}
                          </span>
                        </div>
                      ) : editingOccasion ? (
                        "Update Occasion"
                      ) : (
                        "Create Occasion"
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
