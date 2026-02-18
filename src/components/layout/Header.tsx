"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-300 ${
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative mx-auto flex h-auto max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer z-10"
          aria-label="Code Gear 홈으로 이동"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/30">
            <span className="text-sm font-bold text-blue-300">CG</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Code Gear
          </span>
        </Link>

        {/* Desktop Navigation — absolutely centered */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="cursor-pointer text-base font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: ThemeToggle + Mobile hamburger */}
        <div className="flex items-center gap-3 z-10">
          <ThemeToggle />

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
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <span className="text-xs font-bold text-blue-300">CG</span>
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
                    className="cursor-pointer rounded-md px-3 py-2.5 text-base font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
