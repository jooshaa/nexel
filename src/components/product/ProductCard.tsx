"use client";

import Image from "next/image";
import Link from "next/link";
import { RelatedProduct } from "@/lib/productData";

interface ProductCardProps {
  product: RelatedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-[#f2f2f2] rounded-2xl overflow-hidden aspect-square relative transition-all duration-300 group-hover:shadow-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 sm:mt-3 px-1">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-widest text-gray-400 line-clamp-2 min-h-[2.2rem] sm:min-h-0">
          {product.name}
        </p>
        <p className="text-xs sm:text-sm font-medium text-gray-900 mt-0.5">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
