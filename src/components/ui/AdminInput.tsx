import * as React from "react";

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

const AdminInput = React.forwardRef<HTMLInputElement, InputProps>(({ type, className, ...props }, ref) => {
  return (
    <div className="field-type text no-twp">
      <div className="field-type__wrap">
        <input className={className} ref={ref} type={type} {...props} />
      </div>
    </div>
  );
});

AdminInput.displayName = "AdminInput";

export { AdminInput };
