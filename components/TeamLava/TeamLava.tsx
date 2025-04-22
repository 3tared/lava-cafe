"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Crown, Coffee } from "lucide-react";

// Define types for team data
interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  funFact?: string;
}

interface TeamSection {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
}

interface TeamDataProps {
  teamData: TeamSection[];
}

export default function TeamSection({ teamData }: TeamDataProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

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

  return (
    <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-5xl font-bold text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500 mb-6"
          >
            Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate people who make our café special every day.
          </p>
        </motion.div>

        {teamData.map((section) => (
          <motion.div
            key={section.id}
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div className="mb-10" variants={itemVariants}>
              <h3
                className="text-3xl font-semibold text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500 mb-3"
              >
                {section.title}
              </h3>
              <div className="w-1/2 mx-auto h-1 bg-lavasecondary-500 mb-4"></div>
              <p className="text-lg text-gray-600">{section.description}</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.members.map((member) => {
                const isLeader = isLeadership(member.position);
                const isOwner =
                  member.position.toLowerCase().includes("owner") ||
                  member.position.toLowerCase().includes("founder");

                return (
                  <motion.div
                    key={member.id}
                    className={`overflow-hidden relative group ${
                      isLeader ? "z-10" : ""
                    }`}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    onHoverStart={() => setHoveredMember(member.id)}
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
                        {member.imageUrl ? (
                          <motion.div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${member.imageUrl})`,
                            }}
                            initial={{ scale: 1 }}
                            animate={{
                              scale: hoveredMember === member.id ? 1.07 : 1,
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
                          {member.name}
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
                          {member.position}
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
                        opacity: hoveredMember === member.id ? 0.15 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
