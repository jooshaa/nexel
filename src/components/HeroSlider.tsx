"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoplayInterval?: number;
}

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 80, scale: 1.1 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 1.05,
    transition: {
      duration: 0.4,
    },
  },
};

export function HeroSlider({ slides, autoplayInterval = 5000 }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoplayInterval]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[75vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 40/60 SPLIT LAYOUT */}
      <div className="flex flex-col md:flex-row h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* LEFT COLUMN - TEXT (40%) */}
        <div className="w-full md:w-[40%] flex flex-col justify-center order-2 md:order-1 py-8 md:py-0 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide.id}`}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="max-w-md"
            >
              <motion.p
                variants={textItemVariants}
                className="text-white/60 text-sm md:text-base mb-3"
              >
                {currentSlide.subtitle}
              </motion.p>

              <motion.h1
                variants={textItemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight whitespace-pre-line mb-4"
              >
                {currentSlide.title}
              </motion.h1>

              <motion.div
                variants={textItemVariants}
                className="w-12 h-[2px] bg-white/30 mb-4"
              />

              <motion.p
                variants={textItemVariants}
                className="text-white/50 text-sm md:text-base leading-relaxed whitespace-pre-line mb-6"
              >
                {currentSlide.description}
              </motion.p>

              <motion.div variants={textItemVariants}>
                <Link href={currentSlide.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Discover more
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN - IMAGE (60%) */}
        <div className="w-full md:w-[60%] flex items-center justify-center order-1 md:order-2 relative overflow-visible">
          {/* Premium glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[90%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] rounded-full blur-3xl" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide.id}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Image with scale overflow effect */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-contain scale-[1.3] translate-x-[10%] drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/20 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white/70" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/20 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white/70" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center z-20" style={{ gap: '20px' }}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-[1px] w-[100px] rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-[#ff6600]"
              : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
