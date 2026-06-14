import { useTranslations } from "next-intl";

const services = [
  { icon: "⭐", title: "VIP Lounge", desc: "Exclusive lounge with premium dining, business facilities, and relaxation areas. Level 3, Terminal 4." },
  { icon: "🚗", title: "Chauffeur Service", desc: "Dedicated chauffeur-driven vehicles to/from the aircraft or terminal." },
  { icon: "⚡", title: "Fast Track Immigration", desc: "Dedicated immigration lanes for VIP passengers, bypassing regular queues." },
  { icon: "🧳", title: "Porter Service", desc: "Personal porter assistance with luggage from aircraft to vehicle." },
  { icon: "🍽️", title: "Private Dining", desc: "À la carte dining with international cuisine available exclusively in the VIP lounge." },
  { icon: "🛁", title: "Shower & Rest Facilities", desc: "Private shower suites and sleeping pods for long-haul travelers." },
  { icon: "💼", title: "Business Center", desc: "Private meeting rooms, high-speed internet, printing, and secretarial services." },
  { icon: "🛫", title: "Private Terminal", desc: "Fully separate terminal for charter and private aviation with no public access." },
];

const vipFlights = [
  { flightNo: "VP001", type: "Private Charter", origin: "London Luton", scheduled: "10:00", status: "Confirmed" },
  { flightNo: "VP002", type: "Royal Flight", origin: "Riyadh", scheduled: "14:30", status: "Confirmed" },
  { flightNo: "VP003", type: "Private Charter", origin: "Dubai", scheduled: "16:00", status: "On Request" },
];

export default function VIPPage() {
  const t = useTranslations("vip");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 bg-gradient-to-br from-[#003366] to-[#006699] text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-white/80">{t("subtitle")}</p>
        <div className="mt-4">
          <a href="tel:+96524345700" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
            📞 Book VIP Services: +965 2434 5700
          </a>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">VIP Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4">VIP Flight Schedule</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#003366] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Flight</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Origin</th>
                <th className="px-4 py-3 text-left">Scheduled</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vipFlights.map((f) => (
                <tr key={f.flightNo} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold">{f.flightNo}</td>
                  <td className="px-4 py-3">{f.type}</td>
                  <td className="px-4 py-3">{f.origin}</td>
                  <td className="px-4 py-3 font-mono">{f.scheduled}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${f.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
