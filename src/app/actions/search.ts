"use server";

import { searchProducts as apiSearchProducts } from "@/lib/cms/api";

export async function searchProductsAction(query: string) {
  return apiSearchProducts(query);
}
