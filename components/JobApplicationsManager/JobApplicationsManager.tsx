"use client";
import React, { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJobApplications } from "@/hooks/useCareers";
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
  Eye,
  AlertTriangle,
  Check,
} from "lucide-react";
import Image from "next/image";

interface StatusOption {
  value: string;
  label: string;
  count?: number;
}

export function JobApplicationsManager(): JSX.Element {
  const { applications, loading, refetch } = useJobApplications();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(
    new Set()
  );
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] =
    useState<boolean>(false);

  const statusOptions: StatusOption[] = [
    { value: "ALL", label: "All Applications" },
    { value: "PENDING", label: "Pending" },
    { value: "REVIEWED", label: "Reviewed" },
    { value: "INTERVIEWED", label: "Interviewed" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];

  // Add counts to status options
  const statusOptionsWithCounts = statusOptions.map((option) => ({
    ...option,
    count:
      option.value === "ALL"
        ? applications.length
        : applications.filter((app) => app.status === option.value).length,
  }));

  const updateStatus = async (
    applicationId: string,
    newStatus: string
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

  const deleteSelectedApplications = async (): Promise<void> => {
    try {
      const deletePromises = Array.from(selectedApplications).map((id) =>
        fetch(`/api/job-applications/${id}`, { method: "DELETE" })
      );

      await Promise.all(deletePromises);
      await refetch();
      setSelectedApplications(new Set());
    } catch (error) {
      console.error("Error deleting selected applications:", error);
    } finally {
      setShowDeleteAllConfirm(false);
    }
  };

  const toggleApplicationSelection = (applicationId: string): void => {
    const newSelection = new Set(selectedApplications);
    if (newSelection.has(applicationId)) {
      newSelection.delete(applicationId);
    } else {
      newSelection.add(applicationId);
    }
    setSelectedApplications(newSelection);
  };

  const toggleSelectAll = (): void => {
    if (selectedApplications.size === filteredApplications.length) {
      setSelectedApplications(new Set());
    } else {
      setSelectedApplications(
        new Set(filteredApplications.map((app) => app.id))
      );
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      selectedStatus === "ALL" || app.status === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "INTERVIEWED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ACCEPTED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Job Applications
              </h1>
              <p className="text-gray-600">
                Manage and track all job applications
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
              <Eye size={16} />
              <span className="font-medium">{filteredApplications.length}</span>
              <span>of {applications.length} applications</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-48"
              >
                {statusOptionsWithCounts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selection Actions */}
          {filteredApplications.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-xl border shadow-sm">
              <div className="flex items-center gap-4">
                {/* Select All Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={
                        selectedApplications.size ===
                          filteredApplications.length &&
                        filteredApplications.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                        selectedApplications.size ===
                          filteredApplications.length &&
                        filteredApplications.length > 0
                          ? "bg-blue-500 border-blue-500"
                          : selectedApplications.size > 0
                            ? "bg-blue-100 border-blue-300"
                            : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {selectedApplications.size ===
                        filteredApplications.length &&
                        filteredApplications.length > 0 && (
                          <Check
                            size={12}
                            className="text-white absolute top-0.5 left-0.5"
                          />
                        )}
                      {selectedApplications.size > 0 &&
                        selectedApplications.size <
                          filteredApplications.length && (
                          <div className="w-2 h-2 bg-blue-500 rounded-sm absolute top-1.5 left-1.5"></div>
                        )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedApplications.size === 0
                      ? "Select All"
                      : selectedApplications.size ===
                          filteredApplications.length
                        ? "Deselect All"
                        : `${selectedApplications.size} Selected`}
                  </span>
                </label>
              </div>

              {/* Delete Selected Button */}
              {selectedApplications.size > 0 && (
                <motion.button
                  onClick={() => setShowDeleteAllConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={16} />
                  Delete Selected ({selectedApplications.size})
                </motion.button>
              )}
            </div>
          )}
        </motion.div>

        {/* Delete All Confirmation Modal */}
        <AnimatePresence>
          {showDeleteAllConfirm && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h3 className="font-semibold text-lg">
                    Delete Selected Applications
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete {selectedApplications.size}{" "}
                  selected application(s)? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteAllConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteSelectedApplications}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Delete Selected
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Applications Grid */}
        <AnimatePresence mode="wait">
          {filteredApplications.length > 0 ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredApplications.map((application, index: number) => (
                <motion.div
                  key={application.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Delete Confirmation Modal */}
                  <AnimatePresence>
                    {showDeleteConfirm === application.id && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="bg-white rounded-xl p-6 mx-4 max-w-sm w-full"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-red-500" size={24} />
                            <h3 className="font-semibold text-lg">
                              Delete Application
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-6">
                            Are you sure you want to delete {application.name}
                            &#39;s application? This action cannot be undone.
                          </p>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => deleteApplication(application.id)}
                              disabled={deleting === application.id}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                              {deleting === application.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-6">
                    {/* Header with Checkbox */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          {/* Checkbox */}
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedApplications.has(
                                  application.id
                                )}
                                onChange={() =>
                                  toggleApplicationSelection(application.id)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                                  selectedApplications.has(application.id)
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-300 hover:border-blue-400"
                                }`}
                              >
                                {selectedApplications.has(application.id) && (
                                  <Check
                                    size={12}
                                    className="text-white absolute top-0.5 left-0.5"
                                  />
                                )}
                              </div>
                            </div>
                            {/* Profile Picture */}
                            {application.pictureUrl ? (
                              <Image
                                src={application.pictureUrl}
                                alt={application.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <User size={20} className="text-gray-500" />
                              </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <User size={20} className="text-blue-600" />
                              {application.name}
                            </h3>
                          </label>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(application.status)} w-fit`}
                          >
                            {application.status}
                          </span>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-blue-500" />
                            <a
                              href={`mailto:${application.email}`}
                              className="hover:text-blue-600 transition-colors truncate"
                            >
                              {application.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-green-500" />
                            <a
                              href={`tel:${application.phone}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {application.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-red-500" />
                            <span className="truncate">
                              {application.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-purple-500" />
                            <span>Age: {application.age}</span>
                          </div>
                        </div>

                        {/* Position */}
                        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase size={16} className="text-indigo-600" />
                            <span className="font-semibold text-gray-900">
                              Applied for: {application.position.title}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 pl-6">
                            {application.position.description}
                          </p>
                        </div>

                        {/* Experience */}
                        {application.experience && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2 text-gray-900">
                              Experience:
                            </h4>
                            <p className="text-sm text-gray-700 bg-blue-50 p-4 rounded-xl border border-blue-100">
                              {application.experience}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Delete Button */}
                      <motion.button
                        onClick={() => setShowDeleteConfirm(application.id)}
                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 self-start"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Delete</span>
                      </motion.button>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Calendar size={14} />
                        Applied:{" "}
                        {new Date(application.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>

                      {/* Status Update Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          "PENDING",
                          "REVIEWED",
                          "INTERVIEWED",
                          "ACCEPTED",
                          "REJECTED",
                        ].map((status) => (
                          <motion.button
                            key={status}
                            onClick={() => updateStatus(application.id, status)}
                            disabled={
                              updating === application.id ||
                              application.status === status
                            }
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                              application.status === status
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md"
                            }`}
                            whileHover={
                              application.status !== status
                                ? { scale: 1.05 }
                                : {}
                            }
                            whileTap={
                              application.status !== status
                                ? { scale: 0.95 }
                                : {}
                            }
                          >
                            {updating === application.id
                              ? "Updating..."
                              : status}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-900 text-xl font-semibold mb-2">
                  No applications found
                </p>
                <p className="text-gray-500">
                  {selectedStatus === "ALL"
                    ? "No applications have been submitted yet."
                    : `No applications with status "${selectedStatus}".`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
