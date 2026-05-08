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
  bgColor?: string;
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: {
    opacity: 0,
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
    <section className="w-full">
      <div 
        className="relative w-full h-[60vh] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* IMAGE LAYER - FULL BLEED COVER */}
            <motion.div 
              variants={imageVariants}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
              />
            </motion.div>

            {/* DARK CINEMATIC OVERLAYS - LEFT ANCHORED */}
            <div className="absolute inset-0 z-[15] bg-gradient-to-r from-black/75 via-black/30 to-transparent pointer-events-none" />

            {/* CONTENT LAYER - FLOATING OVER MEDIA */}
            <div className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 z-20 w-full max-w-[480px] text-center md:text-left px-6 md:px-0">
              <motion.div
                variants={textContainerVariants}
                className="flex flex-col items-center md:items-start"
              >
                <motion.p
                  variants={textItemVariants}
                  className="text-[#ff6600] text-xs font-bold tracking-[0.3em] uppercase mb-4"
                >
                  {currentSlide.subtitle}
                </motion.p>

                <motion.h1
                  variants={textItemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.05] mb-5"
                >
                  {currentSlide.title}
                </motion.h1>

                {currentSlide.description && (
                  <motion.p
                    variants={textItemVariants}
                    className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-[400px]"
                  >
                    {currentSlide.description}
                  </motion.p>
                )}

                <motion.div variants={textItemVariants}>
                  <Link href={currentSlide.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold hover:bg-white/90 transition-all"
                    >
                      Discover more
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* COMPACT CONTROLS - CENTERED XIAOMI STYLE */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
          {/* Pagination Bars */}
          <div className="flex items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-[2px] transition-all duration-700 ${index === currentIndex
                  ? "w-10 bg-white"
                  : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110 text-white/40 hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110 text-white/40 hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
