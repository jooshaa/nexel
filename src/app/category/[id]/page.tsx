"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MENU_DATA } from "@/lib/menuData";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);

  // Find the subcategory in MENU_DATA
  let subCategory = null;
  let mainCategoryName = "";

  for (const mainCat of Object.values(MENU_DATA)) {
    const found = mainCat.subCategories.find(sub => sub.id === id);
    if (found) {
      subCategory = found;
      mainCategoryName = mainCat.name;
      break;
    }
  }

  if (!subCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{subCategory.name}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          {subCategory.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {subCategory.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#f7f7f7] rounded-[48px] hover:bg-white transition-all duration-500 flex flex-col items-center p-12 min-h-[550px] border border-transparent hover:border-gray-100 hover:shadow-2xl"
            >
              <div className="text-center w-full mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:scale-105 transition-transform duration-500">
                  {product.name}
                </h3>
                
                <div className="h-10">
                  <Link 
                    href={`/product/${product.id}`}
                    className="opacity-0 group-hover:opacity-100 px-10 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 inline-block"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              <div className="w-full flex-1 flex items-center justify-center overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
