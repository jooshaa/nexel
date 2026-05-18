export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';

export function getMediaURL(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  
  // Ensure we don't have double slashes if url starts with /
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${CMS_URL}${cleanUrl}`;
}
