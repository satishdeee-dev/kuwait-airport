const options = [
  { name: "Taxi", icon: "🚕", desc: "Metered taxis available 24/7 at the arrivals exit. Average fare to Kuwait City center: KD 3-5.", tip: "Use licensed airport taxis only." },
  { name: "Bus", icon: "🚌", desc: "Kuwait Public Transport Company operates regular routes to Kuwait City and suburbs.", tip: "Lines 13, 101, and 501 serve the airport." },
  { name: "Car Rental", icon: "🚗", desc: "Multiple international and local car rental companies operate from the arrivals hall.", tip: "Pre-book online for better rates." },
  { name: "Ride Hailing", icon: "📱", desc: "Careem and Uber operate pick-up zones near the arrivals exit.", tip: "Use designated app pick-up zones only." },
  { name: "Private Transfer", icon: "🚐", desc: "Pre-arranged hotel shuttles and limousine services available for all passengers.", tip: "Book in advance through your hotel." },
  { name: "Metro / Rail", icon: "🚇", desc: "Future Kuwait Metro will connect directly to the airport. Currently under construction.", tip: "Expected completion: 2027." },
];

import PageHero from "@/components/airport/PageHero";

export default function TransportPage() {
  return (
    <>
      <PageHero image="/brand/ql/transport.jpg" title="To & From the Airport" subtitle="Getting to and from Kuwait International Airport" />
      <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="space-y-4">
        {options.map((o) => (
          <div key={o.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-5">
            <span className="text-4xl">{o.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{o.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{o.desc}</p>
              <p className="text-[#003366] text-xs mt-2 font-medium">💡 {o.tip}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
