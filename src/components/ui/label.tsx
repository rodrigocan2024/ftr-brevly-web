import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const label = tv({
  base: "text-xs font-normal text-gray-500 group-focus-within:font-bold group-focus-within-active:font-bold",
  variants: {
    status: {
      default:
        "group-focus-within:text-blue-base group-active:text-blue-base group-focus-within:font-bold group-active:font-bold",
      error:
        "group-focus-within:text-danger group-focus-within:active:text-danger text-danger font-bold",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export type LabelProps = ComponentProps<"label"> &
  VariantProps<typeof label> & {
    status?: string;
  };

function Label({ className, status = "default", ...props }: LabelProps) {
  return (
    <label
      htmlFor={props.id}
      className={label({ status, className })}
      {...props}
    >
      {props.children}
    </label>
  );
}

export { Label };
