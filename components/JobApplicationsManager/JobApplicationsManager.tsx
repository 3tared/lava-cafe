"use client";
import React, { useState, useRef, ChangeEvent, FormEvent, JSX } from "react";
import { motion } from "framer-motion";
import {
  useJobPositions,
  useCompanyValues,
  useJobApplications,
} from "@/hooks/useCareers";
import { JobPosition } from "@/types";
import Image from "next/image";

interface FormData {
  name: string;
  age: string;
  address: string;
  phone: string;
  positionId: string;
  email: string;
  experience: string;
  pictureUrl: string;
}

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
  visible: { y: 0, opacity: 1 },
};

export default function JobApplicationsManager(): JSX.Element {
  const { positions, loading: positionsLoading } = useJobPositions();
  const { values, loading: valuesLoading } = useCompanyValues();
  const { submitApplication } = useJobApplications();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    address: "",
    phone: "",
    positionId: "",
    email: "",
    experience: "",
    pictureUrl: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(
    null
  );

  // Picture upload states
  const [uploadingPicture, setUploadingPicture] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "positionId") {
      const position = positions.find((pos) => pos.id === value);
      setSelectedPosition(position || null);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File too large. Maximum size is 5MB.");
        return;
      }

      setSelectedFile(file);
      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPicture = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploadingPicture(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploadingPicture(false);
    }
  };

  const removeFile = (): void => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormData((prev) => ({ ...prev, pictureUrl: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let pictureUrl = formData.pictureUrl;

      // Upload picture if selected
      if (selectedFile) {
        pictureUrl = (await uploadPicture()) || "";
      }

      // Submit form with picture URL
      const applicationData = {
        ...formData,
        pictureUrl,
      };

      await submitApplication(applicationData);
      setSubmitted(true);
      setFormData({
        name: "",
        age: "",
        address: "",
        phone: "",
        positionId: "",
        email: "",
        experience: "",
        pictureUrl: "",
      });
      setSelectedPosition(null);
      setSelectedFile(null);
      setPreviewUrl("");

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (positionsLoading || valuesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading careers page...</div>
      </div>
    );
  }

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
          src="https://j8v6vnsfxb.ufs.sh/f/KWERu0J43fSU0RU4Afo4U2YJovA1HwaP8C7qNF3Qx6VXcdZm"
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
          {values.map((value) => (
            <motion.div
              key={value.id}
              className="p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow bg-lavasecondary-500 text-white"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h3 className="text-lg font-semibold mb-2">{value.value}</h3>
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
            Open Positions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((job) => (
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
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
                  className="w-full resize-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="positionId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position *
                </label>
                <select
                  id="positionId"
                  name="positionId"
                  value={formData.positionId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
                >
                  <option value="">Select a position</option>
                  {positions.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Picture Upload Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-lavasecondary-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-full"
                          width={128}
                          height={128}
                        />
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-lavasecondary-600 hover:text-lavasecondary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-lavasecondary-500">
                        <span>
                          {previewUrl ? "Change picture" : "Upload a picture"}
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileSelect}
                          required={!previewUrl}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
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
                  className="w-full resize-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavasecondary-500 focus:border-lavasecondary-500"
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
                      {selectedPosition.requirements.map(
                        (req: string, idx: number) => (
                          <li key={idx}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={submitting || uploadingPicture}
                className="w-full bg-lavasecondary-500 hover:bg-lavasecondary-600 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-lavasecondary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                whileHover={{
                  scale: submitting || uploadingPicture ? 1 : 1.02,
                }}
                whileTap={{ scale: submitting || uploadingPicture ? 1 : 0.98 }}
              >
                {submitting
                  ? "Submitting..."
                  : uploadingPicture
                    ? "Uploading picture..."
                    : "Submit Application"}
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.section>
    </div>
  );
}
