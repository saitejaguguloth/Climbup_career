
import React from "react";
import { cn } from "@/lib/utils";

interface NeonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const NeonIcon = ({
  color = "primary",
  size = "md",
  className,
  children,
  ...props
}: NeonIconProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colorClasses = {
    primary: "text-climbup-heading warm-shadow",
    secondary: "text-climbup-text warm-shadow",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
      <div className="absolute inset-0 opacity-40 blur-md rounded-full" style={{
        backgroundColor: color === "primary" ? "#A31D1D20" : "#6D232320"
      }}></div>
    </div>
  );
};

interface NeonTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const NeonTitle = ({
  color = "primary",
  size = "lg",
  className,
  children,
  ...props
}: NeonTitleProps) => {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
    "2xl": "text-4xl md:text-5xl",
  };

  const colorClasses = {
    primary: "text-climbup-heading warm-shadow",
    secondary: "text-climbup-text warm-shadow",
  };

  return (
    <h2
      className={cn(
        "font-display tracking-wider font-bold",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}

export const NeonButton = ({
  color = "primary",
  variant = "outline",
  size = "md",
  className,
  children,
  ...props
}: NeonButtonProps) => {
  const sizeClasses = {
    sm: "text-xs py-1 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  const colorVariantClasses = {
    primary: {
      solid: "bg-climbup-heading/20 text-climbup-heading border-climbup-heading",
      outline: "bg-transparent text-climbup-heading border-climbup-heading",
    },
    secondary: {
      solid: "bg-climbup-text/20 text-climbup-text border-climbup-text",
      outline: "bg-transparent text-climbup-text border-climbup-text",
    },
  };

  return (
    <button
      className={cn(
        "font-display tracking-wide uppercase font-bold border rounded transition-all duration-300",
        "hover:bg-opacity-30 hover:shadow-[0_0_10px_currentColor]",
        sizeClasses[size],
        colorVariantClasses[color][variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary";
  hoverEffect?: boolean;
}

export const NeonCard = ({
  color = "primary",
  hoverEffect = true,
  className,
  children,
  ...props
}: NeonCardProps) => {
  const colorClasses = {
    primary: "border-climbup-heading/40 hover:shadow-[0_0_15px_theme(colors.climbup.heading)]",
    secondary: "border-climbup-text/40 hover:shadow-[0_0_15px_theme(colors.climbup.text)]",
  };

  return (
    <div
      className={cn(
        "bg-climbup-component/90 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300",
        hoverEffect && colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface NeonDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary";
  width?: "full" | "3/4" | "1/2" | "1/4";
}

export const NeonDivider = ({
  color = "primary",
  width = "full",
  className,
  ...props
}: NeonDividerProps) => {
  const widthClasses = {
    "full": "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2",
    "1/4": "w-1/4",
  };

  const colorClasses = {
    primary: "bg-climbup-heading shadow-[0_0_5px_theme(colors.climbup.heading)]",
    secondary: "bg-climbup-text shadow-[0_0_5px_theme(colors.climbup.text)]",
  };

  return (
    <div 
      className={cn(
        "h-0.5 rounded-full mx-auto opacity-70",
        widthClasses[width],
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
};
