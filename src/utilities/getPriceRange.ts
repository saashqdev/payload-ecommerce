import { type Product } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";

export const getPriceRange = (variants: Product["variants"], enableVariantPrices: boolean) => {
  if (!variants || !enableVariantPrices) return null;

  const allPrices = variants.flatMap((variant) => variant.pricing ?? []);

  const groupedPrices = allPrices.reduce(
    (acc, currentPrice) => {
      const currency = currentPrice.currency as Currency;

      if (!acc[currency]) {
        acc[currency] = [];
      }

      acc[currency].push({
        ...currentPrice,
        currency: currentPrice.currency as Currency,
        id: currentPrice.id ?? undefined,
      });
      return acc;
    },
    {} as Record<Currency, { value: number; currency: Currency; id?: string }[]>,
  );

  const priceRanges: { value: number; currency: Currency; id?: string }[][] = [];
  const minPrices: { value: number; currency: Currency; id?: string }[] = [];
  const maxPrices: { value: number; currency: Currency; id?: string }[] = [];

  for (const currency in groupedPrices) {
    const prices = groupedPrices[currency as Currency];
    const sortedPrices = prices.sort((a, b) => a.value - b.value);

    const minPrice = sortedPrices[0];
    const maxPrice = sortedPrices[sortedPrices.length - 1];

    minPrices.push(minPrice);
    maxPrices.push(maxPrice);
  }

  priceRanges.push(minPrices);
  priceRanges.push(maxPrices);

  return priceRanges;
};
