"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product as CMSProduct } from "@/lib/cms/types";
import { getMediaURL } from "@/lib/cms/api";

interface FeaturedProductsProps {
  title: string;
  products: CMSProduct[];
}

export function FeaturedProducts({ title, products }: FeaturedProductsProps) {
  const validProducts = (products || []).filter(p => {
    if (!p) return false;
    const images = p.images;
    if (Array.isArray(images)) return images[0]?.url;
    return (images as any)?.url;
  });
  
  if (validProducts.length === 0) return null;

  const featured = validProducts[0];
  const smallCards = validProducts.slice(1, 5);
  
  const tabs = ["Trending Now", "New Arrivals", "Best Sellers", "Coming Soon"];

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">

        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-3">
            {title}
          </h2>
          <div className="w-16 h-1 bg-[#ff6600] mx-auto" />
        </div>

        <div className="mb-10 sm:mb-12 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3">
          {tabs.map((tab, idx) => (
            <button key={tab} type="button"
              className={["text-xs sm:text-sm md:text-[15px] font-semibold transition-colors",
                idx === 0 ? "text-[#ff6600]" : "text-gray-900 hover:text-[#ff6600]"].join(" ")}
            >
              <span className="relative inline-block pb-2">
                {tab}
                {idx === 0 && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#ff6600]" />}
              </span>
            </button>
          ))}
        </div>

        {/* Main Featured Banner */}
        {featured && (
          <Link href={`/product/${featured.slug}`}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="group w-full cursor-pointer rounded-2xl bg-[#f0f0f0] overflow-hidden mb-4 border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="relative min-h-[288px] md:min-h-[396px] flex items-center justify-center p-12">
                  <Image
                    src={getMediaURL(Array.isArray(featured.images) ? featured.images[0]?.url : (featured.images as any)?.url) || ''}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-20">
                  <h3 className="text-3xl md:text-5xl font-heading font-medium tracking-tight text-black leading-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg text-gray-500 max-w-[36ch] leading-relaxed">
                    {featured.subtitle || featured.shortDescription}
                  </p>
                  <div className="mt-10 md:mt-12">
                    <span className="inline-flex items-center rounded-full bg-black px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-colors">
                      Discover details
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smallCards.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group rounded-2xl bg-[#f0f0f0] border border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
              >
                {/* Image zone */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={getMediaURL(Array.isArray(product.images) ? product.images[0]?.url : (product.images as any)?.url) || ''}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Text zone — inside card */}
                <div className="px-6 pb-6 pt-2 flex flex-col items-center text-center">
                  <h3 className="text-sm font-heading font-medium text-black leading-snug mt-3">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {product.subtitle || product.shortDescription}
                  </p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5">
                      View Product
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
