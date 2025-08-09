import { type Media } from "@/payload-types";

export type FilledVariant = {
  color:
    | {
        label: string;
        slug: string;
        colorValue?: string | null;
        id?: string | null;
      }
    | undefined;
  size:
    | {
        label: string;
        slug: string;
        id?: string | null;
      }
    | undefined;
  slug: string | null | undefined;
  stock: number;
  image: Media | null | undefined;
  pricing:
    | {
        value: number;
        currency: "USD" | "EUR" | "GBP" | "PLN";
        id?: string | null;
      }[]
    | null
    | undefined;
};
