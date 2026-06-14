import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, Radar } from "lucide-react";
import FlightWidget from "@/components/airport/FlightWidget";
import QuickLinksCarousel from "@/components/airport/QuickLinksCarousel";
import PrayerTimesWidget from "@/components/airport/PrayerTimesWidget";

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations("home");

  const experiences = [
    { key: "dining", href: "/dining", title: "Dining & Shopping", desc: "Restaurants, cafés and duty-free", emoji: "🛍️", grad: "from-amber-500 to-orange-600" },
    { key: "vip", href: "/vip", title: "VIP & Lounges", desc: "Premium services and relaxation", emoji: "⭐", grad: "from-purple-500 to-indigo-600" },
    { key: "transport", href: "/transport", title: "Getting Around", desc: "Taxi, bus and transfers", emoji: "🚕", grad: "from-emerald-500 to-teal-600" },
    { key: "guidance", href: "/guidance", title: "Terminal Guide", desc: "Maps and wayfinding", emoji: "🗺️", grad: "from-sky-500 to-blue-600" },
  ] as const;

  return (
    <div>
      {/* Hero with real airport photo */}
      <section className="relative h-[88vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/hero1.jpg"
            alt="Kuwait International Airport Terminal"
            fill
            priority
            className="object-cover kia-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002b5c]/80 via-[#002b5c]/45 to-[#002b5c]/85" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <Image
            src="/brand/logo-white.png"
            alt="Kuwait International Airport"
            width={320}
            height={80}
            priority
            className="kia-rise h-14 md:h-20 w-auto mb-6 drop-shadow-lg"
          />
          <span className="kia-rise inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-medium tracking-widest uppercase ring-1 ring-white/30 mb-6">
            General Authority of Civil Aviation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight kia-rise drop-shadow-lg" style={{ animationDelay: "0.05s" }}>
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/85 mb-9 kia-rise drop-shadow" style={{ animationDelay: "0.12s" }}>
            {t("subtitle")}
          </p>
          <div className="kia-rise w-full flex justify-center" style={{ animationDelay: "0.2s" }}>
            <FlightWidget locale={locale} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%201440%2048%22%20preserveAspectRatio=%22none%22%3E%3Cpath%20fill=%22%23f4f8fc%22%20d=%22M0,48L1440,48L1440,12C1080,40%20360,40%200,12Z%22/%3E%3C/svg%3E')] bg-cover z-10" />
      </section>

      {/* Live tracking banner */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <Link
          href={`/${locale}/live`}
          className="kia-glass kia-floaty flex items-center gap-4 rounded-2xl p-5 group"
        >
          <span className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500 text-white shrink-0">
            <span className="absolute inset-0 rounded-2xl bg-red-500 kia-pulse-ring" />
            <Radar className="w-6 h-6 relative" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-white flex items-center gap-2">
              Live Flight Radar
              <span className="w-2 h-2 rounded-full bg-red-500 kia-blip" />
            </p>
            <p className="text-sm text-slate-300">Track aircraft over Kuwait airspace in real time</p>
          </div>
          <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
        </Link>
      </section>

      {/* Quick links — rolling photo carousel */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">{t("quickLinks")}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] rounded-full mx-auto" />
        </div>
        <QuickLinksCarousel locale={locale} />
      </section>

      {/* Experiences grid (Dubai-style) with prayer times on the side */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Explore the Airport</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {experiences.map((e) => (
            <Link
              key={e.key}
              href={`/${locale}${e.href}`}
              className="kia-floaty relative overflow-hidden rounded-3xl group h-56 flex flex-col justify-end p-6 text-white shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${e.grad}`} />
              <div className="absolute inset-0 opacity-20 text-[10rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                {e.emoji}
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-1">{e.title}</h3>
                <p className="text-sm text-white/85 mb-3">{e.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Discover <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
          </div>
          <PrayerTimesWidget locale={locale} />
        </div>
      </section>

      {/* Info bar */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="kia-glass rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
          {[
            { Icon: MapPin, label: "Location", value: "Kuwait City, Kuwait" },
            { Icon: Phone, label: "Information", value: "+965 2434 5555" },
            { Icon: Clock, label: "Airport Hours", value: "24 / 7" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0057a8] to-[#2e9bd6] flex items-center justify-center text-white shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-bold text-white">{label}</p>
              <p className="text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomeContent locale={locale} />;
}
