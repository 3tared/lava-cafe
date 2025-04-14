"use client"; // Enables React Server Components in Next.js to use client-side rendering.

import React, { useRef } from "react"; // Importing React and useRef for referencing DOM elements.
import { motion, useInView } from "framer-motion"; // Importing Framer Motion for animations.

// Defining the types for component props
interface GradientHeadingProps {
  children: React.ReactNode; // The text content of the heading.
  className?: string; // Optional className for custom styling.
  animationDuration?: number; // Optional duration for the animation (in seconds).
}

// Functional component definition
const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  className = "", // Default to an empty string if no className is provided.
  animationDuration = 3, // Default animation duration is 3 seconds.
}) => {
  const ref = useRef(null); // Create a reference to attach to the heading element.
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Checks if the heading is in view, runs only once.

  return (
    <motion.h1
      ref={ref} // Attach reference to the h1 element.
      initial={{ opacity: 0, y: 50, scale: 0.8 }} // Initial animation state before the element appears.
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} // Animation triggers when element enters the viewport.
      transition={{
        duration: animationDuration / 1.5, // Animation duration based on the provided prop.
        ease: "easeOut", // Smooth easing effect.
        delay: 0.2, // Small delay before animation starts.
      }}
      className={`
        text-center text-2xl font-bold text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500 
        md:text-4xl lg:text-5xl py-1 ${className}
      `} // Applying gradient text styles with responsive font sizes.
    >
      {children}
    </motion.h1>
  );
};

export default GradientHeading; // Export the component for use in other files.
