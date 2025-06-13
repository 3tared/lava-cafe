"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Briefcase, Star, FileText } from "lucide-react";
import JobPositionsManager from "@/components/JobPositionsManager/JobPositionsManager";
import { CompanyValuesManager } from "@/components/CompanyValuesManager/CompanyValuesManager";
import { JobApplicationsManager } from "@/components/JobApplicationsManager/JobApplicationsManager";

export default function CareersAdminPage() {
  const [activeTab, setActiveTab] = useState("positions");

  const tabs = [
    {
      id: "positions",
      label: "Job Positions",
      icon: Briefcase,
      component: JobPositionsManager,
    },
    {
      id: "values",
      label: "Company Values",
      icon: Star,
      component: CompanyValuesManager,
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      component: JobApplicationsManager,
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || JobPositionsManager;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
}
