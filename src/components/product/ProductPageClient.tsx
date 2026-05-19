"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductData } from "@/lib/productData";
import { ImageGallery } from "./ImageGallery";
import { ColorSelector } from "./ColorSelector";
import { Accordion } from "./Accordion";
import { AddToCartButton } from "./AddToCartButton";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductNav } from "./ProductNav";
import { useLanguage } from "@/lib/LanguageContext";

interface ProductPageClientProps {
  product: ProductData;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [openSection, setOpenSection] = useState<"details" | "payments" | "shipping" | null>(null);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash?.replace("#", "")?.toLowerCase();
      if (hash === "details" || hash === "payments" || hash === "shipping") {
        const section = hash as "details" | "payments" | "shipping";
        setOpenSection(section);
        requestAnimationFrame(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    applyHash();

    const onHashChange = () => applyHash();

    const onNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      const href = anchor?.getAttribute?.("href") ?? "";
      const section = href.replace("#", "").toLowerCase();
      if (section === "details" || section === "payments" || section === "shipping") {
        setOpenSection(section as "details" | "payments" | "shipping");
        requestAnimationFrame(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onNavClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onNavClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Main section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20">
        {/* Back Button */}
        <div className="mb-8 lg:mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("backToHome")}
          </Link>
        </div>
        
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
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-[11px] sm:text-sm uppercase tracking-[0.28em] text-gray-400 font-medium">
                  {product.subtitle}
                </p>
                {product.createdAt && (
                  <>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-mono">
                      {new Date(product.createdAt).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              ${product.price}
            </p>

            {/* Color selector */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gray-400 font-medium">
                {t("color")} — <span className="text-gray-600">{selectedColor}</span>
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
              <div id="details">
                <Accordion
                  title={t("details")}
                  items={product.details}
                  open={openSection === "details"}
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "details" : null)}
                />
              </div>

              <div id="payments">
                <Accordion
                  title={t("payments")}
                  items={product.paymentOptions}
                  open={openSection === "payments"}
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "payments" : null)}
                />
              </div>

              <div id="shipping">
                <Accordion
                  title={t("shipping")}
                  items={product.shipping}
                  open={openSection === "shipping"}
                  onOpenChange={(isOpen) => setOpenSection(isOpen ? "shipping" : null)}
                />
              </div>

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
            <ImageGallery images={product.images} name={product.name} productId={product.id} />
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-gray-100">
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
            {t("lookingForMore")}
          </h2>
          <Link
            href="/"
            className="shrink-0 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            {t("more")}
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
