"use client";

import { HeroSlider, Slide } from "./HeroSlider";
import { HeroSlide as CMSHeroSlide } from "@/lib/cms/types";
import { getMediaURL } from "@/lib/cms/utils";

interface HeroProps {
  slides: CMSHeroSlide[];
}

export function Hero({ slides }: HeroProps) {
  // Map CMS HeroSlides to the UI's Slide format with robust null safety
  const mappedSlides: Slide[] = (slides || [])
    .filter(slide => slide && (slide.bgColor?.url || slide.image?.url)) // Show slides with background or product image
    .map((slide) => ({
      id: slide.id,
      title: slide.title || "Nexel Premium",
      subtitle: slide.subtitle || "",
      description: slide.description || "", 
      image: slide.bgColor?.url ? getMediaURL(slide.bgColor.url) : (slide.image?.url ? getMediaURL(slide.image.url) : ""),
      bgColor: "#111111", // Default background color if needed
      link: slide.buttonLink || "/",
      buttonText: slide.buttonText || "Discover more",
    }));


  // Fallback if no slides are provided or active
  if (mappedSlides.length === 0) return null;

  return <HeroSlider slides={mappedSlides} autoplayInterval={5000} />;
}
