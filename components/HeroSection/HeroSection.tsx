"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { HeroMainImage } from "@/constants";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative mx-auto mt-6 mb-10 flex max-w-7xl flex-col items-center justify-center">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-lavasecondary-600 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-lavasecondary-600  to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-lavasecondary-600  to-transparent" />
      </div>
      <div className="px-4 pt-10 md:pt-20 pb-5 md:pb-10">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-lavasecondary-500 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Experience the Perfect Brew, Every Time In Lava Cafe & Restaurant"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-text-600 dark:text-neutral-400"
        >
          Relax, unwind, and enjoy a premium coffee experience at Lava Café.
          From rich espresso to handcrafted lattes, we serve the finest blends
          in a cozy and welcoming atmosphere.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={"/about-us"}
            className="text-center w-60 transform rounded-lg bg-lavaprimary-700 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Explore More About Us
          </Link>
          <Link
            href={"/menu"}
            className="text-center w-60 transform rounded-lg border border-lavasecondary-500 bg-white px-6 py-2 font-medium text-text-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
          >
            Explore Menu
          </Link>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-10 md:mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src={HeroMainImage.src}
              alt={HeroMainImage.name}
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
