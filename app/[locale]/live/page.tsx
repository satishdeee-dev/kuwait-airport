import LiveMapClient from "@/components/airport/LiveMapClient";
import { Radar } from "lucide-react";

export default function LivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-red-500 text-white">
          <span className="absolute inset-0 rounded-2xl bg-red-500 kia-pulse-ring" />
          <Radar className="w-6 h-6 relative" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-[#002b5c] flex items-center gap-2">
            Live Flight Radar
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 kia-blip" />
          </h1>
          <p className="text-gray-500 text-sm">Real-time aircraft over Kuwait airspace · updates every 15s</p>
        </div>
      </div>

      <div className="mt-6">
        <LiveMapClient />
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Live aircraft positions provided by the OpenSky Network. Coverage depends on ADS-B receiver availability and may be limited.
        On production this will be replaced by the certified DGCA flight-data feed.
      </p>
    </div>
  );
}
