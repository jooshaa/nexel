"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#f2f2f2] rounded-[24px] sm:rounded-2xl overflow-hidden group cursor-zoom-in">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 transition-transform duration-500 group-hover:scale-105"
          >
            <Image
              src={images[current]}
              alt={`${name} view ${current + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 sm:p-8"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:justify-center">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative shrink-0 overflow-hidden rounded-full border transition-all duration-300 ${
                i === current
                  ? "w-14 sm:w-16 h-14 sm:h-16 border-gray-900"
                  : "w-12 sm:w-16 h-12 sm:h-16 border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
