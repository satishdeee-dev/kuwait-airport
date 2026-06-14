const prayerTimes = [
  { name: "Fajr", arabic: "الفجر", time: "03:52 AM" },
  { name: "Sunrise", arabic: "الشروق", time: "05:20 AM" },
  { name: "Dhuhr", arabic: "الظهر", time: "11:52 AM" },
  { name: "Asr", arabic: "العصر", time: "03:18 PM" },
  { name: "Maghrib", arabic: "المغرب", time: "06:25 PM" },
  { name: "Isha", arabic: "العشاء", time: "07:55 PM" },
];

const prayerRooms = [
  { location: "Terminal 4 – Level 1", gender: "Men & Women (separate)", capacity: "50" },
  { location: "Terminal 4 – Level 2 (Departures)", gender: "Men & Women (separate)", capacity: "80" },
  { location: "Arrivals Hall", gender: "Men & Women (separate)", capacity: "30" },
  { location: "VIP Terminal", gender: "Men & Women (separate)", capacity: "20" },
];

export default function PrayerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Prayer Times</h1>
      <p className="text-gray-500 mb-8">Kuwait City — Today&apos;s Prayer Schedule</p>

      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {prayerTimes.map((p) => (
            <div key={p.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-lg font-arabic text-gray-500">{p.arabic}</p>
              <p className="font-semibold text-gray-800">{p.name}</p>
              <p className="text-[#003366] font-mono text-lg font-bold mt-1">{p.time}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">* Times are approximate. Please verify with Islamic Affairs Authority.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Prayer Rooms</h2>
        <div className="space-y-3">
          {prayerRooms.map((r) => (
            <div key={r.location} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <span className="text-3xl">🕌</span>
              <div>
                <p className="font-semibold text-gray-800">{r.location}</p>
                <p className="text-sm text-gray-600">{r.gender} · Capacity: {r.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
