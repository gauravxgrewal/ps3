// Image helper utilities
// Cloudinary-ready while keeping local public assets as a safe fallback.
//
// Usage:
//   <img src={getImageUrl(item.image)} ... />
//
// Configure Cloudinary base URL via:
//   VITE_CLOUDINARY_BASE_URL = https://res.cloudinary.com/<cloud-name>/image/upload/v12345/ps3-fastfood

const CLOUDINARY_BASE = import.meta.env.VITE_CLOUDINARY_BASE_URL;

/**
 * Returns a production-ready image URL.
 * - If CLOUDINARY_BASE is configured, we map `/cheese-pizza.png`
 *   to `${CLOUDINARY_BASE}/cheese-pizza.png`
 * - If not configured, we fall back to the original public path
 */
export const getImageUrl = (path) => {
  if (!path) return '';

  // If no Cloudinary configured, use existing public asset path
  if (!CLOUDINARY_BASE) {
    return path;
  }

  const cleanPath = String(path).replace(/^\//, '');
  return `${CLOUDINARY_BASE}/${cleanPath}`;
};

export default getImageUrl;

