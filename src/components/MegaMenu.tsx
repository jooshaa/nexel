"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_DATA } from "@/lib/menuData";
import Link from "next/link";
import { Copy, LayoutGrid } from "lucide-react";

interface MegaMenuProps {
  activeCategory: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ activeCategory, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [prevCategory, setPrevCategory] = useState<string | null>(null);

  if (activeCategory !== prevCategory) {
    setPrevCategory(activeCategory);
    if (activeCategory && MENU_DATA[activeCategory]) {
      const firstSub = MENU_DATA[activeCategory].subCategories[0];
      if (firstSub) {
        setActiveSubId(firstSub.id);
      }
    }
  }

  const categoryData = activeCategory ? MENU_DATA[activeCategory] : null;
  const activeSubCategory = categoryData?.subCategories.find(sub => sub.id === activeSubId) || categoryData?.subCategories[0];

  return (
    <AnimatePresence>
      {categoryData && (
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
              
              {/* Left Sidebar */}
              <div className="w-1/4 pr-8 border-r border-gray-100 flex flex-col">
                <ul className="space-y-4 mb-10">
                  {categoryData.subCategories.map((sub) => (
                    <li key={sub.id}>
                      <button
                        onMouseEnter={() => setActiveSubId(sub.id)}
                        className={`text-base md:text-lg font-medium transition-colors w-full text-left flex items-center justify-between ${
                          activeSubId === sub.id 
                            ? "text-[#043927] font-bold" 
                            : "text-gray-800 hover:text-[#043927]"
                        }`}
                      >
                        {sub.name}
                        {activeSubId === sub.id && (
                          <span className="text-[#043927]">›</span>
                        )}
                      </button>
                    </li>
                  ))}
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
                      {activeSubCategory?.products && activeSubCategory.products.length > 0 ? (
                        activeSubCategory.products.map((product) => (
                          <Link 
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => onMouseLeave()}
                            className="group flex flex-col items-center p-6 bg-[#f7f7f7] rounded-3xl hover:bg-[#f0f0f0] transition-all duration-300 border border-transparent hover:border-gray-200"
                          >
                            <div className="relative w-full aspect-square mb-6 flex items-center justify-center overflow-hidden">
                              {product.isNew && (
                                <span className="absolute top-0 left-0 bg-[#043927] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-lg z-10">
                                  New
                                </span>
                              )}
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 text-center line-clamp-1">
                              {product.name}
                            </h4>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full flex items-center justify-center h-48 text-gray-400">
                          Coming soon
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
                    href={`/category/${activeSubId}`}
                    onClick={() => onMouseLeave()}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>All {activeSubCategory?.name || "Series"}</span>
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
