"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Star, FileText } from "lucide-react";
import JobPositionsManager from "@/components/JobPositionsManager/JobPositionsManager";
import { CompanyValuesManager } from "@/components/CompanyValuesManager/CompanyValuesManager";
import JobApplicationsManager from "@/components/JobApplicationsManager/JobApplicationsManager";

export default function CareersAdminPage() {
  const [activeTab, setActiveTab] = useState("positions");

  const tabs = [
    {
      id: "positions",
      label: "Job Positions",
      icon: Briefcase,
      component: JobPositionsManager,
      color: "blue",
    },
    {
      id: "values",
      label: "Company Values",
      icon: Star,
      component: CompanyValuesManager,
      color: "purple",
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      component: JobApplicationsManager,
      color: "green",
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || JobPositionsManager;

  const getTabStyles = (tab: (typeof tabs)[0], isActive: boolean) => {
    const colorMap = {
      blue: isActive
        ? "border-blue-500 text-blue-600 bg-blue-50/50"
        : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-200",
      purple: isActive
        ? "border-purple-500 text-purple-600 bg-purple-50/50"
        : "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-200",
      green: isActive
        ? "border-green-500 text-green-600 bg-green-50/50"
        : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-200",
    };
    return colorMap[tab.color as keyof typeof colorMap];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm rounded-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="sm:hidden">
            <div className="py-4">
              <h1 className="text-xl font-bold text-gray-900 mb-4">
                Careers Admin
              </h1>
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg border-2 transition-all duration-200 ${getTabStyles(tab, isActive)}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-medium">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Careers Administration
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage job positions, company values, and applications
                </p>
              </div>
            </div>

            <div className="flex space-x-1 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-6 border-b-3 font-medium text-sm transition-all duration-200 rounded-t-lg ${getTabStyles(tab, isActive)}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Icon size={20} />
                    <span className="hidden md:inline">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="relative z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Tab Content Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
              <ActiveComponent />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
