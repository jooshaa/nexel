"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface ProductGridProps {
  products: Product[];
  tabs?: string[];
}

export function ProductGrid({ products, tabs }: ProductGridProps) {
  const featured = products[0];
  const smallCards = products.slice(1, 5);

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-[#ff6600] mx-auto" />
        </div>

        {/* Tabs */}
        {tabs && tabs.length > 0 ? (
          <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3">
            {tabs.map((tab, idx) => (
              <button
                // visual-only tabs to match design
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
        ) : null}

        {/* Featured banner + 4-card row */}
        <div className="space-y-6 sm:space-y-10">
          {featured ? (
            <Link href={featured.link} className="block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group w-full rounded-2xl bg-[#f5f5f5] overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                  <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[260px]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-5 sm:p-8 transition-transform duration-500 group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center px-5 sm:px-8 py-7 sm:py-10 md:py-12">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-black">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[#666] max-w-[34ch]">
                      {featured.subtitle}
                    </p>
                    <div className="mt-5 sm:mt-6">
                      <span className="inline-flex items-center rounded-full bg-black px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white">
                        Learn more
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ) : null}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
            {smallCards.map((product) => (
              <Link key={product.id} href={product.link}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-full aspect-square flex items-center justify-center mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-2xl">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain mx-auto drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="text-center px-2">
                    <h3 className="text-sm sm:text-lg font-bold text-black mb-1 sm:mb-2 group-hover:text-[#ff6600] transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
