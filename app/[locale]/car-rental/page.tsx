"use client";

import { use, useMemo, useState } from "react";
import PageHero from "@/components/airport/PageHero";
import { startCheckout } from "@/lib/checkout";
import { Users, Briefcase, Fuel, Cog, Loader2, Check } from "lucide-react";

type Car = {
  id: string;
  name: string;
  brand: string;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  pricePerDay: number; // KWD
  seats: number;
  bags: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  emoji: string;
};

const CARS: Car[] = [
  { id: "yaris", name: "Toyota Yaris", brand: "Toyota", category: "Economy", pricePerDay: 9.5, seats: 5, bags: 2, transmission: "Automatic", fuel: "Petrol", emoji: "🚗" },
  { id: "sunny", name: "Nissan Sunny", brand: "Nissan", category: "Economy", pricePerDay: 10, seats: 5, bags: 2, transmission: "Automatic", fuel: "Petrol", emoji: "🚙" },
  { id: "elantra", name: "Hyundai Elantra", brand: "Hyundai", category: "Sedan", pricePerDay: 14, seats: 5, bags: 3, transmission: "Automatic", fuel: "Petrol", emoji: "🚘" },
  { id: "camry", name: "Toyota Camry", brand: "Toyota", category: "Sedan", pricePerDay: 18, seats: 5, bags: 3, transmission: "Automatic", fuel: "Petrol", emoji: "🚖" },
  { id: "prado", name: "Toyota Prado", brand: "Toyota", category: "SUV", pricePerDay: 32, seats: 7, bags: 4, transmission: "Automatic", fuel: "Petrol", emoji: "🚜" },
  { id: "patrol", name: "Nissan Patrol", brand: "Nissan", category: "SUV", pricePerDay: 38, seats: 7, bags: 5, transmission: "Automatic", fuel: "Petrol", emoji: "🛻" },
  { id: "mercedes", name: "Mercedes E-Class", brand: "Mercedes", category: "Luxury", pricePerDay: 55, seats: 5, bags: 3, transmission: "Automatic", fuel: "Petrol", emoji: "🏎️" },
  { id: "bmw7", name: "BMW 7 Series", brand: "BMW", category: "Luxury", pricePerDay: 65, seats: 5, bags: 3, transmission: "Automatic", fuel: "Petrol", emoji: "🚓" },
];

const CATEGORIES = ["All", "Economy", "Sedan", "SUV", "Luxury"] as const;

const catColor: Record<Car["category"], string> = {
  Economy: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Sedan: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  SUV: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Luxury: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
};

export default function CarRentalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [selected, setSelected] = useState<Car | null>(null);
  const [days, setDays] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cars = useMemo(
    () => (filter === "All" ? CARS : CARS.filter((c) => c.category === filter)),
    [filter]
  );

  const total = selected ? selected.pricePerDay * days : 0;

  const book = async () => {
    if (!selected) return;
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
      description: `Car rental — ${selected.name} (${days} day${days > 1 ? "s" : ""})`,
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
        image="/brand/ql/carRental.jpg"
        title="Car Rental"
        subtitle="Choose from a wide range of models and reserve online"
      />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car list */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium ring-1 transition ${
                    filter === c
                      ? "bg-sky-500 text-white ring-sky-400"
                      : "bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cars.map((car) => {
                const active = selected?.id === car.id;
                return (
                  <button
                    key={car.id}
                    onClick={() => setSelected(car)}
                    className={`kia-card text-left rounded-2xl p-5 transition ring-1 ${
                      active ? "ring-sky-400" : "ring-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{car.emoji}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ring-1 font-medium ${catColor[car.category]}`}
                      >
                        {car.category}
                      </span>
                    </div>
                    <h3 className="mt-3 font-bold text-white">{car.name}</h3>
                    <p className="text-xs text-slate-400">{car.brand}</p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{car.seats}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{car.bags}</span>
                      <span className="flex items-center gap-1"><Cog className="w-3.5 h-3.5" />{car.transmission}</span>
                      <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{car.fuel}</span>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <p className="text-sky-300">
                        <span className="text-2xl font-bold">KWD {car.pricePerDay}</span>
                        <span className="text-xs text-slate-400"> / day</span>
                      </p>
                      {active && (
                        <span className="flex items-center gap-1 text-xs text-sky-300 font-medium">
                          <Check className="w-4 h-4" /> Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Booking summary */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="kia-card rounded-2xl p-6">
              <h2 className="font-bold text-white text-lg mb-4">Your Booking</h2>

              {selected ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selected.emoji}</span>
                    <div>
                      <p className="font-semibold text-white">{selected.name}</p>
                      <p className="text-xs text-slate-400">{selected.category}</p>
                    </div>
                  </div>

                  <label className="block text-xs text-slate-400 mt-5 mb-1">Rental days</label>
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
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">
                      {selected.pricePerDay} × {days} day{days > 1 ? "s" : ""}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      KWD {total.toFixed(3)}
                    </span>
                  </div>

                  {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

                  <button
                    onClick={book}
                    disabled={loading}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting…</>
                    ) : (
                      <>Book &amp; Pay</>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 mt-3 text-center">
                    Secure payment via MyFatoorah
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-400">
                  Select a car to see pricing and reserve.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
