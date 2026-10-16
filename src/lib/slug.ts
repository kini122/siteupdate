/**
 * Utility functions for slug generation, sanitization, and validation.
 * Complies with strict SEO best practices:
 * - Lowercase only
 * - Strips all special characters and punctuation
 * - Single hyphen separators
 * - Trims leading/trailing hyphens
 */

export function generateSlug(text: string): string {
  if (!text) return ""
  return text
    .toLowerCase()
    .normalize("NFD") // split accented characters into base characters + diacritics
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric chars (except spaces and hyphens)
    .trim()
    .replace(/\s+/g, "-") // replace multiple whitespace with single hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens into one
    .replace(/^-+|-+$/g, "") // remove leading/trailing hyphens
}

export function validateSlug(slug: string): { isValid: boolean; error?: string } {
  if (!slug || slug.trim() === "") {
    return { isValid: false, error: "Slug cannot be empty." }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      isValid: false,
      error: "Slug must contain only lowercase letters, numbers, and single hyphens without leading or trailing hyphens.",
    }
  }
  if (slug.length < 3) {
    return { isValid: false, error: "Slug must be at least 3 characters long." }
  }
  if (slug.length > 120) {
    return { isValid: false, error: "Slug is too long (maximum 120 characters)." }
  }
  return { isValid: true }
}
