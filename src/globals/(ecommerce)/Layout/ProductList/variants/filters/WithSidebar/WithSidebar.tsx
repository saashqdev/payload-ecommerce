import "server-only";

import {
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "@/i18n/routing";
import { type Product, type ProductCategory, type ProductSubCategory } from "@/payload-types";

import { FilterCheckbox } from "./components/FilterCheckbox";
import { MobileFiltersCloseButton } from "./components/MobileFiltersCloseButton";
import { MobileFiltersDialog } from "./components/MobileFiltersDialog";
import { MobileFunnelFiltersButton } from "./components/MobileFunnelFiltersButton";
import { SortSelect } from "./components/SortSelect";

// Type guard
const isProductCategory = (category: ProductCategory | ProductSubCategory): category is ProductCategory => {
  return "subcategories" in category;
};

export const WithSidebar = ({
  title,
  category,
  products,
  searchParams,
  children,
}: {
  title: string;
  category?: ProductCategory | ProductSubCategory;
  products: Product[];
  searchParams: {
    size: string[];
    color: string[];
    sortBy: string;
  };
  children: ReactNode;
}) => {
  const t = useTranslations("ProductList");

  const sizes = Array.from(
    new Map(
      products
        ?.flatMap((product) => {
          if (typeof product === "string") return [];
          return (
            product.sizes?.map((size) => ({
              value: size.slug,
              label: size.label,
              checked: searchParams.size.includes(size.slug) ?? false,
            })) ?? []
          );
        })
        .map((size) => [size.value, size]),
    ).values(),
  );

  const colors = Array.from(
    new Map(
      products
        ?.flatMap((product) => {
          if (typeof product === "string") return [];
          return (
            product.colors?.map((color) => ({
              value: color.slug,
              label: color.label,
              checked: searchParams.color.includes(color.slug),
            })) ?? []
          );
        })
        .map((color) => [color.value, color]),
    ).values(),
  );

  const filters = [
    {
      id: "color",
      name: t("color"),
      options: colors,
    },
    {
      id: "size",
      name: t("size"),
      options: sizes,
    },
  ];

  const sortOptions = [
    { label: t("most-popular"), value: "most-popular" },
    { label: t("newest"), value: "newest" },
    { label: t("price-low-to-high"), value: "priceasc" },
    { label: t("price-high-to-low"), value: "pricedesc" },
  ];

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog  - client, but server children */}

        <MobileFiltersDialog>
          {/*  Server from */}
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">{t("filters")}</h2>
                <MobileFiltersCloseButton />
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {category && isProductCategory(category) && category.subcategories?.docs && (
                  <>
                    <h3 className="sr-only">{t("categories")}</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {category.subcategories.docs.map(
                        (subcategory) =>
                          typeof subcategory !== "string" && (
                            <li key={subcategory.id}>
                              <Link
                                className="block px-2 py-3"
                                href={`/category/${category.slug}/${subcategory.slug}`}
                              >
                                {subcategory.title}
                              </Link>
                            </li>
                          ),
                      )}
                    </ul>
                  </>
                )}

                {filters.map(
                  (section) =>
                    section.options.length > 0 && (
                      <Disclosure
                        defaultOpen={Boolean(section.options.find((option) => option.checked))}
                        key={section.id}
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                              <MinusIcon
                                aria-hidden="true"
                                className="size-5 group-[&:not([data-open])]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <FilterCheckbox
                                      option={option}
                                      sectionId={section.id}
                                      optionIdx={optionIdx}
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ),
                )}
              </form>
            </DialogPanel>
          </div>
        </MobileFiltersDialog>

        <main className="container mx-auto">
          <div className="flex items-baseline justify-between gap-4 border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>

            <div className="flex items-center">
              <SortSelect defaultValue={searchParams.sortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t("sort")} />
                </SelectTrigger>
                <SelectContent className="py-1">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SortSelect>

              <MobileFunnelFiltersButton />
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              {t("products")}
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {category && isProductCategory(category) && category.subcategories?.docs && (
                  <>
                    <h3 className="sr-only">{t("categories")}</h3>
                    <ul
                      role="list"
                      className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                    >
                      {category.subcategories.docs.map(
                        (subcategory) =>
                          typeof subcategory !== "string" && (
                            <li key={subcategory.id}>
                              <Link href={`/category/${category.slug}/${subcategory.slug}`}>
                                {subcategory.title}
                              </Link>
                            </li>
                          ),
                      )}
                    </ul>
                  </>
                )}

                {filters.map(
                  (section) =>
                    section.options.length > 0 && (
                      <Disclosure
                        key={section.id}
                        as="div"
                        defaultOpen={Boolean(section.options.find((option) => option.checked))}
                        className="border-b border-gray-200 py-6"
                      >
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                              <MinusIcon
                                aria-hidden="true"
                                className="size-5 group-[&:not([data-open])]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <FilterCheckbox
                                      option={option}
                                      sectionId={section.id}
                                      optionIdx={optionIdx}
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ),
                )}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {children}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
