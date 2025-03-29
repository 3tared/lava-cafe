"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

const MotionCard = motion(Card);
const MotionImage = motion(Image);

const CardComponent = ({ data }: ICardProps) => {
  const { title, description, image, icon, buttonText, href } = data;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-opacity-10 rounded-lg w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "#b20084" }}
    >
      <CardHeader className="flex flex-col flex-grow">
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

      <CardFooter className="mt-auto">
        <div className="flex items-center justify-between w-full">
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
                  animate={{ x: [0, 4, 0] }}
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
