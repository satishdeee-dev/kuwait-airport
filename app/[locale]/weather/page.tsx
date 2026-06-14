import PageHero from "@/components/airport/PageHero";

export default function WeatherPage() {
  const forecast = [
    { day: "Today", icon: "☀️", high: 44, low: 32, condition: "Sunny", humidity: 18, wind: "NW 15 km/h" },
    { day: "Tomorrow", icon: "🌤️", high: 42, low: 30, condition: "Partly Cloudy", humidity: 22, wind: "N 12 km/h" },
    { day: "Wednesday", icon: "☀️", high: 45, low: 33, condition: "Sunny", humidity: 15, wind: "NW 20 km/h" },
    { day: "Thursday", icon: "🌫️", high: 40, low: 29, condition: "Dusty", humidity: 25, wind: "S 25 km/h" },
    { day: "Friday", icon: "☀️", high: 43, low: 31, condition: "Sunny", humidity: 17, wind: "NW 10 km/h" },
  ];

  return (
    <>
      <PageHero image="/brand/ql/weather.jpg" title="Weather Conditions" subtitle="Kuwait International Airport — Current & Forecast" />
      <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-br from-[#003366] to-[#0066cc] text-white rounded-2xl p-8 mb-8 text-center">
        <p className="text-6xl mb-2">☀️</p>
        <p className="text-7xl font-bold">44°C</p>
        <p className="text-xl mt-1 opacity-80">Sunny</p>
        <div className="flex justify-center gap-8 mt-6 text-sm opacity-80">
          <div><p>💧 Humidity</p><p className="font-semibold">18%</p></div>
          <div><p>💨 Wind</p><p className="font-semibold">NW 15 km/h</p></div>
          <div><p>👁️ Visibility</p><p className="font-semibold">10 km</p></div>
          <div><p>🌡️ Feels like</p><p className="font-semibold">48°C</p></div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-700 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-3">
        {forecast.map((f) => (
          <div key={f.day} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <p className="text-xs font-medium text-gray-500">{f.day}</p>
            <p className="text-3xl my-2">{f.icon}</p>
            <p className="text-sm font-bold text-gray-800">{f.high}°</p>
            <p className="text-xs text-gray-400">{f.low}°</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">* Weather data is indicative. For live data, integration with Kuwait Meteorological Department API required.</p>
      </div>
    </>
  );
}
