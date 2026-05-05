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
  const featured = PRODUCTS[0];
  const smallCards = PRODUCTS.slice(1, 5);
  const tabs = [
    "Xiaomi Fan Festival",
    "Smart on the Go",
    "Smart Tech Appliances",
    "Lifestyle Companions",
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-3">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-[#ff6600] mx-auto" />
        </div>

        {/* Tabs (visual only) */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              type="button"
              className={[
                "text-xs sm:text-sm md:text-[15px] font-semibold transition-colors",
                idx === 0 ? "text-[#ff6600]" : "text-gray-900 hover:text-[#ff6600]",
              ].join(" ")}
            >
              <span className="relative inline-block pb-2">
                {tab}
                {idx === 0 ? (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#ff6600]" />
                ) : null}
              </span>
            </button>
          ))}
        </div>

        {/* Xiaomi-style white container on grey background */}
        <div className="rounded-2xl bg-white border border-[#ededed] p-4 sm:p-5 md:p-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Big featured banner */}
            {featured ? (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group w-full rounded-2xl bg-[#f7f7f7] overflow-hidden isolate"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                  <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[260px] bg-[#f7f7f7]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-5 sm:p-8 mix-blend-darken transition-transform duration-500 group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center px-5 sm:px-8 py-7 sm:py-10 md:py-12">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight text-black">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[#666] max-w-[34ch]">
                      {featured.subtitle}
                    </p>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-black px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* 4 items below (minimal tile styling like Xiaomi) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {smallCards.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group rounded-2xl bg-[#f7f7f7] px-3 sm:px-5 py-5 sm:py-7 md:px-6 md:py-8 flex flex-col items-center text-center cursor-pointer isolate"
                >
                  <div className="relative w-full max-w-[140px] sm:max-w-[180px] aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="180px"
                      className="object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-[15px] font-semibold text-black leading-snug">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-[#777] leading-relaxed">
                    {product.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
