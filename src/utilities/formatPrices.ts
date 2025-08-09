/**
 * Function that formats a price using Intl.NumberFormat
 * @param price - Price to format
 * @param currency - Currency to format
 * @param locale - Locale to format
 * @returns - Formatted price
 */
export const formatPrice = (price: number, currency: string, locale: string) => {
  const formattedPrice = new Intl.NumberFormat(`${locale}-${locale.toUpperCase()}`, {
    style: "currency",
    currency: currency,
  }).format(price);
  return formattedPrice;
};
