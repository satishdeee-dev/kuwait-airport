"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MoonStar, ArrowRight } from "lucide-react";

const PRAYERS = [
  { name: "Fajr", arabic: "الفجر", time: "03:52" },
  { name: "Sunrise", arabic: "الشروق", time: "05:20" },
  { name: "Dhuhr", arabic: "الظهر", time: "11:52" },
  { name: "Asr", arabic: "العصر", time: "15:18" },
  { name: "Maghrib", arabic: "المغرب", time: "18:25" },
  { name: "Isha", arabic: "العشاء", time: "19:55" },
];

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function format12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function PrayerTimesWidget({ locale }: { locale: string }) {
  const n = useTranslations("nav");
  const [nowMin, setNowMin] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Next upcoming prayer (first whose time is after now; wraps to Fajr).
  const nextIdx =
    nowMin == null
      ? -1
      : (() => {
          const i = PRAYERS.findIndex((p) => toMinutes(p.time) > nowMin);
          return i === -1 ? 0 : i;
        })();

  const isRTL = locale === "ar";

  return (
    <aside className="kia-glass rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
          <MoonStar className="w-6 h-6" />
        </span>
        <div>
          <h3 className="font-bold text-white leading-tight">{n("prayer")}</h3>
          <p className="text-xs text-slate-400">Kuwait City · Today</p>
        </div>
      </div>

      <ul className="flex-1 space-y-1.5">
        {PRAYERS.map((p, i) => {
          const active = i === nextIdx;
          return (
            <li
              key={p.name}
              className={`flex items-center justify-between rounded-xl px-3 py-2 transition-colors ${
                active ? "bg-emerald-500 text-white shadow-sm" : "text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${active ? "" : "text-white"}`}>
                  {isRTL ? p.arabic : p.name}
                </span>
                <span className={`text-xs ${active ? "text-white/80" : "text-slate-400"}`}>
                  {isRTL ? p.name : p.arabic}
                </span>
              </span>
              <span className={`font-mono text-sm font-bold ${active ? "" : "text-sky-400"}`}>
                {format12h(p.time)}
              </span>
            </li>
          );
        })}
      </ul>

      <Link
        href={`/${locale}/prayer`}
        className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-sky-400 hover:gap-2 transition-all"
      >
        Prayer rooms & details <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  );
}
