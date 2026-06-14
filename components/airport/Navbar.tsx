"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Globe, Plane } from "lucide-react";

const navLinks = [
  { key: "flights", href: "/flights" },
  { key: "passenger", href: "/passenger" },
  { key: "services", href: "/services" },
  { key: "transport", href: "/transport" },
  { key: "parking", href: "/parking" },
  { key: "dining", href: "/dining" },
  { key: "lostFound", href: "/lost-found" },
  { key: "prayer", href: "/prayer" },
  { key: "weather", href: "/weather" },
  { key: "visa", href: "/visa" },
  { key: "complaints", href: "/complaints" },
  { key: "media", href: "/media" },
  { key: "vip", href: "/vip" },
] as const;

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="bg-[#003366] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg">
            <Plane className="w-6 h-6" />
            <span className="hidden sm:inline">Kuwait International Airport</span>
            <span className="sm:hidden">KIA</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="px-3 py-2 rounded hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-white/30 hover:bg-white/10 text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              {otherLocale === "ar" ? "العربية" : "English"}
            </Link>
            <button
              className="lg:hidden p-2 rounded hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/20 bg-[#003366]">
          <nav className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-2 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="px-3 py-2 rounded hover:bg-white/10 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
