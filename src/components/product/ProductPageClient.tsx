"use client";

import { useState } from "react";
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
      <section className="max-w-7xl mx-auto px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-widest text-gray-400 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price}
            </p>

            {/* Color selector */}
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                Color — <span className="text-gray-600">{selectedColor}</span>
              </p>
              <ColorSelector
                colors={product.colors}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
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
            className="lg:sticky lg:top-24"
          >
            <ImageGallery images={product.images} name={product.name} />
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-t border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Looking for more?
          </h2>
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            More →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product.relatedProducts.map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </section>
    </div>
  );
}
