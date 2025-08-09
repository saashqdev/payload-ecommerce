import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Media } from "@/components/Media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/routing";
import { type Product } from "@/payload-types";
import { getPriceRange } from "@/utilities/getPriceRange";

import type useEmblaCarousel from "embla-carousel-react";

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

export const WithInlinePriceSlider = ({
  products,
  opts,
}: {
  products: Product[];
  opts?: Partial<CarouselOptions>;
}) => {
  const t = useTranslations("ProductList");
  return (
    <Carousel
      opts={{
        ...opts,
        slidesToScroll: 2,
        breakpoints: {
          "(min-width: 768px)": {
            slidesToScroll: 3,
          },
          "(min-width: 1280px)": {
            slidesToScroll: 4,
          },
        },
      }}
    >
      <CarouselContent>
        {products.map((product) => {
          if (typeof product.images[0] !== "string") {
            const priceRange = getPriceRange(product.variants, product.enableVariantPrices ?? false);

            let pricingComponent: ReactNode;

            if (priceRange?.length === 2) {
              pricingComponent = (
                <>
                  <PriceClient pricing={priceRange[0]} />
                  <span className="mx-1">-</span>
                  <PriceClient pricing={priceRange[1]} />
                </>
              );
            } else if (priceRange?.length === 1) {
              pricingComponent = <PriceClient pricing={priceRange[0]} />;
            } else if (!product.enableVariantPrices && product.pricing) {
              pricingComponent = <PriceClient pricing={product.pricing} />;
            }

            return (
              <CarouselItem key={product.id} className="group relative basis-1/2 md:basis-1/3 xl:basis-1/4">
                <Media
                  resource={product.images[0]}
                  className="aspect-square w-full overflow-clip rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:max-h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div className="w-3/5">
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </Link>
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.enableVariants && product.variants
                        ? `${product.variants.length} ${product.variants.length > 1 ? t("variants-plural") : t("variants-singular")}`
                        : ""}
                    </p>
                  </div>
                  <p className="flex w-2/5 flex-wrap justify-end text-sm font-medium text-gray-900">
                    {pricingComponent}
                  </p>
                </div>
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
