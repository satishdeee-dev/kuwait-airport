"use client";

import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("./LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[75vh] w-full rounded-3xl kia-glass flex items-center justify-center text-[#002b5c] font-medium">
      Loading live radar…
    </div>
  ),
});

export default function LiveMapClient() {
  return <LiveMap />;
}
