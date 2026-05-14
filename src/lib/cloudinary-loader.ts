// ─────────────────────────────────────────────────────────────────────────────
// Cloudinary Image Loader for Next.js
//
// This replaces the default Next.js image optimizer so that Cloudinary
// handles resizing, format conversion (→ WebP/AVIF), and CDN delivery.
//
// next.config.ts → images.loader: 'custom', images.loaderFile: './src/lib/cloudinary-loader.ts'
// ─────────────────────────────────────────────────────────────────────────────

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If src is already a Cloudinary URL (res.cloudinary.com), apply transformations
  if (src.includes('res.cloudinary.com')) {
    // Extract everything after /upload/ and inject transformation params
    const uploadIndex = src.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const base = src.slice(0, uploadIndex + 8); // includes '/upload/'
      const rest = src.slice(uploadIndex + 8);
      // Skip if transformations already applied (starts with f_, w_, q_, etc.)
      if (!rest.startsWith('f_') && !rest.startsWith('w_') && !rest.startsWith('q_')) {
        const params = `f_auto,q_${quality || 80},w_${width}/`;
        return `${base}${params}${rest}`;
      }
    }
    return src;
  }

  // For all other URLs (localhost, other domains) — return as-is
  return src;
}
