"use client";

import { motion } from "framer-motion";
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
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-[#ff6600] mx-auto" />
        </div>

        {/* Grid - Floating Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.map((product) => (
            <Link key={product.id} href={product.link}>
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Product Image Container */}
                <div className="w-full aspect-square flex items-center justify-center mb-6 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mx-auto drop-shadow-lg"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center px-2">
                  <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#ff6600] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
