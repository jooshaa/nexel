"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductData } from "@/lib/productData";
import { ImageGallery } from "./ImageGallery";
import { ColorSelector } from "./ColorSelector";
import { Accordion } from "./Accordion";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCard } from "./ProductCard";
import { ProductNav } from "./ProductNav";

interface ProductPageClientProps {
  product: ProductData;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");

  return (
    <div className="min-h-screen bg-white">
      <ProductNav />

      {/* Main section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-start">

          {/* LEFT — Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 flex flex-col gap-5 sm:gap-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-gray-900 leading-[0.95] tracking-tight max-w-[12ch]">
                {product.name}
              </h1>
              <p className="mt-2 text-[11px] sm:text-sm uppercase tracking-[0.28em] text-gray-400 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              ${product.price}
            </p>

            {/* Color selector */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gray-400 font-medium">
                Color — <span className="text-gray-600">{selectedColor}</span>
              </p>
              <ColorSelector
                colors={product.colors}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-gray-500 leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Add to Bag */}
            <AddToCartButton name={product.name} />

            {/* Accordions */}
            <div className="mt-2">
              <Accordion title="Details" items={product.details} />
              <Accordion title="Payment Options" items={product.paymentOptions} />
              <Accordion title="Shipping" items={product.shipping} />
              <div className="border-t border-gray-200" />
            </div>
          </motion.div>

          {/* RIGHT — Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2 lg:sticky lg:top-24"
          >
            <ImageGallery images={product.images} name={product.name} />
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-gray-100">
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
            Looking for more?
          </h2>
          <Link
            href="/"
            className="shrink-0 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            More →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {product.relatedProducts.map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </section>
    </div>
  );
}
