"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Globe, Sun } from "lucide-react";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Navbar({ locale }: { locale: string }) {
  const now = useNow();
  const otherLocale = locale === "en" ? "ar" : "en";
  const isRTL = locale === "ar";

  const timeStr = now
    ? now.toLocaleTimeString(isRTL ? "ar-KW" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kuwait",
      })
    : "--:--:--";

  const dateStr = now
    ? now.toLocaleDateString(isRTL ? "ar-KW" : "en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone: "Asia/Kuwait",
      })
    : "";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a14]/80 backdrop-blur supports-[backdrop-filter]:bg-[#050a14]/70 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 h-14 sm:h-16">
          <Link href={`/${locale}`} className="flex items-center group shrink-0">
            <Image
              src="/brand/logo-white.png"
              alt="Kuwait International Airport"
              width={200}
              height={50}
              priority
              className="h-7 sm:h-9 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live clock */}
            <div className="text-right leading-tight">
              <p className="font-mono text-sm sm:text-lg font-bold tabular-nums tracking-tight">
                {timeStr}
              </p>
              <p className="hidden sm:block text-[10px] sm:text-xs text-white/60">
                {dateStr} · Kuwait
              </p>
            </div>

            {/* Weather */}
            <Link
              href={`/${locale}/weather`}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/15 px-2.5 py-1.5 transition-colors"
            >
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span className="font-semibold text-sm sm:text-base">44°</span>
              <span className="hidden md:inline text-xs text-white/60">Sunny</span>
            </Link>

            {/* Language toggle */}
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/20 hover:bg-white/10 text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {otherLocale === "ar" ? "العربية" : "EN"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
