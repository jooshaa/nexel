"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product as CMSProduct } from "@/lib/cms/types";
import { getMediaURL } from "@/lib/cms/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface FeaturedProductsProps {
  title: string;
  products: CMSProduct[];
}

export function FeaturedProducts({ title, products }: FeaturedProductsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("Featured");
  const validProducts = (products || []).filter(p => {
    if (!p) return false;
    const images = p.images;
    if (Array.isArray(images)) return images[0]?.url;
    return (images as any)?.url;
  });
  
  if (validProducts.length === 0) return null;

  const tabs = ["Featured", "Trending", "New Arrivals"];

  const tabLabels: Record<string, string> = {
    Featured: t("featured"),
    Trending: t("trending"),
    "New Arrivals": t("newArrivals"),
  };

  // Filter products based on active tab and product badge
  const filteredProducts = useMemo(() => {
    if (activeTab === "Featured") return validProducts;
    
    const matched = validProducts.filter(p => 
      p.badge?.toLowerCase().includes(activeTab.toLowerCase().split(' ')[0])
    );
    // If no products match the specific badge, fallback to showing all valid products
    return matched.length > 0 ? matched : validProducts;
  }, [validProducts, activeTab]);

  const featured = filteredProducts[0];
  const smallCards = filteredProducts.slice(1, 5);
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12 lg:px-16">

        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-3">
            {title}
          </h2>
          <div className="w-16 h-[2px] bg-black mx-auto" />
        </div>

        <div className="mb-10 sm:mb-12 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3">
          {tabs.map((tab) => (
            <button key={tab} type="button"
              onClick={() => setActiveTab(tab)}
              className={["text-xs sm:text-sm md:text-[15px] font-semibold transition-all duration-300",
                activeTab === tab ? "text-black" : "text-gray-400 hover:text-black"].join(" ")}
            >
              <span className="relative inline-block pb-2">
                {tabLabels[tab]}
                {activeTab === tab && (
                  <motion.span 
                    layoutId="activeTabIndicator"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-black" 
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Main Featured Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
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
                    sizes="(max-width: 768px) 90vw, (max-width: 1400px) 50vw, 700px"
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-20">
                  <h3 className="text-2xl md:text-4xl font-heading font-medium tracking-tight text-black leading-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg text-gray-500 max-w-[36ch] leading-relaxed">
                    {featured.subtitle || featured.shortDescription}
                  </p>
                  <div className="mt-10 md:mt-12">
                    <span className="inline-flex items-center rounded-full bg-black px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-colors">
                      {t("discoverDetails")}
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 25vw, 350px"
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
                      {t("viewProduct")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
