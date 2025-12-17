import type { IconProps } from "phosphor-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
};

function Button({
  variant = "primary",
  className,
  children,
  icon: Icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        "flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer",
        variant === "primary" &&
          "w-full h-[48px] rounded-lg bg-blue-base text-white",
        variant === "primary" && "[&:not(:disabled)]:hover:bg-blue-dark",
        variant === "secondary" && "rounded-sm bg-gray-200 text-gray-500",
        variant === "secondary" &&
          "[&:not(:disabled)]:hover:border [&:not(:disabled)]:hover:border-blue-base",
      )}
      {...props}
    >
      {variant === "secondary" && Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

type TitleProps = ComponentProps<"span"> & {
  children: React.ReactNode;
};

function Title({ children, className, ...props }: TitleProps) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}

function Icon({
  icon: Icon,
}: {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}) {
  return <Icon className="w-4 h-4" />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
