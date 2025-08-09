import { Link } from "@/i18n/routing";
import { type Product } from "@/payload-types";

// Helper function to check if category is populated
const isCategoryPopulated = (category: unknown): category is { id: string; slug: string; title: string } => {
  return typeof category === "object" && category !== null && "slug" in category;
};

export const ProductBreadcrumbs = ({ product }: { product: Product }) => {
  const mainCategory = product.categoriesArr?.[0]?.category;
  const subcategory = product.categoriesArr?.[0]?.subcategories?.[0];

  return (
    <>
      <nav aria-label="Breadcrumb" className="container mr-auto px-4 pt-6 sm:px-6 lg:px-8">
        <ol role="list" className="flex items-center space-x-4">
          {isCategoryPopulated(mainCategory) && (
            <li key={mainCategory.id}>
              <div className="flex items-center">
                <Link
                  href={`/category/${mainCategory.slug}`}
                  className="mr-4 text-sm font-medium text-gray-900"
                >
                  {mainCategory.title}
                </Link>
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              </div>
            </li>
          )}
          {isCategoryPopulated(mainCategory) && isCategoryPopulated(subcategory) && (
            <li key={subcategory.id}>
              <div className="flex items-center">
                <Link
                  href={`/category/${mainCategory.slug}/${subcategory.slug}`}
                  className="mr-4 text-sm font-medium text-gray-900"
                >
                  {subcategory.title}
                </Link>
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              </div>
            </li>
          )}
          <li className="text-sm">
            <Link
              href={`/product/${product.slug}`}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.title}
            </Link>
          </li>
        </ol>
      </nav>
    </>
  );
};
