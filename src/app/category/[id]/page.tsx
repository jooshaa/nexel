import { notFound } from "next/navigation";
import { getCategoryBySlug, getMediaURL } from "@/lib/cms/api";
import { CategoryClient } from "./CategoryClient";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60; // ISR revalidation

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryBySlug(id);

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
  const { id } = await params;

  try {
    const category = await getCategoryBySlug(id);
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

