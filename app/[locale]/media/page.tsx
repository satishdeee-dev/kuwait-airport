import { useTranslations } from "next-intl";
import PageHero from "@/components/airport/PageHero";

const news = [
  { title: "Kuwait Airport Exceeds 10 Million Passenger Milestone in 2024", date: "2024-12-15", category: "News" },
  { title: "New Terminal Expansion Project Breaks Ground", date: "2024-11-20", category: "News" },
  { title: "Kuwait Airways Launches New Direct Route to Tokyo", date: "2024-10-05", category: "Press Release" },
  { title: "Airport Implements New Smart Security Screening System", date: "2024-09-18", category: "News" },
  { title: "GACA Signs Partnership with International Aviation Authority", date: "2024-08-30", category: "Press Release" },
  { title: "Annual Air Show Scheduled for February 2025", date: "2024-08-01", category: "Events" },
];

export default function MediaPage() {
  const t = useTranslations("media");

  return (
    <>
      <PageHero image="/brand/ql/media.jpg" title={t("title")} subtitle="News, press releases, photos and videos" />
      <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-700 mb-4">{t("news")}</h2>
          <div className="space-y-3">
            {news.map((n) => (
              <div key={n.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.category === "News" ? "bg-blue-100 text-blue-700" : n.category === "Press Release" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                      {n.category}
                    </span>
                    <span className="text-xs text-gray-400">{n.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{n.title}</h3>
                </div>
                <span className="text-gray-400 text-lg">›</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-700 mb-4">{t("gallery")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm">
                Photo {i}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-700 mb-4">{t("videos")}</h2>
          <div className="space-y-3">
            {["Kuwait Airport Terminal Tour", "New Expansion Project Overview", "Passenger Guide Video"].map((v) => (
              <div key={v} className="bg-gray-100 rounded-lg h-20 flex items-center gap-3 px-4 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-3xl">▶️</span>
                <span className="text-sm font-medium text-gray-700">{v}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
