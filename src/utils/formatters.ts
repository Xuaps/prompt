/**
 * Formats a string by capitalizing the first letter of each word
 * @param str - The string to format
 * @returns The formatted string
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - The string to truncate
 * @param length - The maximum length of the string
 * @returns The truncated string
 */
export function truncateString(str: string, length: number): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
} 