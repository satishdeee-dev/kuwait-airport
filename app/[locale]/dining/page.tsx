const venues = [
  { name: "Al Farooj Restaurant", type: "Restaurant", cuisine: "Kuwaiti / Arabic", level: "Level 2", hours: "6:00 – 24:00" },
  { name: "McDonald's", type: "Fast Food", cuisine: "American", level: "Level 1", hours: "24/7" },
  { name: "Starbucks", type: "Café", cuisine: "Coffee & Snacks", level: "Level 1 & 2", hours: "24/7" },
  { name: "Burger King", type: "Fast Food", cuisine: "American", level: "Level 1", hours: "24/7" },
  { name: "Subway", type: "Fast Food", cuisine: "Sandwiches", level: "Level 1", hours: "6:00 – 22:00" },
  { name: "Duty Free Kuwait", type: "Shopping", cuisine: "Perfumes, Electronics, Food", level: "Departure", hours: "24/7" },
  { name: "The Body Shop", type: "Shopping", cuisine: "Beauty & Skincare", level: "Departure", hours: "5:00 – 24:00" },
  { name: "Boutique Rouge", type: "Shopping", cuisine: "Fashion & Accessories", level: "Departure", hours: "5:00 – 24:00" },
  { name: "Book Corner", type: "Shopping", cuisine: "Books, Gifts, Magazines", level: "Level 1", hours: "6:00 – 22:00" },
  { name: "Executive Lounge", type: "Lounge", cuisine: "Premium dining & drinks", level: "Level 3", hours: "24/7" },
];

const typeColors: Record<string, string> = {
  Restaurant: "bg-orange-100 text-orange-700",
  "Fast Food": "bg-yellow-100 text-yellow-700",
  Café: "bg-brown-100 text-amber-700",
  Shopping: "bg-purple-100 text-purple-700",
  Lounge: "bg-blue-100 text-blue-700",
};

import PageHero from "@/components/airport/PageHero";

export default function DiningPage() {
  return (
    <>
      <PageHero image="/brand/ql/dining.jpg" title="Restaurants, Shopping & Relaxation" subtitle="Dining, duty-free and lounges across the terminal" />
      <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {venues.map((v) => (
          <div key={v.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800">{v.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[v.type] || "bg-gray-100 text-gray-600"}`}>{v.type}</span>
            </div>
            <p className="text-sm text-gray-600">{v.cuisine}</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>📍 {v.level}</span>
              <span>🕐 {v.hours}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
