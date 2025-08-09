import { Input } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { cn } from "@/utilities/cn";

export const QuantityInput = ({
  minQuantity,
  maxQuantity,
  quantity,
  setQuantity,
  updateQuantity,
  inputVariant = "default",
}: {
  minQuantity: number;
  maxQuantity: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  updateQuantity: (delta: number) => void;
  inputVariant?: "default" | "cart";
}) => {
  const handleIncreaseQuantity = () => {
    if (quantity < maxQuantity) {
      updateQuantity(1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > minQuantity) {
      updateQuantity(-1);
    }
  };

  return (
    <div
      className={cn(
        "flex w-fit items-center border border-gray-200",
        inputVariant === "default" ? "sm:ml-4" : "py-[2px]",
      )}
    >
      <button
        type="button"
        className={cn(
          "cursor-pointer p-2",
          quantity <= minQuantity && "cursor-not-allowed opacity-25",
          inputVariant === "cart" && "p-1",
        )}
        disabled={quantity <= minQuantity}
        onClick={handleDecreaseQuantity}
      >
        <MinusIcon width={20} height={20} />
      </button>
      <Input
        type="number"
        className={cn(
          `mx-auto h-full w-full min-w-10 max-w-16 p-2 text-center outline-hidden [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`,
          inputVariant === "cart" && "p-1",
        )}
        value={quantity}
        min={1}
        max={maxQuantity}
        onKeyDown={(e) => {
          const key = e.key;

          const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

          if (!/^[0-9]$/.test(key) && !allowedKeys.includes(key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          const quantityFromInput = Number(e.target.value);
          if (quantityFromInput > maxQuantity) {
            setQuantity(maxQuantity);
          } else if (quantityFromInput < minQuantity) {
            setQuantity(minQuantity);
          } else {
            setQuantity(quantityFromInput);
          }
        }}
      />
      <button
        className={cn(
          "cursor-pointer p-2",
          quantity >= maxQuantity && "cursor-not-allowed opacity-25",
          inputVariant === "cart" && "p-1",
        )}
        type="button"
        disabled={quantity >= maxQuantity}
        onClick={handleIncreaseQuantity}
      >
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
};
