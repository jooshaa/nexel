"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;      // background image (optional)
  phone: string;      // product PNG without background
  bgColor: string;    // background color
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
        className="relative w-full h-[72vh] overflow-hidden group"
        style={{ backgroundColor: currentSlide.bgColor ?? '#111111' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
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
              {currentSlide.image && (
                <Image
                  src={currentSlide.image}
                  alt="background"
                  fill
                  priority={true}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              )}
            </motion.div>

            {/* Layer 2 — Darkening Overlay */}
            <div className="absolute inset-0 z-[5] bg-black/10 pointer-events-none" />

            {/* Layer 3 — Content Layout (Balanced Proportional Split) */}

            <div className="absolute inset-0 z-10 flex flex-col md:flex-row w-full h-full pt-16 md:pt-0">
              {/* Top/Left — Text Content */}
              <div className="w-full md:w-1/2 h-[45%] md:h-full flex items-end md:items-center justify-center md:justify-end px-4 md:pr-[12%] pb-4 md:pb-0 z-20">
                <div className="max-w-full md:max-w-[80%]">
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

              {/* Bottom/Right — Product PNG */}
              <div className="w-full md:w-1/2 h-[55%] md:h-full flex items-center justify-center md:justify-start px-6 md:pl-[4%] md:pr-[3%] pb-12 md:py-[20px] z-10">
                <div className="relative w-full h-full max-w-[280px] sm:max-w-[340px] md:max-w-none">
                  {currentSlide.phone && (
                    <Image
                      src={currentSlide.phone}
                      alt={currentSlide.title}
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                    />
                  )}
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
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
