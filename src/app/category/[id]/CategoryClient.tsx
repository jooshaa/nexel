"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
}

interface CategoryClientProps {
  name: string;
  products: Product[];
}

export function CategoryClient({ name, products }: CategoryClientProps) {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{name}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          {name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#f7f7f7] rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] hover:bg-white transition-all duration-500 flex flex-col items-center p-5 sm:p-8 lg:p-12 min-h-[360px] sm:min-h-[460px] lg:min-h-[550px] border border-transparent hover:border-gray-100 hover:shadow-xl lg:hover:shadow-2xl"
            >
              <div className="text-center w-full mb-5 sm:mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500">
                  {product.name}
                </h3>
                
                <div className="h-10">
                  <Link 
                    href={`/product/${product.id}`}
                    className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 px-6 sm:px-10 py-2.5 bg-gray-900 text-white rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] hover:bg-black transition-all duration-300 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 inline-block"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              <div className="w-full flex-1 flex items-center justify-center overflow-hidden relative">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 sm:p-4 mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
