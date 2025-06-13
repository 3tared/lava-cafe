"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useJobApplications } from "@/hooks/useCareers";
import { Mail, Phone, MapPin, Calendar, User, Briefcase } from "lucide-react";

export function JobApplicationsManager() {
  const { applications, loading, refetch } = useJobApplications();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updating, setUpdating] = useState<string | null>(null);

  const statusOptions = [
    { value: "ALL", label: "All Applications" },
    { value: "PENDING", label: "Pending" },
    { value: "REVIEWED", label: "Reviewed" },
    { value: "INTERVIEWED", label: "Interviewed" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];

  const updateStatus = async (applicationId: string, newStatus: string) => {
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

  const filteredApplications = applications.filter(
    (app) => selectedStatus === "ALL" || app.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800";
      case "INTERVIEWED":
        return "bg-purple-100 text-purple-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading applications...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <div className="flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <motion.div
            key={application.id}
            className="bg-white border rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User size={20} />
                    {application.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a
                      href={`mailto:${application.email}`}
                      className="hover:text-blue-600"
                    >
                      {application.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <a
                      href={`tel:${application.phone}`}
                      className="hover:text-blue-600"
                    >
                      {application.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {application.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Age: {application.age}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={16} />
                    <span className="font-medium">
                      Applied for: {application.position.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 pl-6">
                    {application.position.description}
                  </p>
                </div>

                {application.experience && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Experience:</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {application.experience}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <div className="text-xs text-gray-500">
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                {[
                  "PENDING",
                  "REVIEWED",
                  "INTERVIEWED",
                  "ACCEPTED",
                  "REJECTED",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(application.id, status)}
                    disabled={
                      updating === application.id ||
                      application.status === status
                    }
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors
                      ${
                        application.status === status
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                  >
                    {updating === application.id ? "Updating..." : status}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No applications found.</p>
          <p className="text-gray-400">
            {selectedStatus === "ALL"
              ? "No applications have been submitted yet."
              : `No applications with status "${selectedStatus}".`}
          </p>
        </div>
      )}
    </div>
  );
}
