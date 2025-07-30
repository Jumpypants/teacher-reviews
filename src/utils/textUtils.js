// Text formatting utilities

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return str;
  return str.replace(/\b\w+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
};

/**
 * Sanitize input by trimming and removing script tags
 * @param {string} input - The input to sanitize
 * @returns {string} - The sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Validate image URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidImageUrl = (url) => {
  if (!url) return true; // Empty URL is allowed
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};
