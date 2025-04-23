"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image";
import { mainlogo } from "@/constants";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      user_name: "",
      user_email: "",
      message: "",
    };

    // Name validation
    if (!formState.user_name.trim()) {
      newErrors.user_name = "Name is required";
      isValid = false;
    } else if (formState.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formState.user_email.trim()) {
      newErrors.user_email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formState.user_email)) {
      newErrors.user_email = "Please enter a valid email address";
      isValid = false;
    }

    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    if (!formRef.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          console.log("✅ Email sent successfully");
          setSubmitted(true);
          setFormState({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          console.error("❌ Email sending failed:", error);
          setError("Failed to send message. Please try again later.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="w-full max-w-lg mx-auto mt-12"
    >
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg relative overflow-hidden border border-gray-100"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-500">
            Get in Touch
          </h2>
          {/* <div className="h-1 w-16 bg-blue-600 rounded-full"></div> */}
          <Image src={mainlogo.src} alt={mainlogo.alt} width={80} height={80} />
        </motion.div>

        {submitted && (
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p>Your message has been sent successfully!</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          <motion.div variants={itemVariants} className="relative space-y-2">
            <label
              htmlFor="user_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <motion.input
              whileFocus="focused"
              initial="unfocused"
              animate="unfocused"
              variants={inputVariants}
              type="text"
              id="user_name"
              name="user_name"
              value={formState.user_name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formErrors.user_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.user_name && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.user_name}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="relative space-y-2">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <motion.input
              whileFocus="focused"
              initial="unfocused"
              animate="unfocused"
              variants={inputVariants}
              type="email"
              id="user_email"
              name="user_email"
              value={formState.user_email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                formErrors.user_email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.user_email && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.user_email}
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="relative space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <motion.textarea
              whileFocus="focused"
              initial="unfocused"
              animate="unfocused"
              variants={inputVariants}
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-36 resize-none ${
                formErrors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-lavasecondary-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-lavasecondary-600focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>Send Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.form>
    </motion.div>
  );
}
