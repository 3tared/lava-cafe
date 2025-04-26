"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { jobPositions, companyValues } from "@/constants";
import Image from "next/image";

// Define TypeScript interfaces
interface FormData {
  name: string;
  age: string;
  address: string;
  phone: string;
  position: string;
  email: string;
  experience: string;
}

interface JobPosition {
  id: string;
  title: string;
  description: string;
  requirements: string[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function CareersPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    address: "",
    phone: "",
    position: "",
    email: "",
    experience: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(
    null
  );

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "position") {
      const position = jobPositions.find((pos) => pos.id === value);
      setSelectedPosition(position || null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // No need to assign to a variable if we don't use it
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          to_name: "Hiring Manager",
          from_email: formData.email,
          to_email: "lavaacafee@gmail.com",
          message: `
            Application Details:
            Name: ${formData.name}
            Age: ${formData.age}
            Address: ${formData.address}
            Phone: ${formData.phone}
            Position: ${formData.position}
            Experience: ${formData.experience}
          `,
        }
      );

      // Success path continues here
      setSubmitted(true);
      setFormData({
        name: "",
        age: "",
        address: "",
        phone: "",
        position: "",
        email: "",
        experience: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Failed to send application. Please try again later.");
      console.error("Email send error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-7 md:mt-12 lg:mt-15 xl:mt-16">
      {/* Hero Section */}
      <motion.div
        className="relative h-96 overflow-hidden rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src="https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSUd0FmGpCJM4quD6CvO7aiw3sU1XbAkxI8KGhg"
          alt="Team working in restaurant"
          className="object-cover w-full h-full"
          width={500}
          height={800}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Be part of a passionate team dedicated to creating exceptional
            experiences for our guests.
          </motion.p>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.section
        className="py-16 px-4 md:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500"
          variants={itemVariants}
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyValues.map((value, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow bg-lavasecondary-500 text-white"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h3 className="text-lg font-semibold mb-2 ">{value}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section
        className="py-16 px-4 md:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500"
            variants={itemVariants}
          >
            Open Positions For Females Only
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobPositions.map((job) => (
              <motion.div
                key={job.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3 text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500"
                  >
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-lavasecondary-500">
                      Requirements:
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="mb-1">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Application Form Section */}
      <motion.section
        className="py-16 px-4 md:px-8 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div variants={itemVariants}>
            <h2
              className="text-3xl font-bold text-center mb-2 text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500"
            >
              Apply Now
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the form below to join our team
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-center font-medium">
                Thank you for your application! We will contact you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-lg shadow-md"
              variants={itemVariants}
            >
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="16"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full resize-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position *
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a position</option>
                  {jobPositions.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your previous experience..."
                ></textarea>
              </div>

              {selectedPosition && (
                <motion.div
                  className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-medium text-blue-800 mb-2">
                    Position Details: {selectedPosition.title}
                  </h4>
                  <p className="text-sm text-blue-600 mb-2">
                    {selectedPosition.description}
                  </p>
                  <div>
                    <h5 className="text-sm font-medium text-blue-800 mb-1">
                      Requirements:
                    </h5>
                    <ul className="list-disc pl-5 text-xs text-blue-600">
                      {selectedPosition.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full bg-lavasecondary-500 hover:bg-lavasecondary-600 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.section>
    </div>
  );
}
