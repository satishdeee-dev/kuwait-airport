import PageHero from "@/components/airport/PageHero";

const sections = [
  {
    title: "Departing Passengers",
    icon: "✈️",
    items: ["Check-in procedures (2-3 hours before departure)", "Baggage allowances and restricted items", "Immigration & passport control", "Security screening procedures", "Boarding gate information", "Duty-free shopping"],
  },
  {
    title: "Arriving Passengers",
    icon: "🛬",
    items: ["Passport control / Immigration", "Baggage claim", "Customs declaration", "Health & quarantine requirements", "Meet & greet services", "Ground transportation options"],
  },
  {
    title: "General Links",
    icon: "🔗",
    items: ["Visa on Arrival information", "Customs regulations", "Prohibited items list", "Travel insurance", "Currency exchange", "Tourist information"],
  },
];

export default function PassengerPage() {
  return (
    <>
      <PageHero image="/brand/ql/passenger.jpg" title="Passenger Information" subtitle="Everything you need for arrival, departure and transit" />
      <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <div key={s.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-4xl mb-3">{s.icon}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{s.title}</h2>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#003366] mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
