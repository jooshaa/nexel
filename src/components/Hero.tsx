"use client";

import { HeroSlider, Slide } from "./HeroSlider";

const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: "Powerful steam. Perfect results.",
    title: "Nexel Volta V7\nSteam Iron",
    description: "Glides effortlessly. Removes wrinkles\nwith precision and power.",
    image: "/slide1.png",
    link: "/product/i1",
  },
  {
    id: 2,
    subtitle: "Engineered for fast drying. Designed for care.",
    title: "Nexel Aura Pro\nHair Dryer",
    description: "Powerful digital motor. Intelligent heat control.\nFor shine, smoothness, and healthy hair.",
    image: "/slide2.png",
    link: "/product/d1",
  },
  {
    id: 3,
    subtitle: "Brewed to perfection",
    title: "Nexel Barista\nCoffee Experience",
    description: "Italian design. Perfected taste.\nElevate every moment.",
    image: "/slide3.png",
    link: "/product/c2",
  },
];

export function Hero() {
  return <HeroSlider slides={SLIDES} autoplayInterval={5000} />;
}
