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
      <section className="bg-gradient-to-br from-[#003366] to-[#005599] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Plane className="w-16 h-16 opacity-80" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t("title")}</h1>
          <p className="text-xl text-white/80 mb-8">{t("subtitle")}</p>

          <form action={`/${locale}/flights`} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              name="q"
              type="text"
              placeholder={t("searchPlaceholder")}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#003366] font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
            >
              <Search className="w-4 h-4" />
              {t("searchButton")}
            </button>
          </form>
        </div>
      </section>

      {/* Quick flight status */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-center">
          {["arrivals", "departures", "transit"].map((type) => (
            <Link
              key={type}
              href={`/${locale}/flights?tab=${type}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003366] text-white text-sm font-medium hover:bg-[#004488] transition-colors"
            >
              <Clock className="w-4 h-4" />
              {t(type as "arrivals" | "departures" | "transit")}
            </Link>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t("quickLinks")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group"
            >
              <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 leading-tight">{n(link.key)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-[#003366]" />
            <p className="font-semibold">Location</p>
            <p className="text-gray-600">Kuwait City, Kuwait</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-6 h-6 text-[#003366]" />
            <p className="font-semibold">Information</p>
            <p className="text-gray-600">+965 2434 5555</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-[#003366]" />
            <p className="font-semibold">Airport Hours</p>
            <p className="text-gray-600">24 / 7</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomeContent locale={locale} />;
}
