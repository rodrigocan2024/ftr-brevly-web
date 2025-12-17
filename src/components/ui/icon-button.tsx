import type { ComponentProps } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button
      className="bg-gray-200 rounded-sm size-8 flex items-center justify-center hover:cursor-pointer hover:border hover:border-blue-base"
      {...props}
    >
      {children}
    </button>
  );
}

export { IconButton };
