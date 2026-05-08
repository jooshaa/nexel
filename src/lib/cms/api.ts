// ─────────────────────────────────────────────────────────────────────────────
// Nexel CMS — API fetch utilities for Next.js storefront
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Product,
  Category,
  HeroSlide,
  FeaturedSection,
  NavbarSection,
  StrapiResponse,
} from './types';

// ── Config ────────────────────────────────────────────────────────────────────

export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';

export function getMediaURL(url?: string | null) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${CMS_URL}${url}`;
}

const CMS_TOKEN = process.env.CMS_API_TOKEN; 

// ── Base fetcher ─────────────────────────────────────────────────────────────

async function cmsGet<T>(
  path: string,
  params: any = {},
  revalidate: number = 60
): Promise<T> {
  const url = new URL(`${CMS_URL}/api${path}`);
  
  // Helper to append params (handles nested objects for Strapi v5)
  const appendParams = (searchParams: URLSearchParams, data: any, prefix = '') => {
    if (data === null || data === undefined) return;
    
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.entries(data).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}[${key}]` : key;
        appendParams(searchParams, value, fullKey);
      });
    } else if (Array.isArray(data)) {
      data.forEach((value, index) => {
        const fullKey = `${prefix}[${index}]`;
        appendParams(searchParams, value, fullKey);
      });
    } else {
      searchParams.set(prefix, String(data));
    }
  };

  appendParams(url.searchParams, params);


  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {}),
    },
    next: { revalidate }, 
  });

  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText} — ${path}`);
  }

  return res.json();
}

// ── Hero Slides ───────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await cmsGet<StrapiResponse<HeroSlide[]>>(
    '/hero-slides',
    {
      'filters[active][$eq]': 'true',
      'sort': 'order:asc',
      'populate': '*',
    },
    300 
  );
  return data.data;
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(page = 1, pageSize = 24): Promise<StrapiResponse<Product[]>> {
  return cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'populate': '*',
      'sort': 'createdAt:desc',
      'pagination[page]': String(page),
      'pagination[pageSize]': String(pageSize),
    },
    60
  );
}

/**
 * Fetches a single product by slug (Strapi v5 syntax)
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
    60
  );
  return data?.data?.[0] || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[featured][$eq]': 'true',
      'populate': '*',
      'sort': 'createdAt:desc',
    },
    120
  );
  return data.data;
}

export async function getHeroProducts(): Promise<Product[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[heroProduct][$eq]': 'true',
      'populate': '*',
      'sort': 'createdAt:desc',
    },
    120
  );
  return data.data;
}

export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 24
): Promise<StrapiResponse<Product[]>> {
  return cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[category][slug][$eq]': categorySlug,
      'populate': '*',
      'sort': 'createdAt:desc',
      'pagination[page]': String(page),
      'pagination[pageSize]': String(pageSize),
    },
    60
  );
}

/**
 * Returns all product slugs (Strapi v5 syntax)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'fields': 'slug',
      'pagination[pageSize]': '200',
    },
    3600 
  );
  return data.data.map((p) => p.slug);
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const data = await cmsGet<StrapiResponse<Category[]>>(
    '/categories',
    {
      'populate': '*',
      'sort': 'order:asc',
    },
    300
  );
  return data.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await cmsGet<StrapiResponse<Category[]>>(
    '/categories',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
    120
  );
  return data.data[0] ?? null;
}

// ── Featured Sections ─────────────────────────────────────────────────────────

/**
 * Fetches all active featured sections (Strapi v5 syntax)
 */
export async function getFeaturedSections(): Promise<FeaturedSection[]> {
  const data = await cmsGet<StrapiResponse<FeaturedSection[]>>('/featured-sections', {
    'filters[active][$eq]': 'true',
    'sort': 'order:asc',
    populate: {
      products: {
        populate: {
          images: true,
          category: true,
        },
      },
    },
  }, 120);
  
  return data?.data || [];
}


// ── Navbar Sections ───────────────────────────────────────────────────────────

export async function getNavbarSections(): Promise<NavbarSection[]> {
  const data = await cmsGet<StrapiResponse<NavbarSection[]>>(
    '/navbar-sections',
    {
      'filters[active][$eq]': 'true',
      'sort': 'order:asc',
      'populate': '*',
    },
    600 
  );
  return data.data;
}

// ── Homepage data bundle ──────────────────────────────────────────────────────

export async function getHomepageData() {
  const [heroSlides, featuredSections, categories, heroProducts] = await Promise.all([
    getHeroSlides(),
    getFeaturedSections(),
    getCategories(),
    getHeroProducts(),
  ]);

  return { heroSlides, featuredSections, categories, heroProducts };
}
