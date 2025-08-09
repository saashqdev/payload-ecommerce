import * as React from "react";

import { cn } from "src/utilities/cn";

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "twp border-border bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-main-600 block h-10 w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 ring-offset-0 outline-1 -outline-offset-1 outline-gray-300 outline-solid file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-solid disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm/6",
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
