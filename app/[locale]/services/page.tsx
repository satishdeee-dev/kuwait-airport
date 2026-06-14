const services = [
  { name: "First Aid & Medical Center", icon: "🏥", location: "Terminal 4, Ground Floor", hours: "24/7" },
  { name: "Banking & ATMs", icon: "🏦", location: "All terminals", hours: "24/7" },
  { name: "Currency Exchange", icon: "💱", location: "Arrival hall", hours: "24/7" },
  { name: "Post Office", icon: "📮", location: "Terminal 4, Level 1", hours: "8:00 – 20:00" },
  { name: "Business Center", icon: "💼", location: "Terminal 4, Level 2", hours: "6:00 – 22:00" },
  { name: "Left Luggage", icon: "🧳", location: "Arrival hall", hours: "24/7" },
  { name: "Baby Care Room", icon: "👶", location: "All terminals", hours: "24/7" },
  { name: "Disabled Services", icon: "♿", location: "Main entrance", hours: "24/7" },
  { name: "Chapel / Prayer Room", icon: "🕌", location: "Terminal 4, Level 2", hours: "24/7" },
  { name: "Pharmacy", icon: "💊", location: "Terminal 4, Level 1", hours: "6:00 – 24:00" },
  { name: "Tourist Information", icon: "ℹ️", location: "Arrival hall", hours: "8:00 – 22:00" },
  { name: "Wi-Fi", icon: "📶", location: "All areas", hours: "24/7 – Free" },
];

import PageHero from "@/components/airport/PageHero";

export default function ServicesPage() {
  return (
    <>
      <PageHero image="/brand/ql/services.jpg" title="Centers & Services" subtitle="Facilities and assistance throughout the airport" />
      <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-800">{s.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">📍 {s.location}</p>
              <p className="text-sm text-gray-500">🕐 {s.hours}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
