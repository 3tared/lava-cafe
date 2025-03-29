"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  animationDuration?: number; // in seconds
}

const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  className = "",
  animationDuration = 3,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: animationDuration / 1.5,
        ease: "easeOut",
        delay: 0.2,
      }}
      className={`text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavasecondary-500 to-lavaprimary-500 md:text-4xl lg:text-5xl py-1 ${className}`}
    >
      {children}
    </motion.h1>
  );
};

export default GradientHeading;
