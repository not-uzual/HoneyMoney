/**
 * Formats a numeric value as Indian Rupee currency string.
 * Mirrors the reference utils.js formatCurrency function.
 *
 * @example formatCurrency(52430) → "₹52,430"
 */
export const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null) return '₹0';
  return `₹${value.toLocaleString('en-IN')}`;
};
