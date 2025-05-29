
import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface NeonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "yellow" | "teal" | "orange";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const NeonIcon = ({
  color = "yellow",
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
    yellow: "text-neon-yellow neon-shadow-yellow",
    teal: "text-neon-teal neon-shadow-teal",
    orange: "text-neon-orange neon-shadow-orange",
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
        backgroundColor: color === "yellow" ? "#ECD06F20" : color === "teal" ? "#49c5b620" : "#FF652F20"
      }}></div>
    </div>
  );
};

interface NeonTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: "yellow" | "teal" | "orange";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const NeonTitle = ({
  color = "yellow",
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
    yellow: "text-neon-yellow neon-shadow-yellow",
    teal: "text-neon-teal neon-shadow-teal",
    orange: "text-neon-orange neon-shadow-orange",
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
  color?: "yellow" | "teal" | "orange";
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const NeonButton = ({
  color = "yellow",
  variant = "outline",
  size = "md",
  asChild = false,
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
    yellow: {
      solid: "bg-neon-yellow/20 text-neon-yellow border-neon-yellow",
      outline: "bg-transparent text-neon-yellow border-neon-yellow",
    },
    teal: {
      solid: "bg-neon-teal/20 text-neon-teal border-neon-teal",
      outline: "bg-transparent text-neon-teal border-neon-teal",
    },
    orange: {
      solid: "bg-neon-orange/20 text-neon-orange border-neon-orange",
      outline: "bg-transparent text-neon-orange border-neon-orange",
    },
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
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
    </Comp>
  );
};

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "yellow" | "teal" | "orange";
  hoverEffect?: boolean;
}

export const NeonCard = ({
  color = "yellow",
  hoverEffect = true,
  className,
  children,
  ...props
}: NeonCardProps) => {
  const colorClasses = {
    yellow: "border-neon-yellow/40 hover:shadow-[0_0_15px_theme(colors.neon.yellow)]",
    teal: "border-neon-teal/40 hover:shadow-[0_0_15px_theme(colors.neon.teal)]",
    orange: "border-neon-orange/40 hover:shadow-[0_0_15px_theme(colors.neon.orange)]",
  };

  return (
    <div
      className={cn(
        "bg-black/30 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300",
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
  color?: "yellow" | "teal" | "orange";
  width?: "full" | "3/4" | "1/2" | "1/4";
}

export const NeonDivider = ({
  color = "yellow",
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
    yellow: "bg-neon-yellow shadow-[0_0_5px_theme(colors.neon.yellow)]",
    teal: "bg-neon-teal shadow-[0_0_5px_theme(colors.neon.teal)]",
    orange: "bg-neon-orange shadow-[0_0_5px_theme(colors.neon.orange)]",
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
