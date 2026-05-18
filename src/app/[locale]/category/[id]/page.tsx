import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/cms/api";
import { getMediaURL } from "@/lib/cms/utils";
import { CategoryClient } from "./CategoryClient";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export const revalidate = 60; // ISR revalidation

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const category = await getCategoryBySlug(id, locale);

  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description: category.description || `Browse our selection of ${category.name} products.`,
    openGraph: {
      title: `${category.name} | Nexel`,
      description: category.description || `Browse our selection of ${category.name} products.`,
      images: category.image ? [{ url: getMediaURL(category.image.url) }] : [],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id, locale } = await params;

  try {
    const category = await getCategoryBySlug(id, locale);
    if (!category) {
      notFound();
    }

    const products = (category.products || []).map((product) => ({
      id: product.slug || String(product.id),
      name: product.title || "Unknown Product",
      image: product.images?.[0]?.url ? getMediaURL(product.images[0].url) : "/placeholder.png",
      isNew: product.badge === "New",
    }));

    return <CategoryClient name={category.name} products={products} />;
  } catch (error) {
    console.error("Category page fetch failed:", error);
    notFound();
  }
}

