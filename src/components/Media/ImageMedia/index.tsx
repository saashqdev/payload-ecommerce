"use client";

import NextImage, { type StaticImageData } from "next/image";

import { cssVariables } from "@/cssVariables";
import { cn } from "src/utilities/cn";

import type { Props as MediaProps } from "../types";

const { breakpoints } = cssVariables;

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAvSURBVHgB7c4xDQAwCAAwNv9uIbwgg6dV0JfVE4d+HBMQEBAQEBAQEBAQEBAQEFhJpwQc7phgKgAAAABJRU5ErkJggg==";

export const ImageMedia = (props: MediaProps) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    placeholder: placeholderFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps ?? "";

  if (!src && resource && typeof resource === "object") {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromResource ?? "";

    src = `${url}`;
  }

  const loading = loadingFromProps ?? (!priority ? "lazy" : undefined);

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes =
    sizeFromProps ??
    Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
      .join(", ");

  return (
    <picture>
      <NextImage
        alt={alt ?? ""}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder={placeholderFromProps ?? "blur"}
        blurDataURL={placeholderBlur}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  );
};
