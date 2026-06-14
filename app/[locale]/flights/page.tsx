"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockArrivals = [
  { flightNo: "KU101", airline: "Kuwait Airways", origin: "London", scheduled: "08:30", status: "landed", terminal: "T4", gate: "A12" },
  { flightNo: "EK201", airline: "Emirates", origin: "Dubai", scheduled: "09:15", status: "onTime", terminal: "T4", gate: "B3" },
  { flightNo: "QR302", airline: "Qatar Airways", origin: "Doha", scheduled: "10:00", status: "delayed", terminal: "T4", gate: "C7" },
  { flightNo: "TK410", airline: "Turkish Airlines", origin: "Istanbul", scheduled: "11:30", status: "landed", terminal: "T4", gate: "A5" },
  { flightNo: "LH520", airline: "Lufthansa", origin: "Frankfurt", scheduled: "13:45", status: "onTime", terminal: "T4", gate: "D2" },
];

const mockDepartures = [
  { flightNo: "KU102", airline: "Kuwait Airways", destination: "Cairo", scheduled: "08:00", status: "departed", terminal: "T4", gate: "A1" },
  { flightNo: "FZ210", airline: "flydubai", destination: "Dubai", scheduled: "09:30", status: "boarding", terminal: "T4", gate: "B8" },
  { flightNo: "SV340", airline: "Saudia", destination: "Riyadh", scheduled: "10:15", status: "onTime", terminal: "T4", gate: "C4" },
  { flightNo: "MS450", airline: "EgyptAir", destination: "Cairo", scheduled: "12:00", status: "delayed", terminal: "T4", gate: "A9" },
  { flightNo: "BA600", airline: "British Airways", destination: "London", scheduled: "14:30", status: "onTime", terminal: "T4", gate: "D6" },
];

const mockTransit = [
  { flightNo: "EK502", airline: "Emirates", origin: "New York", destination: "Dubai", scheduled: "07:00", status: "onTime", terminal: "T4" },
  { flightNo: "QR810", airline: "Qatar Airways", origin: "Bangkok", destination: "Doha", scheduled: "09:45", status: "landed", terminal: "T4" },
];

const statusColors: Record<string, string> = {
  landed: "bg-green-100 text-green-700",
  departed: "bg-blue-100 text-blue-700",
  delayed: "bg-red-100 text-red-700",
  onTime: "bg-green-100 text-green-700",
  boarding: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-gray-100 text-gray-700",
};

export default function FlightsPage() {
  const t = useTranslations("flights");
  const [search, setSearch] = useState("");

  const filter = (list: { flightNo: string; airline: string }[]) =>
    search ? list.filter((f) => f.flightNo.toLowerCase().includes(search.toLowerCase()) || f.airline.toLowerCase().includes(search.toLowerCase())) : list;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("title")}</h1>

      <input
        type="text"
        placeholder="Search flight number or airline..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
      />

      <Tabs defaultValue="arrivals">
        <TabsList className="mb-4">
          <TabsTrigger value="arrivals">{t("arrivals")}</TabsTrigger>
          <TabsTrigger value="departures">{t("departures")}</TabsTrigger>
          <TabsTrigger value="transit">{t("transit")}</TabsTrigger>
        </TabsList>

        <TabsContent value="arrivals">
          <FlightTable rows={filter(mockArrivals)} type="arrival" t={t} />
        </TabsContent>
        <TabsContent value="departures">
          <FlightTable rows={filter(mockDepartures)} type="departure" t={t} />
        </TabsContent>
        <TabsContent value="transit">
          <FlightTable rows={filter(mockTransit)} type="transit" t={t} />
        </TabsContent>
      </Tabs>

      <p className="text-xs text-gray-400 mt-6">* Live flight data integration with DGCA systems pending API access.</p>
    </div>
  );
}

function FlightTable({ rows, type, t }: { rows: Record<string, string>[]; type: string; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-[#003366] text-white">
          <tr>
            <th className="px-4 py-3 text-left">{t("flightNo")}</th>
            <th className="px-4 py-3 text-left">{t("airline")}</th>
            {type === "arrival" && <th className="px-4 py-3 text-left">{t("origin")}</th>}
            {type === "departure" && <th className="px-4 py-3 text-left">{t("destination")}</th>}
            {type === "transit" && <><th className="px-4 py-3 text-left">{t("origin")}</th><th className="px-4 py-3 text-left">{t("destination")}</th></>}
            <th className="px-4 py-3 text-left">{t("scheduled")}</th>
            <th className="px-4 py-3 text-left">{t("terminal")}</th>
            {type !== "transit" && <th className="px-4 py-3 text-left">{t("gate")}</th>}
            <th className="px-4 py-3 text-left">{t("status")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-mono font-semibold">{row.flightNo}</td>
              <td className="px-4 py-3">{row.airline}</td>
              {type === "arrival" && <td className="px-4 py-3">{row.origin}</td>}
              {type === "departure" && <td className="px-4 py-3">{row.destination}</td>}
              {type === "transit" && <><td className="px-4 py-3">{row.origin}</td><td className="px-4 py-3">{row.destination}</td></>}
              <td className="px-4 py-3 font-mono">{row.scheduled}</td>
              <td className="px-4 py-3">{row.terminal}</td>
              {type !== "transit" && <td className="px-4 py-3">{row.gate}</td>}
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status] || ""}`}>
                  {t(row.status as "landed")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
