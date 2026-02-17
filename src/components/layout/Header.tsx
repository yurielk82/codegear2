"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { name: "홈", href: "/" },
  { name: "기술", href: "#technology" },
  { name: "공고", href: "#notices" },
  { name: "회사소개", href: "#about" },
  { name: "연락처", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-sm shadow-sm"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Code Gear 홈으로 이동"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">
              CG
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Code Gear
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer md:hidden"
                aria-label="메뉴 열기"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                      <span className="text-xs font-bold text-primary-foreground">
                        CG
                      </span>
                    </div>
                    <span className="text-base font-bold tracking-tight">
                      Code Gear
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
