"use client";
import React, { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Trash2,
  Filter,
  Search,
  AlertTriangle,
} from "lucide-react";

// Types
interface Position {
  title: string;
  description: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  status: "PENDING" | "REVIEWED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED";
  position: Position;
  experience?: string;
  createdAt: string;
}

interface StatusOption {
  value: string;
  label: string;
  count: number;
}

interface UseJobApplicationsReturn {
  applications: Application[];
  loading: boolean;
  refetch: () => Promise<void>;
}

// Assuming this hook exists in your codebase
declare function useJobApplications(): UseJobApplicationsReturn;

type ApplicationStatus = Application["status"];

export function JobApplicationsManager(): JSX.Element {
  const { applications, loading, refetch } = useJobApplications();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const statusOptions: StatusOption[] = [
    {
      value: "ALL",
      label: "All Applications",
      count: applications?.length || 0,
    },
    {
      value: "PENDING",
      label: "Pending",
      count:
        applications?.filter((app: Application) => app.status === "PENDING")
          .length || 0,
    },
    {
      value: "REVIEWED",
      label: "Reviewed",
      count:
        applications?.filter((app: Application) => app.status === "REVIEWED")
          .length || 0,
    },
    {
      value: "INTERVIEWED",
      label: "Interviewed",
      count:
        applications?.filter((app: Application) => app.status === "INTERVIEWED")
          .length || 0,
    },
    {
      value: "ACCEPTED",
      label: "Accepted",
      count:
        applications?.filter((app: Application) => app.status === "ACCEPTED")
          .length || 0,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      count:
        applications?.filter((app: Application) => app.status === "REJECTED")
          .length || 0,
    },
  ];

  const updateStatus = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ): Promise<void> => {
    setUpdating(applicationId);
    try {
      const response = await fetch(`/api/job-applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      await refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(null);
    }
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
    setDeleting(applicationId);
    try {
      const response = await fetch(`/api/job-applications/${applicationId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete application");
      await refetch();
    } catch (error) {
      console.error("Error deleting application:", error);
    } finally {
      setDeleting(null);
      setShowDeleteConfirm(null);
    }
  };

  const filteredApplications: Application[] =
    applications?.filter((app: Application) => {
      const matchesStatus: boolean =
        selectedStatus === "ALL" || app.status === selectedStatus;
      const matchesSearch: boolean =
        searchTerm === "" ||
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  const getStatusColor = (status: ApplicationStatus): string => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "INTERVIEWED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ACCEPTED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const statusButtonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status: string): void => {
    setSelectedStatus(status);
  };

  const handleDeleteConfirm = (applicationId: string): void => {
    setShowDeleteConfirm(applicationId);
  };

  const handleDeleteCancel = (): void => {
    setShowDeleteConfirm(null);
  };

  const handleDeleteConfirmed = (): void => {
    if (showDeleteConfirm) {
      deleteApplication(showDeleteConfirm);
    }
  };

  const clearSearch = (): void => {
    setSearchTerm("");
  };

  const toggleFilters = (): void => {
    setShowFilters(!showFilters);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const statuses: ApplicationStatus[] = [
    "PENDING",
    "REVIEWED",
    "INTERVIEWED",
    "ACCEPTED",
    "REJECTED",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-xl text-gray-600">Loading applications...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Job Applications
              </h1>
              <p className="text-gray-600">
                Manage and track all job applications
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-3 w-full sm:w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFilters}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>
          </div>

          {/* Status Filter Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="flex flex-wrap gap-3">
                  {statusOptions.map((option: StatusOption) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedStatus === option.value
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {option.label}
                      <span className="ml-2 opacity-75">({option.count})</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredApplications.map((application: Application) => (
              <motion.div
                key={application.id}
                variants={itemVariants}
                layout
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          className="p-2 bg-blue-100 rounded-full"
                        >
                          <User size={20} className="text-blue-600" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {application.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            Age: {application.age}
                          </p>
                        </div>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(application.status)} self-start`}
                      >
                        {application.status}
                      </motion.span>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={`mailto:${application.email}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                      >
                        <Mail size={16} />
                        <span className="truncate">{application.email}</span>
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={`tel:${application.phone}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                      >
                        <Phone size={16} />
                        {application.phone}
                      </motion.a>
                      <div className="flex items-center gap-2 text-gray-600 p-2">
                        <MapPin size={16} />
                        {application.address}
                      </div>
                    </div>

                    {/* Position Info */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase size={16} className="text-gray-600" />
                        <span className="font-semibold text-gray-900">
                          {application.position.title}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {application.position.description}
                      </p>
                    </div>

                    {/* Experience */}
                    {application.experience && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-blue-50 p-4 rounded-xl"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Experience:
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {application.experience}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Actions Sidebar */}
                  <div className="lg:w-80 space-y-4">
                    {/* Applied Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 lg:justify-end">
                      <Calendar size={16} />
                      Applied:{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>

                    {/* Status Buttons */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                      {statuses.map((status: ApplicationStatus) => (
                        <motion.button
                          key={status}
                          variants={statusButtonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => updateStatus(application.id, status)}
                          disabled={
                            updating === application.id ||
                            application.status === status
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            application.status === status
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : updating === application.id
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md"
                          }`}
                        >
                          {updating === application.id ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
                            />
                          ) : (
                            status
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDeleteConfirm(application.id)}
                      disabled={deleting === application.id}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
                    >
                      {deleting === application.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Trash2 size={16} />
                          <span className="font-medium">
                            Delete Application
                          </span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredApplications.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <Briefcase size={32} className="text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-500">
              {selectedStatus === "ALL"
                ? "No applications have been submitted yet."
                : `No applications with status "${selectedStatus}".`}
            </p>
            {searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear search
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleDeleteCancel}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={handleModalClick}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Delete Application
                    </h3>
                    <p className="text-gray-600">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete this job application? All
                  related data will be permanently removed.
                </p>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeleteCancel}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeleteConfirmed}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
