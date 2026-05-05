"use client";

import { ProductGrid, Product } from "./ProductGrid";

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "REDMI Note 15 Pro+ 5G",
    subtitle: "It's titan tough",
    image: "/product1.png",
    link: "/product/1",
  },
  {
    id: 2,
    title: "REDMI Buds 8 Pro",
    subtitle: "Your beat, pro tuned",
    image: "/product2.png",
    link: "/product/2",
  },
  {
    id: 3,
    title: "Xiaomi Robot Vacuum 5 Pro",
    subtitle: "Cleaning has never been so smart",
    image: "/product3.png",
    link: "/product/3",
  },
  {
    id: 4,
    title: "Xiaomi TV S Pro Mini LED 75 2026",
    subtitle: "Quantum detail, stunning visuals",
    image: "/product4.png",
    link: "/product/4",
  },
  {
    id: 5,
    title: "Xiaomi Air Purifier 4 Pro",
    subtitle: "Breathe clean, live healthy",
    image: "/product5.png",
    link: "/product/5",
  },
];

export function ProductGridSection() {
  return (
    <ProductGrid
      products={PRODUCTS}
      tabs={[
        "Xiaomi Fan Festival",
        "Smart on the Go",
        "Smart Tech Appliances",
        "Lifestyle Companions",
      ]}
    />
  );
}
