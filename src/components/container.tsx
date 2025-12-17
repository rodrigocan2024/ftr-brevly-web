import type { JSX } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps<Tag extends keyof JSX.IntrinsicElements = "div"> = {
  as?: Tag;
} & JSX.IntrinsicElements[Tag];

export function Container({ as = "div", className, ...props }: ContainerProps) {
  const ContainerComponent = as;

  return (
    <ContainerComponent
      className={twMerge(
        "bg-gray-100 flex flex-col gap-4 rounded-lg p-6",
        className,
      )}
      {...props}
    />
  );
}
