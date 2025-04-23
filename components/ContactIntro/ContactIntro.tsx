"use client";
import { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
  Heart,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { contactInfo2 } from "@/constants";

export default function ContactIntro() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredFAQ, setHoveredFAQ] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // For parallax effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const iconMap = {
    location: MapPin,
    phone: Phone,
    email: Mail,
    hours: Clock,
  };

  // Handle FAQ toggle
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-100 opacity-20"
          style={{
            transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.05}px)`,
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-yellow-100 opacity-20"
          style={{
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.03}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-green-400 opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-red-300 opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full bg-purple-300 opacity-20" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center relative">
          <span className="inline-block px-4 py-1 bg-lavaprimary-600 text-white rounded-full text-sm font-medium mb-3">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-neutral-800 tracking-tight">
            Get in <span className="text-lavasecondary-600">Touch</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Whether you have a question, suggestion, or just want to say hi —
            we&apos;re always here for you at {contactInfo2.companyName}.
          </p>

          {/* Quick action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <a
              href={`tel:${contactInfo2.details.find((d) => d.type === "phone")?.value.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 px-6 py-3 bg-lavasecondary-500 text-white rounded-lg hover:bg-lavasecondary-600 transition-colors"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <a
              href={`mailto:${contactInfo2.details.find((d) => d.type === "email")?.value}`}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail size={18} />
              <span>Email Us</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo2.details.map((detail, index) => {
              const Icon = iconMap[detail.type as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${detail.bgColor}`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600">{detail.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Map and Hours Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 rounded-xl overflow-hidden shadow-lg h-96 bg-white p-1"
          >
            <iframe
              src={contactInfo2.mapEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              className="w-full h-full border-0 rounded-lg"
              title="Google Map location of Lava Café"
            ></iframe>
          </motion.div>

          {/* Hours & special info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-4 text-neutral-800">
              Hours of Operation
            </h3>

            {contactInfo2.hours.map((day, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium text-gray-700">{day.day}</span>
                <span
                  className={`${day.isClosed ? "text-red-500" : "text-lavasecondary-600"}`}
                >
                  {day.isClosed ? "Closed" : day.hours}
                </span>
              </div>
            ))}

            {contactInfo2.specialNotes && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-lg font-medium mb-2 flex items-center gap-2 text-neutral-800">
                  <Star size={18} className="text-yellow-500" /> Special Notes
                </h4>
                <p className="text-gray-600 text-sm">
                  {contactInfo2.specialNotes}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {contactInfo2.faq.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all ${expandedFAQ === index ? "shadow-md" : ""}`}
                initial={false}
                animate={{ height: expandedFAQ === index ? "auto" : "64px" }}
                onMouseEnter={() => setHoveredFAQ(index)}
                onMouseLeave={() => setHoveredFAQ(null)}
              >
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer ${hoveredFAQ === index ? "bg-gray-50" : ""}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-medium text-neutral-800">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={20} className="text-blue-600" />
                  </motion.div>
                </div>
                <div
                  className={`px-4 pb-4 ${expandedFAQ === index ? "block" : "hidden"}`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
            Connect With Us
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Follow us on social media to stay updated with our latest offers,
            events, and delicious treats!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {contactInfo2.socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div
                  className={`p-2 rounded-full ${
                    hoveredSocial === social.name
                      ? social.name === "Facebook"
                        ? "bg-gradient-to-r from-blue-600 to-blue-400"
                        : social.hoverBg
                      : "bg-gray-100"
                  }`}
                >
                  {social.name === "Facebook" && (
                    <Facebook
                      size={20}
                      className={
                        hoveredSocial === social.name
                          ? "text-white"
                          : social.iconColor
                      }
                    />
                  )}
                  {social.name === "Instagram" && (
                    <Instagram
                      size={20}
                      className={
                        hoveredSocial === social.name
                          ? "text-white"
                          : social.iconColor
                      }
                    />
                  )}
                </div>
                <span className="font-medium text-gray-700">{social.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Visit counter or testimonial snippet */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Heart size={16} className="text-red-500" />
            <span>
              Loved by over {contactInfo2.visitorCount.toLocaleString()} happy
              customers
            </span>
          </motion.div>
        </motion.div>

        {/* Branch locations - if applicable */}
        {contactInfo2.branches && contactInfo2.branches.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-neutral-800 text-center">
              Our Locations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactInfo2.branches.map((branch, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{branch.name}</h3>
                  <p className="text-gray-600 mb-4">{branch.address}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{branch.phone}</span>
                    <a
                      href={branch.directions}
                      target="_blank"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Directions <Globe size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
