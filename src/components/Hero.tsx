"use client";

import { HeroSlider, Slide } from "./HeroSlider";
import { HeroSlide as CMSHeroSlide } from "@/lib/cms/types";
import { getMediaURL } from "@/lib/cms/api";

interface HeroProps {
  slides: CMSHeroSlide[];
}

export function Hero({ slides }: HeroProps) {
  // Map CMS HeroSlides to the UI's Slide format with robust null safety
  const mappedSlides: Slide[] = (slides || [])
    .filter(slide => slide && slide.image?.url) // Only show slides with images
    .map((slide) => ({
      id: slide.id,
      title: slide.title || "Nexel Premium",
      subtitle: slide.subtitle || "",
      description: slide.description || "", 
      image: getMediaURL(slide.image.url),
      link: slide.buttonLink || "/",
    }));


  // Fallback if no slides are provided or active
  if (mappedSlides.length === 0) return null;

  return <HeroSlider slides={mappedSlides} autoplayInterval={5000} />;
}
