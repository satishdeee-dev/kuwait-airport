const linkGroups = [
  {
    category: "Government",
    links: [
      { name: "General Authority of Civil Aviation (GACA)", url: "https://www.dgca.gov.kw" },
      { name: "Kuwait Ministry of Interior", url: "https://www.moi.gov.kw" },
      { name: "Kuwait Ministry of Foreign Affairs", url: "https://www.mofa.gov.kw" },
      { name: "Kuwait Customs", url: "https://www.customs.gov.kw" },
    ],
  },
  {
    category: "Airlines",
    links: [
      { name: "Kuwait Airways", url: "https://www.kuwaitairways.com" },
      { name: "Jazeera Airways", url: "https://www.jazeeraairways.com" },
      { name: "Emirates", url: "https://www.emirates.com" },
      { name: "Qatar Airways", url: "https://www.qatarairways.com" },
    ],
  },
  {
    category: "Travel Services",
    links: [
      { name: "Kuwait Tourism", url: "#" },
      { name: "Kuwait Hotel Association", url: "#" },
      { name: "Kuwait Public Transport Company", url: "#" },
    ],
  },
];

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Internal & External Links</h1>
      <div className="space-y-8">
        {linkGroups.map((g) => (
          <div key={g.category}>
            <h2 className="text-lg font-bold text-gray-700 mb-3">{g.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.links.map((l) => (
                <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#003366] transition-all text-sm font-medium text-gray-700 group">
                  <span className="text-[#003366] group-hover:scale-110 transition-transform">🔗</span>
                  {l.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
