"use client"; // Enables Next.js Client Component behavior

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Importing custom Card components
import { Button } from "../ui/button"; // Importing a custom Button component
import Image, { StaticImageData } from "next/image"; // Next.js optimized Image component
import Link from "next/link"; // Next.js Link component for navigation
import { motion } from "framer-motion"; // Importing Framer Motion for animations

// Defining TypeScript interface for the expected props
interface ICardProps {
  data: {
    title: string;
    description: string;
    image: string | StaticImageData;
    icon: string | StaticImageData;
    buttonText: string;
    href: string;
  };
}

// Creating motion-enhanced versions of the Card and Image components
const MotionCard = motion(Card);
const MotionImage = motion(Image);

const CardComponent = ({ data }: ICardProps) => {
  // Destructuring properties from data prop
  const { title, description, image, icon, buttonText, href } = data;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      transition={{ duration: 0.5 }} // Animation duration
      whileHover={{
        y: -8, // Moves card slightly up on hover
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-opacity-10 rounded-lg w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "#b20084" }} // Sets background color
    >
      {/* Card Header Section */}
      <CardHeader className="flex flex-col flex-grow">
        {/* Animated Card Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <CardTitle className="text-white">{title}</CardTitle>
          </motion.div>
        </motion.div>

        {/* Animated Card Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ opacity: 0.9 }}
        >
          <CardDescription className="text-text-200 pt-3">
            {description}
          </CardDescription>
        </motion.div>
      </CardHeader>

      {/* Card Content Section with Image */}
      <CardContent className="flex-grow min-h-[250px] overflow-hidden">
        <motion.div className="w-full h-[250px] overflow-hidden rounded-lg">
          <MotionImage
            src={image}
            alt={title}
            width={500}
            height={250}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "tween", duration: 0.5 }}
          />
        </motion.div>
      </CardContent>

      {/* Card Footer Section */}
      <CardFooter className="mt-auto">
        <div className="flex items-center justify-between w-full">
          {/* Animated Icon */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={icon}
              alt={title}
              width={70}
              height={70}
              className="mr-2"
            />
          </motion.div>

          {/* Animated Button with Link */}
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Button className="bg-lavasecondary-500 hover:bg-lavasecondary-600">
              <Link
                href={`/events/${href}`}
                className="text-white capitalize flex items-center"
              >
                <span>
                  {buttonText} {href}
                </span>
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 4, 0] }} // Subtle left-right animation on arrow
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </CardFooter>
    </MotionCard>
  );
};

export default CardComponent;
