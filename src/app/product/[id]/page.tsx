import { notFound } from "next/navigation";
import { getProduct } from "@/lib/productData";
import { ProductPageClient } from "@/components/product/ProductPageClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  return <ProductPageClient product={product} />;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: product ? `${product.name} — Nexel` : "Product Not Found",
    description: product?.description,
  };
}
