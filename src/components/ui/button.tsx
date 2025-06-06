
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900",
      secondary: "bg-neutral-100 text-black hover:bg-neutral-200 active:bg-neutral-300",
      outline: "bg-transparent text-black border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100",
      ghost: "bg-transparent text-black hover:bg-neutral-100 active:bg-neutral-200",
      link: "bg-transparent text-black underline-offset-4 hover:underline p-0 h-auto"
    };

    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-5 py-2.5 rounded-md",
      lg: "text-base px-6 py-3 rounded-md"
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          "font-medium transition-all duration-300 inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {icon && iconPosition === "left" && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
