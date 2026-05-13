"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Copy, LayoutGrid } from "lucide-react";
import { NavbarSection } from "@/lib/cms/types";
import { getMediaURL } from "@/lib/cms/api";

interface MegaMenuProps {
  activeCategory: string | null;
  navbarSections: NavbarSection[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ activeCategory, navbarSections, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [prevCategory, setPrevCategory] = useState<string | null>(null);

  useEffect(() => {
    if (activeCategory !== prevCategory) {
      setPrevCategory(activeCategory);
      if (activeCategory) {
        const section = navbarSections.find(s => s.title === activeCategory);
        if (section && section.featuredProducts && section.featuredProducts.length > 0) {
          setActiveSubId(section.featuredProducts[0].id.toString());
        } else {
          setActiveSubId(null);
        }
      }
    }
  }, [activeCategory, prevCategory, navbarSections]);

  const activeSectionData = navbarSections.find(s => s.title === activeCategory);

  return (
    <AnimatePresence>
      {activeSectionData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40 overflow-hidden"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-row py-8 min-h-[400px]">
              
              {/* Left Sidebar - Simplified to just show "Featured" or category links if we had them */}
              <div className="w-1/4 pr-8 border-r border-gray-100 flex flex-col">
                <ul className="space-y-4 mb-10">
                  <li>
                    <button
                      className={`text-base md:text-lg font-medium transition-colors w-full text-left flex items-center justify-between text-[#043927] font-bold`}
                    >
                      Featured Products
                      <span className="text-[#043927]">›</span>
                    </button>
                  </li>
                  {activeSectionData.category && (
                    <li>
                      <Link
                        href={`/category/${activeSectionData.category.slug}`}
                        onClick={() => onMouseLeave()}
                        className={`text-base md:text-lg font-medium transition-colors w-full text-left flex items-center justify-between text-gray-800 hover:text-[#043927]`}
                      >
                        All {activeSectionData.category.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Right Content */}
              <div className="w-3/4 pl-8 flex flex-col">
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSubId}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                      {activeSectionData.featuredProducts && activeSectionData.featuredProducts.length > 0 ? (
                        activeSectionData.featuredProducts.map((product) => (
                          <Link 
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => onMouseLeave()}
                            className="group flex flex-col items-center p-6 bg-[#f7f7f7] rounded-3xl hover:bg-[#f0f0f0] transition-all duration-300 border border-transparent hover:border-gray-200 isolate"
                          >
                            <div className="relative w-full aspect-square mb-6 flex items-center justify-center overflow-hidden">
                              {product.badge && (
                                <span className="absolute top-0 left-0 bg-[#043927] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-lg z-10">
                                  {product.badge}
                                </span>
                              )}
                              {product.images && (
                                <Image 
                                  src={getMediaURL(Array.isArray(product.images) ? product.images[0]?.url : (product.images as any)?.url)} 
                                  alt={product.title}
                                  fill
                                  unoptimized={true}
                                  className="object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                                />
                              )}
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 text-center line-clamp-1">
                              {product.title}
                            </h4>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full flex items-center justify-center h-48 text-gray-400">
                          {activeSectionData.promoTitle || "Coming soon"}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Bottom Right Buttons */}
                <div className="flex justify-end space-x-4 pt-6 mt-4 border-t border-gray-50">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100">
                    <Copy className="w-4 h-4" />
                    <span>Accessories</span>
                  </button>
                  <Link 
                    href={activeSectionData.category ? `/category/${activeSectionData.category.slug}` : "#"}
                    onClick={() => onMouseLeave()}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>All {activeSectionData.category?.name || "Series"}</span>
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
