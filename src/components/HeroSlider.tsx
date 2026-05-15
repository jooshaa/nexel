"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;         // full-width desktop background image
  mobileImage?: string;  // optional mobile-optimised crop
  bgColor: string;       // background color (fallback)
  link: string;
  buttonText?: string;
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
  const touchStartX = useRef<number | null>(null);

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
    <section className="w-full mt-[55px]">
      <div 
        className="relative w-full h-[100svh] md:h-[72vh] overflow-hidden group"
        style={{ backgroundColor: currentSlide.bgColor ?? '#111111' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) {
            delta > 0 ? nextSlide() : prevSlide();
          }
          touchStartX.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Layer 1 — Background Image */}
            <motion.div
              className="absolute inset-0 z-0 w-full h-full"
            >
              {/* Mobile image */}
              {(currentSlide.mobileImage || currentSlide.image) && (
                <Image
                  src={currentSlide.mobileImage || currentSlide.image}
                  alt="background"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 200vw, 100vw"
                  className="object-cover object-right-top md:hidden"
                />
              )}
              {/* Desktop image */}
              {currentSlide.image && (
                <Image
                  src={currentSlide.image}
                  alt="background"
                  fill
                  priority={true}
                  sizes="100vw"
                  className="hidden md:block object-cover object-right-bottom"
                />
              )}
            </motion.div>

            {/* Layer 2 — Gradient overlays */}
            {/* Mobile: strong top gradient so text at top is readable */}
            <div className="absolute inset-0 z-[5] md:hidden bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />
            {/* Desktop: subtle darkening only */}
            <div className="absolute inset-0 z-[5] hidden md:block bg-black/10 pointer-events-none" />

            {/* Layer 3 — Content Layout */}
            {/* Mobile: text pinned to top. Desktop: centered left */}
            <div className="absolute inset-0 z-10 flex flex-col justify-start md:justify-center w-full h-full pt-8 md:pt-0 pb-0 md:pb-0 px-6 md:px-[10%]">
              {/* Text Content */}
              <div className="w-full max-w-2xl z-20">
                <div>
                  <motion.div
                    variants={textContainerVariants}
                    className="flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <motion.p
                      variants={textItemVariants}
                      className="text-white/80 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2 md:mb-4"
                    >
                      {currentSlide.subtitle}
                    </motion.p>

                    <motion.h1
                      variants={textItemVariants}
                      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] md:leading-[1] mb-3 md:mb-6"
                    >
                      {currentSlide.title}
                    </motion.h1>

                    {currentSlide.description && (
                      <motion.p
                        variants={textItemVariants}
                        className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-10 max-w-[90%] md:max-w-[450px]"
                      >
                        {currentSlide.description}
                      </motion.p>
                    )}

                    <motion.div variants={textItemVariants}>
                      <Link href={currentSlide.link}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white text-black px-8 md:px-10 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-all shadow-lg"
                        >
                          {currentSlide.buttonText || "Learn more"}
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>




          </motion.div>
        </AnimatePresence>

        {/* SIDE NAVIGATION ARROWS (Xiaomi Style) */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* LONG HORIZONTAL BULLETS (Xiaomi Style) */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="group py-4 px-1 flex items-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div 
                className={`h-[2px] transition-all duration-700 rounded-full ${index === currentIndex
                  ? "w-20 bg-white"
                  : "w-16 bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>

  );
}
