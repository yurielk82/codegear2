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
      "bg-blue-500/15 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 dark:border-blue-500/40 dark:hover:border-blue-500/60 text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200 backdrop-blur-sm shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20",
    secondary:
      "bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-900/10 hover:border-slate-900/20 dark:border-white/10 dark:hover:border-white/20 text-slate-700 hover:text-slate-900 dark:text-white/70 dark:hover:text-white backdrop-blur-sm",
    ghost:
      "hover:bg-slate-900/5 dark:hover:bg-white/5 border border-transparent hover:border-slate-900/10 dark:hover:border-white/10 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white",
    danger:
      "bg-red-500/15 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 dark:border-red-500/40 dark:hover:border-red-500/60 text-red-600 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200 backdrop-blur-sm",
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
