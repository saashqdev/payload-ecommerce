import { type NumberFieldServerComponent } from "payload";

import { type Order, type Product } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";

import { ProductUnitPriceFieldClient } from "./ProductUnitPriceField.client";

export const ProductUnitPriceField: NumberFieldServerComponent = async ({
  data,
  siblingData,
  req,
  path,
  schemaPath,
  permissions,
  clientField,
}) => {
  const productID = siblingData.product as string;

  const payload = req.payload;
  let product: Product | null = null;
  try {
    product = await payload.findByID({
      collection: "products",
      id: productID,
    });
  } catch {
    console.log("No product found");
  }

  const orderDetails = data.orderDetails as Order["orderDetails"];

  const unitPrice = product?.enableVariantPrices
    ? product?.variants
        ?.find((variant) => variant?.variantSlug === (siblingData?.variantSlug as string))
        ?.pricing?.find((price) => price.currency === (orderDetails.currency as Currency))?.value
    : product?.pricing?.find((price) => price.currency === (orderDetails.currency as Currency))?.value;

  // console.log(unitPrice);

  const isFromAPI = Boolean(siblingData.isFromAPI as boolean);

  return (
    <div className="mx-[5px] my-auto h-fit w-full max-w-1/2 flex-1">
      <ProductUnitPriceFieldClient
        path={path}
        isFromAPI={isFromAPI}
        field={clientField}
        unitPrice={unitPrice}
        schemaPath={schemaPath}
        permissions={permissions}
      />
    </div>
  );
};
