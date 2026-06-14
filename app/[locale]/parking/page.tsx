const parkingZones = [
  { zone: "P1 – Short Stay", rate: "KD 0.500 / hour", max: "KD 5.000 / day", distance: "2 min walk", available: 142 },
  { zone: "P2 – Long Stay", rate: "KD 0.250 / hour", max: "KD 2.500 / day", distance: "5 min shuttle", available: 387 },
  { zone: "P3 – Economy", rate: "KD 0.150 / hour", max: "KD 1.500 / day", distance: "10 min shuttle", available: 612 },
  { zone: "VIP Parking", rate: "KD 1.000 / hour", max: "KD 10.000 / day", distance: "1 min walk", available: 28 },
];

const rentalCompanies = [
  { name: "Avis", phone: "+965 2247 1888", location: "Arrivals Hall" },
  { name: "Hertz", phone: "+965 2247 3333", location: "Arrivals Hall" },
  { name: "Budget", phone: "+965 2247 2222", location: "Arrivals Hall" },
  { name: "Europcar", phone: "+965 2247 4444", location: "Arrivals Hall" },
  { name: "Sixt", phone: "+965 2247 5555", location: "Arrivals Hall" },
];

import PageHero from "@/components/airport/PageHero";

export default function ParkingPage() {
  return (
    <>
      <PageHero image="/brand/ql/parking.jpg" title="Car Rental & Parking Services" subtitle="Parking zones, rates and rental companies" />
      <div className="max-w-4xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Parking Zones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parkingZones.map((p) => (
            <div key={p.zone} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{p.zone}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.available > 100 ? "bg-green-100 text-green-700" : p.available > 20 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                  {p.available} spaces
                </span>
              </div>
              <p className="text-sm text-gray-600">Rate: <span className="font-medium">{p.rate}</span></p>
              <p className="text-sm text-gray-600">Daily max: <span className="font-medium">{p.max}</span></p>
              <p className="text-sm text-gray-500 mt-1">🚶 {p.distance} to terminal</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Car Rental Companies</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#003366] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rentalCompanies.map((c) => (
                <tr key={c.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{c.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </div>
    </>
  );
}
