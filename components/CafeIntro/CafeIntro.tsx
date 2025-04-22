"use client";

import React, { useState, useEffect, JSX } from "react";
import {
  HeroMainImage,
  cafeFeatures,
  aboutContent,
  contactInfo,
  workingHours,
  googleMapsUrl,
  googleMapsDirectUrl,
  ctaBanner,
  heroContent,
} from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Coffee,
  Clock,
  Award,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Loader2,
  ChevronRight,
  Calendar,
  Star,
} from "lucide-react";
import Link from "next/link";

// Enhanced icon component with additional icons and better typing
interface IconProps {
  iconName: string;
  className: string;
}

const getIconComponent = (
  iconName: IconProps["iconName"],
  className: IconProps["className"]
): JSX.Element | null => {
  const icons: Record<string, JSX.Element> = {
    Coffee: <Coffee className={className} />,
    Clock: <Clock className={className} />,
    Award: <Award className={className} />,
    MapPin: <MapPin className={className} />,
    Phone: <Phone className={className} />,
    Instagram: <Instagram className={className} />,
    Facebook: <Facebook className={className} />,
    Calendar: <Calendar className={className} />,
    Star: <Star className={className} />,
  };
  return icons[iconName] || null;
};

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CafeIntro = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollPosition, setScrollPosition] = useState(0);

  // Enhanced parallax effect with smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const heroImage = document.getElementById("hero-image");
      if (heroImage) {
        // Smoother parallax effect with easing
        heroImage.style.transform = `translateY(${position * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate if section is in view for reveal animations
  const useScrollReveal = (id: string) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [id]);

    return isVisible;
  };

  const isAboutVisible = useScrollReveal("about-section");
  const isFeaturesVisible = useScrollReveal("features-section");
  const isLocationVisible = useScrollReveal("location-section");

  return (
    <>
      {/* Enhanced Hero Section with Parallax */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl mb-12 mt-10 shadow-xl">
        <div
          id="hero-image"
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <Image
            src={HeroMainImage.src}
            alt={HeroMainImage.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-center text-white p-6 max-w-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              >
                {heroContent.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl max-w-xl mx-auto leading-relaxed"
              >
                {heroContent.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto my-12"
      >
        {/* About Us Section */}
        <div className="p-6 md:p-10 space-y-10">
          <div id="about-section" className="border-b pb-10">
            <motion.div
              initial="hidden"
              animate={isAboutVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="inline-block w-1 h-8 bg-lavasecondary-500 mr-3 rounded"></span>
                {aboutContent.title}
              </h2>

              <div className="text-lg text-gray-700 leading-relaxed space-y-5">
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                    className="prose prose-lg max-w-none"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features Grid with Enhanced Animation */}
          <motion.div
            id="features-section"
            initial="hidden"
            animate={isFeaturesVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {cafeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-white p-3 rounded-full inline-block shadow-md mb-4 border border-gray-100">
                  {getIconComponent(
                    feature.icon,
                    "h-6 w-6 text-lavasecondary-500"
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Location Section with Enhanced Layout */}
          <motion.div
            id="location-section"
            initial="hidden"
            animate={isLocationVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            className="border-t pt-10 mt-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <span className="inline-block w-1 h-8 bg-lavasecondary-500 mr-3 rounded"></span>
              Find Us
            </h2>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Contact Info */}
              <motion.div
                variants={fadeInUp}
                className="md:w-1/3 space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="h-6 w-6 text-lavasecondary-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{contactInfo.address}</p>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <Phone className="h-6 w-6 text-lavasecondary-500" />
                  <p className="text-gray-700">{contactInfo.phone}</p>
                </div>

                <div className="pt-4 space-y-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-lavasecondary-500" />
                    Hours of Operation
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {workingHours.map((schedule, index) => (
                      <React.Fragment key={index}>
                        <div className="text-gray-700">{schedule.days}</div>
                        <div className="font-medium">{schedule.hours}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Follow Us
                  </h3>
                  <div className="flex items-center justify-center space-x-4">
                    {contactInfo.socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-600 hover:text-lavasecondary-500 transition-colors p-2 bg-white rounded-full shadow-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getIconComponent(social.icon, "h-5 w-5")}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map with Enhanced Loading Animation */}
              <motion.div variants={fadeInUp} className="md:w-2/3">
                <div className="relative w-full h-80 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                  <AnimatePresence>
                    {!isMapLoaded && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100"
                      >
                        <Loader2 className="h-8 w-8 text-lavasecondary-500 animate-spin mb-3" />
                        <div className="text-gray-600 font-medium">
                          Loading map...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <iframe
                    src={googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsMapLoaded(true)}
                    className={`transition-opacity duration-500 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
                  ></iframe>
                </div>

                <div className="mt-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-lavasecondary-500 text-white px-6 py-3 rounded-full hover:bg-lavasecondary-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Open in Google Maps
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced CTA Banner */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-r from-lavasecondary-600 to-lavasecondary-500 text-white p-10 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">{ctaBanner.heading}</h3>
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
            {ctaBanner.subtext}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {ctaBanner.buttons.map((button, index) => {
              const buttonClasses = `${
                button.isPrimary
                  ? "bg-white text-lavasecondary-600 hover:bg-gray-100"
                  : "bg-lavasecondary-700 hover:bg-lavasecondary-800 text-white border border-white/20"
              } px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center`;

              return button.isExternal ? (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href={button.link}
                  className={buttonClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {button.text}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={button.link} className={buttonClasses}>
                    {button.text}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default CafeIntro;
