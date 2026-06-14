"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlaneLanding, PlaneTakeoff, Search, Radar } from "lucide-react";
import Link from "next/link";

export default function FlightWidget({ locale }: { locale: string }) {
  const t = useTranslations("flights");
  const router = useRouter();
  const [tab, setTab] = useState<"arrivals" | "departures">("departures");
  const [day, setDay] = useState("today");
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${locale}/flights?tab=${tab}${q ? `&q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <div className="kia-glass rounded-2xl p-2 w-full max-w-3xl shadow-2xl">
      {/* Tabs */}
      <div className="flex gap-1 p-1">
        <button
          onClick={() => setTab("departures")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            tab === "departures" ? "bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] text-white shadow" : "text-[#002b5c] hover:bg-white/50"
          }`}
        >
          <PlaneTakeoff className="w-4 h-4" />
          {t("departures")}
        </button>
        <button
          onClick={() => setTab("arrivals")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            tab === "arrivals" ? "bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] text-white shadow" : "text-[#002b5c] hover:bg-white/50"
          }`}
        >
          <PlaneLanding className="w-4 h-4" />
          {t("arrivals")}
        </button>
      </div>

      <form onSubmit={submit} className="p-3 pt-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center flex-1 gap-2 px-4 bg-white rounded-xl border border-gray-200">
            <Search className="w-5 h-5 text-[#0057a8] shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Flight number, airline or city..."
              className="flex-1 bg-transparent py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-7 py-3 bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap"
          >
            {t("title")}
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex gap-1">
            {["yesterday", "today", "tomorrow"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  day === d ? "bg-[#002b5c] text-white" : "bg-white/60 text-[#002b5c] hover:bg-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <Link
            href={`/${locale}/live`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/90 text-white hover:bg-red-600 transition-colors"
          >
            <Radar className="w-3.5 h-3.5" />
            Live Radar
          </Link>
        </div>
      </form>
    </div>
  );
}
