"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function LostFoundPage() {
  const t = useTranslations("lostFound");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("title")}</h1>
      <p className="text-gray-500 mb-8">{t("subtitle")}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
        <strong>Lost & Found Office:</strong> Located at Arrivals Hall, Terminal 4 — Ground Floor<br />
        <strong>Phone:</strong> +965 2434 5600 | <strong>Hours:</strong> 8:00 AM – 10:00 PM
      </div>

      {submitted ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Your report has been submitted. Our team will contact you within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-lg">{t("report")}</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("itemType")}</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
              <option value="">Select item type</option>
              <option>Luggage / Bag</option>
              <option>Electronics</option>
              <option>Documents / Passport</option>
              <option>Clothing</option>
              <option>Jewelry / Accessories</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("description")}</label>
            <textarea required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] resize-none" placeholder="Describe the item in detail..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("location")}</label>
            <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" placeholder="e.g. Gate A12, check-in area, taxi rank..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact")}</label>
            <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" placeholder="Name, phone, and email" />
          </div>

          <button type="submit" className="w-full py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004488] transition-colors">
            {t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
