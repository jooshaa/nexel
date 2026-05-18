import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/lib/cms/api";
import { getMediaURL } from "@/lib/cms/utils";
import { mapCMSProductToUI } from "@/lib/cms/adapters";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR revalidation every minute

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  try {
    const cmsProduct = await getProductBySlug(slug);

    if (!cmsProduct) notFound();

    const product = mapCMSProductToUI(cmsProduct);
    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error(`Product page fetch failed for slug: ${slug}`, error);
    notFound(); // Better to show 404 than a 500 error if data is missing or CMS is down
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.seoDescription || product.shortDescription,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.shortDescription || undefined,
      images: (product.images && product.images.length > 0) 
        ? [{ url: getMediaURL(product.images[0].url) }] 
        : [],
    },

  };
}
