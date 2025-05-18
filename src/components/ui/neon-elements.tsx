
import React from "react";
import { cn } from "@/lib/utils";

interface NeonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "secondary" | "yellow" | "teal" | "orange";
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
    primary: "text-[#A31D1D] warm-shadow",
    secondary: "text-[#6D2323] warm-shadow",
    yellow: "text-[#A31D1D] warm-shadow", // Using heading color
    teal: "text-[#6D2323] warm-shadow",   // Using text color
    orange: "text-[#E5D0AC] warm-shadow"  // Using component color
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
        backgroundColor: 
          color === "primary" ? "#A31D1D20" : 
          color === "secondary" ? "#6D232320" :
          color === "yellow" ? "#A31D1D20" :   // Using heading color
          color === "teal" ? "#6D232320" :     // Using text color
          color === "orange" ? "#E5D0AC20" : "#6D232320" // Using component color
      }}></div>
    </div>
  );
};

interface NeonTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: "primary" | "secondary" | "yellow" | "teal" | "orange";
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
    primary: "text-[#A31D1D] warm-shadow",
    secondary: "text-[#6D2323] warm-shadow",
    yellow: "text-[#A31D1D] warm-shadow", // Using heading color
    teal: "text-[#6D2323] warm-shadow",   // Using text color
    orange: "text-[#E5D0AC] warm-shadow"  // Using component color
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
  color?: "primary" | "secondary" | "yellow" | "teal" | "orange";
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
      solid: "bg-[#A31D1D]/20 text-[#A31D1D] border-[#A31D1D]",
      outline: "bg-transparent text-[#A31D1D] border-[#A31D1D]",
    },
    secondary: {
      solid: "bg-[#6D2323]/20 text-[#6D2323] border-[#6D2323]",
      outline: "bg-transparent text-[#6D2323] border-[#6D2323]",
    },
    yellow: {
      solid: "bg-[#A31D1D]/20 text-[#A31D1D] border-[#A31D1D]", // Using heading color
      outline: "bg-transparent text-[#A31D1D] border-[#A31D1D]", // Using heading color
    },
    teal: {
      solid: "bg-[#6D2323]/20 text-[#6D2323] border-[#6D2323]", // Using text color
      outline: "bg-transparent text-[#6D2323] border-[#6D2323]", // Using text color
    },
    orange: {
      solid: "bg-[#E5D0AC]/20 text-[#A31D1D] border-[#E5D0AC]", // Using component color with heading text
      outline: "bg-transparent text-[#A31D1D] border-[#E5D0AC]", // Using component color with heading text
    }
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
  color?: "primary" | "secondary" | "yellow" | "teal" | "orange";
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
    primary: "border-[#A31D1D]/40 hover:shadow-[0_0_15px_#A31D1D]",
    secondary: "border-[#6D2323]/40 hover:shadow-[0_0_15px_#6D2323]",
    yellow: "border-[#A31D1D]/40 hover:shadow-[0_0_15px_#A31D1D]", // Using heading color
    teal: "border-[#6D2323]/40 hover:shadow-[0_0_15px_#6D2323]",   // Using text color
    orange: "border-[#E5D0AC]/40 hover:shadow-[0_0_15px_#E5D0AC]", // Using component color
  };

  return (
    <div
      className={cn(
        "bg-[#E5D0AC]/90 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300",
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
  color?: "primary" | "secondary" | "yellow" | "teal" | "orange";
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
    primary: "bg-[#A31D1D] shadow-[0_0_5px_#A31D1D]",
    secondary: "bg-[#6D2323] shadow-[0_0_5px_#6D2323]",
    yellow: "bg-[#A31D1D] shadow-[0_0_5px_#A31D1D]", // Using heading color
    teal: "bg-[#6D2323] shadow-[0_0_5px_#6D2323]",   // Using text color
    orange: "bg-[#E5D0AC] shadow-[0_0_5px_#E5D0AC]", // Using component color
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
