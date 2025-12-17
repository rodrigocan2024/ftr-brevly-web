import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const input = tv({
  base: "peer w-full rounded-lg border p-4 font-normal placeholder:text-gray-400",
  variants: {
    status: {
      default: "focus:border-blue-base active:border-blue-base border-gray-300",
      error: "border-danger focus:border-danger active:border-danger",
    },
    hasPrefix: {
      true: "pl-[74px]",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export type InputProps = ComponentProps<"input"> &
  VariantProps<typeof input> & {
    status?: string;
    value?: string | number;
    prefix?: string;
  };

function Input({ className, status, prefix, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {" "}
      {prefix && (
        <span className="absolute left-4 text-gray-500 pointer-events-none z-10">
          {" "}
          {prefix}
        </span>
      )}
      <input
        className={input({ status, className, hasPrefix: !!prefix })}
        {...props}
      />
    </div>
  );
}

export { Input };
