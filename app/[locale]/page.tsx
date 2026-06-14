import { useTranslations } from "next-intl";
import Link from "next/link";
import { Plane, Search, Clock, MapPin, Phone } from "lucide-react";

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const n = useTranslations("nav");

  const quickLinks = [
    { key: "flights", href: "/flights", icon: "✈️", color: "bg-blue-600" },
    { key: "passenger", href: "/passenger", icon: "👤", color: "bg-green-600" },
    { key: "services", href: "/services", icon: "🏢", color: "bg-purple-600" },
    { key: "transport", href: "/transport", icon: "🚌", color: "bg-orange-600" },
    { key: "parking", href: "/parking", icon: "🚗", color: "bg-red-600" },
    { key: "dining", href: "/dining", icon: "🍽️", color: "bg-yellow-600" },
    { key: "lostFound", href: "/lost-found", icon: "🔍", color: "bg-teal-600" },
    { key: "prayer", href: "/prayer", icon: "🕌", color: "bg-emerald-600" },
    { key: "weather", href: "/weather", icon: "☀️", color: "bg-sky-600" },
    { key: "visa", href: "/visa", icon: "📋", color: "bg-indigo-600" },
    { key: "complaints", href: "/complaints", icon: "💬", color: "bg-pink-600" },
    { key: "media", href: "/media", icon: "📰", color: "bg-gray-600" },
    { key: "vip", href: "/vip", icon: "⭐", color: "bg-amber-600" },
    { key: "guidance", href: "/guidance", icon: "🗺️", color: "bg-cyan-600" },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="kia-hero kia-dots relative text-white px-4 pt-20 pb-28 overflow-hidden">
        {/* Floating planes */}
        <Plane className="absolute top-16 left-[8%] w-8 h-8 text-white/20 kia-fly" />
        <Plane className="absolute top-28 left-[40%] w-6 h-6 text-white/15 kia-fly" style={{ animationDelay: "2s" }} />
        <Plane className="absolute top-20 left-[70%] w-10 h-10 text-white/10 kia-fly" style={{ animationDelay: "4s" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-5">
            <div className="kia-float w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/30">
              <Plane className="w-11 h-11" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight kia-rise">{t("title")}</h1>
          <p className="text-xl md:text-2xl text-white/85 mb-10 kia-rise" style={{ animationDelay: "0.1s" }}>
            {t("subtitle")}
          </p>

          <form
            action={`/${locale}/flights`}
            className="kia-glass flex flex-col sm:flex-row gap-2 p-2 rounded-2xl max-w-2xl mx-auto kia-rise"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center flex-1 gap-2 px-4">
              <Search className="w-5 h-5 text-[#0057a8] shrink-0" />
              <input
                name="q"
                type="text"
                placeholder={t("searchPlaceholder")}
                className="flex-1 bg-transparent py-3 text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3 bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center shadow-lg"
            >
              {t("searchButton")}
            </button>
          </form>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%201440%2048%22%20preserveAspectRatio=%22none%22%3E%3Cpath%20fill=%22%23f4f8fc%22%20d=%22M0,48L1440,48L1440,16C1080,40%20360,40%200,16Z%22/%3E%3C/svg%3E')] bg-cover" />
      </section>

      {/* Quick flight status */}
      <section className="-mt-6 relative z-20">
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {["arrivals", "departures", "transit"].map((type, i) => (
            <Link
              key={type}
              href={`/${locale}/flights?tab=${type}`}
              className="kia-glass kia-card-hover flex items-center gap-2 px-6 py-3 rounded-full text-[#002b5c] text-sm font-semibold kia-rise"
              style={{ animationDelay: `${0.3 + i * 0.05}s` }}
            >
              <Clock className="w-4 h-4 text-[#0057a8]" />
              {t(type as "arrivals" | "departures" | "transit")}
            </Link>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#002b5c] mb-2">{t("quickLinks")}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0057a8] to-[#2e9bd6] rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickLinks.map((link, i) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="kia-glass kia-card-hover flex flex-col items-center gap-3 p-5 rounded-2xl text-center group kia-rise"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {link.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700 leading-tight">{n(link.key)}</span>
            </Link>
          ))}
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
              <p className="font-bold text-[#002b5c]">{label}</p>
              <p className="text-gray-600">{value}</p>
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
