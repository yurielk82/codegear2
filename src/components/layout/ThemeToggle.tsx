"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "theme";

const icons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const cycle: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

function getSystemPreference(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  const isDark = theme === "dark" || (theme === "system" && getSystemPreference());
  document.documentElement.classList.toggle("dark", isDark);
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "system" ? stored : "dark";
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToStorage, readStoredTheme, () => "dark" as Theme);

  useEffect(() => {
    applyTheme(theme);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const toggle = useCallback(() => {
    const next = cycle[theme];
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    window.dispatchEvent(new StorageEvent("storage"));
  }, [theme]);

  const Icon = icons[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={`테마: ${theme === "system" ? "시스템" : theme === "dark" ? "다크" : "라이트"}`}
      className="cursor-pointer"
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}
