const visaTypes = [
  { type: "Visa on Arrival", desc: "Available for nationals of 40+ countries. Duration: 30 days (renewable once).", fee: "KD 3", requirements: ["Valid passport (6+ months)", "Return ticket", "Hotel booking", "Sufficient funds"] },
  { type: "e-Visa", desc: "Apply online before travel through the Ministry of Interior portal.", fee: "KD 3", requirements: ["Online application", "Passport scan", "Photo", "Travel itinerary"] },
  { type: "GCC Residents", desc: "GCC residents from eligible nationalities may enter Kuwait visa-free.", fee: "Free", requirements: ["Valid GCC residence permit", "Valid passport"] },
  { type: "Transit Visa", desc: "For passengers transiting through Kuwait for up to 72 hours.", fee: "KD 1", requirements: ["Onward ticket", "Destination visa (if required)"] },
];

export default function VisaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Travel Visa Services</h1>
      <p className="text-gray-500 mb-8">Information on entry requirements and visa options for Kuwait</p>

      <div className="space-y-4 mb-8">
        {visaTypes.map((v) => (
          <div key={v.type} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-bold text-gray-800">{v.type}</h2>
              <span className="px-3 py-1 bg-[#003366] text-white rounded-full text-sm font-medium">{v.fee}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{v.desc}</p>
            <ul className="space-y-1">
              {v.requirements.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Note:</strong> Visa requirements change frequently. Always verify with the <a href="https://www.moi.gov.kw" target="_blank" rel="noopener noreferrer" className="underline">Kuwait Ministry of Interior</a> or your nearest Kuwait embassy before travel.
      </div>
    </div>
  );
}
