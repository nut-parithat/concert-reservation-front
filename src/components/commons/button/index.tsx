import { cn } from "@/utils/className";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  fullWidth?: boolean;
}

const variantClass = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  outline: "border border-primary text-primary bg-white hover:bg-gray-50",
  danger: "bg-error text-white hover:opacity-90",
};

export default function Button({
  prefixIcon,
  suffixIcon,
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer",
        variantClass[variant],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {prefixIcon && <span className="flex items-center">{prefixIcon}</span>}
      {children}
      {suffixIcon && <span className="flex items-center">{suffixIcon}</span>}
    </button>
  );
}
