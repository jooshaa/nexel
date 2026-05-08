import { Product as CMSProduct } from './types';
import { ProductData as UIProductData, RelatedProduct as UIRelatedProduct } from '../productData';
import { getMediaURL } from './api';


/**
 * Maps CMS Product to the UI-specific ProductData structure.
 * Robust implementation with defensive checks for production stability.
 */
export function mapCMSProductToUI(product: CMSProduct): UIProductData {
  if (!product) {
    throw new Error('mapCMSProductToUI: product is required');
  }

  return {
    id: product.documentId || String(product.id),
    name: product.title || 'Untitled Product',
    subtitle: product.subtitle || '',
    price: product.price || 0,
    // Safely map images, fallback to placeholder array
    images: (Array.isArray(product.images) && product.images.length > 0)
      ? product.images.map(img => getMediaURL(img.url)).filter(Boolean) 
      : ['/placeholder.png'],


    // Safely map colors
    colors: Array.isArray(product.colors)
      ? product.colors.map(color => ({
          name: color.name || 'Default',
          hex: color.hex || '#000000'
        }))
      : [],
    description: product.shortDescription || product.description || '',
    // Map specifications to details array
    details: Array.isArray(product.specifications)
      ? product.specifications.map(spec => `${spec.label}: ${spec.value}`)
      : [],
    // Stable defaults for production
    paymentOptions: ['Pay in full', '0% APR Installments'],
    shipping: ['Free standard shipping', '30-day returns'],
    // Safely map related products from category
    relatedProducts: product.category?.products
      ? product.category.products
          .filter(p => p.documentId !== product.documentId)
          .slice(0, 4)
          .map(mapCMSProductToRelated)
      : []
  };
}

/**
 * Maps CMS Product to a simplified RelatedProduct structure.
 * Handles missing images and titles gracefully.
 */
export function mapCMSProductToRelated(product: CMSProduct): UIRelatedProduct {
  return {
    id: product.slug || String(product.id),
    name: product.title || 'Related Product',
    price: product.price || 0,
    image: (Array.isArray(product.images) && product.images[0]?.url) 
      ? getMediaURL(product.images[0].url) 
      : '/placeholder.png'
  };
}

