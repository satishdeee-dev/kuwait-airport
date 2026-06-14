"use client";

import { use, useMemo, useState } from "react";
import PageHero from "@/components/airport/PageHero";
import { startCheckout } from "@/lib/checkout";
import { Loader2, Car, Ban, Check } from "lucide-react";

type Zone = {
  id: string;
  name: string;
  pricePerDay: number; // KWD
  walk: string;
  rows: string[];
  cols: number;
  reserved: string[]; // slot ids e.g. "A3"
};

const ZONES: Zone[] = [
  {
    id: "P1",
    name: "P1 — Short Stay",
    pricePerDay: 5,
    walk: "2 min walk",
    rows: ["A", "B", "C", "D"],
    cols: 10,
    reserved: ["A2", "A3", "A7", "B1", "B5", "B6", "C4", "C9", "D2", "D3", "D8"],
  },
  {
    id: "P2",
    name: "P2 — Long Stay",
    pricePerDay: 2.5,
    walk: "5 min shuttle",
    rows: ["A", "B", "C", "D"],
    cols: 10,
    reserved: ["A5", "A6", "B2", "B9", "C1", "C7", "D4", "D5", "D6"],
  },
  {
    id: "P3",
    name: "P3 — Economy",
    pricePerDay: 1.5,
    walk: "10 min shuttle",
    rows: ["A", "B", "C", "D"],
    cols: 10,
    reserved: ["A1", "A9", "B4", "C3", "C8", "D10"],
  },
  {
    id: "VIP",
    name: "VIP Parking",
    pricePerDay: 10,
    walk: "1 min walk",
    rows: ["A", "B"],
    cols: 8,
    reserved: ["A1", "A4", "B2", "B7"],
  },
];

export default function ParkingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [zoneId, setZoneId] = useState(ZONES[0].id);
  const [slot, setSlot] = useState<string | null>(null);
  const [days, setDays] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const zone = useMemo(() => ZONES.find((z) => z.id === zoneId)!, [zoneId]);
  const reservedSet = useMemo(() => new Set(zone.reserved), [zone]);
  const totalSlots = zone.rows.length * zone.cols;
  const available = totalSlots - zone.reserved.length;
  const total = slot ? zone.pricePerDay * days : 0;

  const pick = (id: string) => {
    if (reservedSet.has(id)) return;
    setSlot(id);
    setError("");
  };

  const switchZone = (id: string) => {
    setZoneId(id);
    setSlot(null);
  };

  const book = async () => {
    if (!slot) return;
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setLoading(true);
    const err = await startCheckout({
      amount: Number(total.toFixed(3)),
      customerName: name,
      customerMobile: mobile,
      description: `Parking — ${zone.name} · Slot ${slot} (${days} day${days > 1 ? "s" : ""})`,
      locale,
    });
    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        image="/brand/ql/parking.jpg"
        title="Parking Reservation"
        subtitle="Pre-book your parking slot on the live map"
      />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10">
        {/* Zone tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ZONES.map((z) => {
            const avail = z.rows.length * z.cols - z.reserved.length;
            return (
              <button
                key={z.id}
                onClick={() => switchZone(z.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium ring-1 transition text-left ${
                  zoneId === z.id
                    ? "bg-emerald-500 text-white ring-emerald-400"
                    : "bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10"
                }`}
              >
                <span className="block font-semibold">{z.name}</span>
                <span className="block text-[11px] opacity-80">
                  KWD {z.pricePerDay}/day · {avail} free
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slot map */}
          <div className="lg:col-span-2">
            <div className="kia-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">{zone.name}</h2>
                <span className="text-xs text-slate-400">
                  {available} / {totalSlots} available · {zone.walk}
                </span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-5 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-white/10 ring-1 ring-white/20" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-red-500/30 ring-1 ring-red-500/50" /> Reserved
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500" /> Your pick
                </span>
              </div>

              {/* Driving lane label */}
              <div className="text-center text-[11px] uppercase tracking-widest text-slate-500 mb-3">
                ⟵ Entrance / Driving lane
              </div>

              <div className="space-y-2 overflow-x-auto">
                {zone.rows.map((row) => (
                  <div key={row} className="flex items-center gap-2 min-w-max">
                    <span className="w-5 text-xs font-mono text-slate-500">{row}</span>
                    <div className="flex gap-1.5 sm:gap-2">
                      {Array.from({ length: zone.cols }, (_, i) => {
                        const id = `${row}${i + 1}`;
                        const isReserved = reservedSet.has(id);
                        const isSel = slot === id;
                        return (
                          <button
                            key={id}
                            onClick={() => pick(id)}
                            disabled={isReserved}
                            title={isReserved ? `${id} · reserved` : `${id} · available`}
                            className={`w-9 h-11 sm:w-10 sm:h-12 rounded-md flex items-center justify-center transition ring-1 ${
                              isSel
                                ? "bg-emerald-500 ring-emerald-400 text-white"
                                : isReserved
                                ? "bg-red-500/25 ring-red-500/40 text-red-300/70 cursor-not-allowed"
                                : "bg-white/5 ring-white/15 text-slate-400 hover:bg-white/10 hover:ring-sky-400"
                            }`}
                          >
                            {isSel ? (
                              <Check className="w-4 h-4" />
                            ) : isReserved ? (
                              <Ban className="w-3.5 h-3.5" />
                            ) : (
                              <Car className="w-3.5 h-3.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking summary */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="kia-card rounded-2xl p-6">
              <h2 className="font-bold text-white text-lg mb-4">Your Reservation</h2>

              {slot ? (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Zone</span>
                    <span className="text-white font-medium">{zone.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1.5">
                    <span className="text-slate-400">Slot</span>
                    <span className="text-white font-mono font-bold">{slot}</span>
                  </div>

                  <label className="block text-xs text-slate-400 mt-5 mb-1">Days</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setDays((d) => Math.max(1, d - 1))}
                      className="w-9 h-9 rounded-lg bg-white/10 text-white text-lg hover:bg-white/15"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-white font-semibold">{days}</span>
                    <button
                      onClick={() => setDays((d) => Math.min(60, d + 1))}
                      className="w-9 h-9 rounded-lg bg-white/10 text-white text-lg hover:bg-white/15"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-5 space-y-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">
                      {zone.pricePerDay} × {days} day{days > 1 ? "s" : ""}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      KWD {total.toFixed(3)}
                    </span>
                  </div>

                  {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

                  <button
                    onClick={book}
                    disabled={loading}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting…</>
                    ) : (
                      <>Reserve &amp; Pay</>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 mt-3 text-center">
                    Secure payment via MyFatoorah
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-400">
                  Tap an available slot on the map to reserve it.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
