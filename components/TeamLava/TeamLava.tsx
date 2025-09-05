"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Crown, Coffee } from "lucide-react";

// Define types based on the Prisma schema
interface Employee {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  imageUrl: string | null;
  funFact: string | null;
  departmentId: string | null;
}

interface Department {
  id: string;
  title: string;
  description: string | null;
  employees: Employee[];
}

interface TeamSectionProps {
  departments: Department[];
}

export default function TeamSection({ departments }: TeamSectionProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);

  // Debug logging - remove in production
  useEffect(() => {
    console.log('TeamSection - Departments received:', departments);
    console.log('TeamSection - Total departments:', departments?.length || 0);
    
    departments?.forEach((dept, index) => {
      console.log(`Department ${index + 1}:`, {
        id: dept.id,
        title: dept.title,
        employeeCount: dept.employees?.length || 0,
        employees: dept.employees
      });
    });
  }, [departments]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const isLeadership = (position: string): boolean => {
    const leadershipTitles = [
      "owner",
      "founder",
      "manager",
      "director",
      "head",
    ];
    return leadershipTitles.some((title) =>
      position.toLowerCase().includes(title)
    );
  };

  // Early return with debug info if no departments
  if (!departments || departments.length === 0) {
    return (
      <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-500 mb-6">
              Our Team
            </h2>
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md">
              <p className="text-yellow-800">
                {departments === undefined 
                  ? "Loading team data..." 
                  : "No departments found. Check your data fetching."}
              </p>
              <button 
                onClick={() => setDebugMode(!debugMode)}
                className="mt-2 text-sm text-blue-600 underline"
              >
                Toggle Debug Info
              </button>
              {debugMode && (
                <div className="mt-2 text-left text-xs bg-gray-100 p-2 rounded">
                  <pre>departments: {JSON.stringify(departments, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-500 mb-6">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate people who make our café special every day.
          </p>
          
          {/* Debug toggle - remove in production */}
          {process.env.NODE_ENV !== 'production' && (
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              Toggle Debug Info ({departments.length} departments)
            </button>
          )}
        </motion.div>

        {/* Debug info panel */}
        {debugMode && (
          <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left text-sm">
            <h4 className="font-bold mb-2">Debug Information:</h4>
            <p>Departments count: {departments.length}</p>
            {departments.map((dept, index) => (
              <div key={dept.id} className="mb-2">
                <p>• {dept.title}: {dept.employees?.length || 0} employees</p>
              </div>
            ))}
          </div>
        )}

        {departments.map((department) => (
          <motion.div
            key={department.id}
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div className="mb-10" variants={itemVariants}>
              <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-500 mb-3">
                {department.title}
              </h3>
              <div className="w-1/2 mx-auto h-1 bg-lavasecondary-500 mb-4"></div>
              <p className="text-lg text-gray-600">
                {department.description || ""}
              </p>
              
              {/* Show employee count */}
              <p className="text-sm text-gray-500 mt-2">
                {department.employees?.length || 0} team member(s)
              </p>
            </motion.div>

            {/* Check if department has employees */}
            {!department.employees || department.employees.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No team members in this department yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {department.employees.map((employee) => {
                  const isLeader = isLeadership(employee.position);
                  const isOwner =
                    employee.position.toLowerCase().includes("owner") ||
                    employee.position.toLowerCase().includes("founder");

                  return (
                    <motion.div
                      key={employee.id}
                      className={`overflow-hidden relative group ${
                        isLeader ? "z-10" : ""
                      }`}
                      variants={itemVariants}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                      onHoverStart={() => setHoveredMember(employee.id)}
                      onHoverEnd={() => setHoveredMember(null)}
                    >
                      {/* Card Container */}
                      <div
                        className={`
                          h-full rounded-xl overflow-hidden
                          ${
                            isOwner
                              ? "ring-4 ring-amber-400 shadow-xl"
                              : isLeader
                                ? "ring-2 ring-indigo-400 shadow-lg"
                                : "shadow-md"
                          }
                        `}
                      >
                        {/* Image Section */}
                        <div className="aspect-[4/5] relative overflow-hidden">
                          {employee.imageUrl ? (
                            <motion.div
                              className="w-full h-full bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${employee.imageUrl})`,
                              }}
                              initial={{ scale: 1 }}
                              animate={{
                                scale: hoveredMember === employee.id ? 1.07 : 1,
                              }}
                              transition={{ duration: 0.4 }}
                            />
                          ) : (
                            <div
                              className={`w-full h-full flex items-center justify-center
                                ${
                                  isOwner
                                    ? "bg-amber-50"
                                    : isLeader
                                      ? "bg-indigo-50"
                                      : "bg-gray-100"
                                }
                              `}
                            >
                              <User
                                size={64}
                                className={`
                                  ${
                                    isOwner
                                      ? "text-amber-400"
                                      : isLeader
                                        ? "text-indigo-400"
                                        : "text-gray-400"
                                  }
                                `}
                              />
                            </div>
                          )}

                          {/* Leadership Indicator */}
                          {isLeader && (
                            <div className="absolute top-3 right-3">
                              <motion.div
                                className={`rounded-full p-2 shadow-lg
                                  ${isOwner ? "bg-amber-500" : "bg-indigo-500"}
                                `}
                                initial={{ scale: 0.9 }}
                                animate={{
                                  scale: [0.9, 1, 0.9],
                                  rotate: isOwner ? [0, 5, -5, 0] : 0,
                                }}
                                transition={{
                                  scale: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  },
                                  rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                  },
                                }}
                              >
                                {isOwner ? (
                                  <Crown size={18} className="text-white" />
                                ) : (
                                  <Coffee size={18} className="text-white" />
                                )}
                              </motion.div>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div
                          className={`p-4 text-center h-full
                          ${
                            isOwner
                              ? "bg-gradient-to-br from-amber-500 to-amber-700 text-white"
                              : isLeader
                                ? "bg-gradient-to-br from-indigo-500 to-indigo-700 text-white"
                                : "bg-gray-200"
                          }
                        `}
                        >
                          <motion.h4
                            className="text-lg font-bold mb-1"
                            initial={{ opacity: 1 }}
                            whileHover={{ scale: 1.03 }}
                          >
                            {employee.name}
                          </motion.h4>

                          <p
                            className={`font-medium text-sm
                            ${
                              isOwner
                                ? "text-amber-200"
                                : isLeader
                                  ? "text-indigo-200"
                                  : "text-indigo-600"
                            }
                          `}
                          >
                            {employee.position}
                          </p>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none
                          ${
                            isOwner
                              ? "bg-amber-500"
                              : isLeader
                                ? "bg-indigo-500"
                                : "bg-gray-400"
                          }
                        `}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredMember === employee.id ? 0.15 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}