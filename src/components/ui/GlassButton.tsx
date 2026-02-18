"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function GlassButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: GlassButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  const variants = {
    primary:
      "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 hover:border-blue-500/60 text-blue-300 hover:text-blue-200 backdrop-blur-sm shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20",
    secondary:
      "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white backdrop-blur-sm",
    ghost:
      "hover:bg-white/5 border border-transparent hover:border-white/10 text-white/60 hover:text-white",
    danger:
      "bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 hover:border-red-500/60 text-red-300 hover:text-red-200 backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
