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
import { cookies } from 'next/headers';

// ── Config ────────────────────────────────────────────────────────────────────

import { CMS_URL } from './utils';

const CMS_TOKEN = process.env.CMS_API_TOKEN; 

// ── Base fetcher ─────────────────────────────────────────────────────────────

async function cmsGet<T>(
  path: string,
  params: any = {},
  revalidate: number = 60,
  locale?: string
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

  // Add query params if provided
  if (params && Object.keys(params).length > 0) {
    appendParams(url.searchParams, params);
  }

  try {
    // Attempt to get locale from cookies for server-side fetching
    let currentLocale = locale || 'ru';
    if (!locale) {
      try {
        const cookieStore = await cookies();
        const localeCookie = cookieStore.get('NEXT_LOCALE');
        if (localeCookie?.value) {
          currentLocale = localeCookie.value;
        }
      } catch (e) {
        // In case we are not in a server component context (or statically generating), silently default to 'ru'
      }
    }

    // Append locale param if not explicitly overridden in params
    if (!url.searchParams.has('locale')) {
      url.searchParams.set('locale', currentLocale);
    }

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...(CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {}),
      },
      next: { revalidate }, 
    });

    if (!res.ok) {
      // Avoid throwing on every failure to prevent infinite re-render loops in some dev environments
      console.warn(`CMS Fetch Warning: ${res.status} ${res.statusText} — ${path}`);
      return { data: [] } as any; 
    }

    return await res.json();
  } catch (error: any) {
    // Handle network errors (like ECONNREFUSED) gracefully in development
    if (error.cause?.code === 'ECONNREFUSED' || error.message?.includes('fetch failed')) {
      console.error(`\x1b[31m[CMS Error]\x1b[0m Failed to connect to Strapi at ${CMS_URL}. Is the CMS running?`);
      // Return empty data structure to prevent component crashes
      return { data: [] } as any;
    }
    
    console.error(`CMS fetch error for ${path}:`, error);
    throw error;
  }
}

// ── Hero Slides ───────────────────────────────────────────────────────────────

export async function getHeroSlides(locale?: string): Promise<HeroSlide[]> {
  const data = await cmsGet<StrapiResponse<HeroSlide[]>>(
    '/hero-slides',
    {
      'filters[active][$eq]': 'true',
      'sort': 'order:asc',
      'populate': {
        image: true,
        bgColor: true,
      },
    },
    300,
    locale
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
export async function getProductBySlug(slug: string, locale?: string): Promise<Product | null> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[slug][$eq]': slug,
      'populate': [
        'images',
        'specifications',
        'colors',
        'colors.image',
        'category',
        'category.products',
        'category.products.images'
      ],
    },
    60,
    locale
  );
  return data?.data?.[0] || null;
}

export async function getFeaturedProducts(locale?: string): Promise<Product[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[featured][$eq]': 'true',
      'populate': '*',
      'sort': 'createdAt:desc',
    },
    120,
    locale
  );
  return data.data;
}

export async function getHeroProducts(locale?: string): Promise<Product[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[heroProduct][$eq]': 'true',
      'populate': '*',
      'sort': 'createdAt:desc',
    },
    120,
    locale
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

export async function searchProducts(query: string): Promise<Product[]> {
  const data = await cmsGet<StrapiResponse<Product[]>>(
    '/products',
    {
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][shortDescription][$containsi]': query,
      'populate': ['images', 'category'],
      'pagination[pageSize]': '6',
    },
    60
  );
  return data.data;
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

export async function getCategoryBySlug(slug: string, locale?: string): Promise<Category | null> {
  const data = await cmsGet<StrapiResponse<Category[]>>(
    '/categories',
    {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
    120,
    locale
  );
  return data.data[0] ?? null;
}

// ── Featured Sections ─────────────────────────────────────────────────────────

/**
 * Fetches all active featured sections (Strapi v5 syntax)
 */
export async function getFeaturedSections(locale?: string): Promise<FeaturedSection[]> {
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
  }, 120, locale);
  
  return data?.data || [];
}


// ── Navbar Sections ───────────────────────────────────────────────────────────

export async function getNavbarSections(): Promise<NavbarSection[]> {
  const data = await cmsGet<StrapiResponse<NavbarSection[]>>(
    '/navbar-sections',
    {
      'filters[active][$eq]': 'true',
      'sort': 'order:asc',
      'populate': {
        category: {
          populate: '*'
        },
        featuredProducts: {
          populate: {
            images: true
          }
        },
        promoImage: true
      },
    },
    60 
  );
  return data.data;
}

// ── Homepage data bundle ──────────────────────────────────────────────────────

export async function getHomepageData(locale?: string) {
  const [heroSlides, featuredSections, heroProducts, featuredProducts] = await Promise.all([
    getHeroSlides(locale),
    getFeaturedSections(locale),
    getHeroProducts(locale),
    getFeaturedProducts(locale),
  ]);

  return { heroSlides, featuredSections, heroProducts, featuredProducts };
}

