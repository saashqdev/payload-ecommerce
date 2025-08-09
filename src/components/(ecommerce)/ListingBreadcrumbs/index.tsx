import { Link } from "@/i18n/routing";
import { type ProductCategory, type ProductSubCategory } from "@/payload-types";

export const ListingBreadcrumbs = ({
  category,
  subcategory,
}: {
  category: ProductCategory;
  subcategory?: ProductSubCategory;
}) => {
  return (
    <>
      <nav aria-label="Breadcrumb" className="container mr-auto px-4 pt-6 sm:px-6 lg:px-8">
        <ol role="list" className="flex items-center space-x-4">
          <li key={category.id}>
            <div className="flex items-center">
              <Link href={`/category/${category.slug}`} className="mr-4 text-sm font-medium text-gray-900">
                {category.title}
              </Link>
              <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
              </svg>
            </div>
          </li>

          {subcategory && (
            <li key={subcategory.id} className="text-sm">
              <div className="flex items-center">
                <Link
                  href={`/category/${category.slug}/${subcategory.slug}`}
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {subcategory.title}
                </Link>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};
