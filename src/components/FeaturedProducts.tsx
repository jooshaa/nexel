"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "straightener",
    title: "Nexel Air Straight",
    subtitle: "Smooth styling with intelligent heat",
    image: "/prd/hair-straightener.png",
  },
  {
    id: "purifier",
    title: "Nexel Pure Loop",
    subtitle: "Clean air in a quiet form",
    image: "/prd/air-purifier.png",
  },
  {
    id: "fan",
    title: "Nexel Air Flow",
    subtitle: "Focused cooling for every room",
    image: "/prd/bladeless-fan.png",
  },
  {
    id: "stick-vacuum",
    title: "Nexel Slim Vacuum",
    subtitle: "Lightweight cleaning power",
    image: "/prd/stick-vacuum.png",
  },
  {
    id: "canister-vacuum",
    title: "Nexel Orbit Vacuum",
    subtitle: "Deep cleaning with flexible reach",
    image: "/prd/canister-vacuum.png",
  },
];

export function FeaturedProducts() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={360}
                height={240}
                className="mx-auto h-[200px] w-full object-contain"
              />
              <h3 className="mt-7 text-2xl font-bold leading-tight text-[#000]">
                {product.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#777]">
                {product.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
