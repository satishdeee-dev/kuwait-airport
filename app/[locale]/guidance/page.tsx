const terminals = [
  {
    name: "Terminal 4 (International)",
    floors: [
      { level: "Ground Floor (Arrivals)", areas: ["Immigration / Passport Control", "Baggage Claim – Carousels 1-8", "Customs", "Arrivals Hall", "Lost & Found", "Car Rental Desks", "Taxi & Bus Zone"] },
      { level: "Level 1 (Departures)", areas: ["Check-in Counters A–F", "Security Screening", "Departure Lounge A", "Restaurants & Cafes", "Pharmacy", "Book Corner"] },
      { level: "Level 2 (Airside)", areas: ["Gates A1–A20", "Gates B1–B15", "Duty Free Shops", "Executive Lounge", "Prayer Rooms", "Smoking Area"] },
      { level: "Level 3 (VIP)", areas: ["VIP Lounge", "VIP Check-in", "VIP Immigration", "Business Center"] },
    ],
  },
];

import PageHero from "@/components/airport/PageHero";

export default function GuidancePage() {
  return (
    <>
      <PageHero image="/brand/ql/guidance.jpg" title="Airport Guidance" subtitle="Terminal maps and navigation guide" />
      <div className="max-w-5xl mx-auto px-4 py-10">
      {terminals.map((t) => (
        <div key={t.name} className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">{t.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.floors.map((f) => (
              <div key={f.level} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-[#003366] mb-3 text-sm uppercase tracking-wide">{f.level}</h3>
                <ul className="space-y-1.5">
                  {f.areas.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#003366] flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Interactive Map:</strong> A full interactive terminal map with real-time wayfinding will be integrated with the DGCA system. For assistance, visit the Information Desk at the Arrivals Hall.
      </div>
      </div>
    </>
  );
}
