import { NextResponse } from "next/server";

// Bounding box around Kuwait airspace
const BBOX = { lamin: 28.0, lomin: 46.0, lamax: 30.6, lomax: 49.2 };

type State = [
  string, string | null, string, number | null, number, number | null,
  number | null, number | null, boolean, number | null, number | null,
  number | null, number[] | null, number | null, string | null, boolean, number
];

export const revalidate = 0;

export async function GET() {
  const url = `https://opensky-network.org/api/states/all?lamin=${BBOX.lamin}&lomin=${BBOX.lomin}&lamax=${BBOX.lamax}&lomax=${BBOX.lomax}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return NextResponse.json({ flights: [], error: `OpenSky ${res.status}` }, { status: 200 });
    }

    const data = (await res.json()) as { time: number; states: State[] | null };
    const flights = (data.states ?? [])
      .filter((s) => s[5] != null && s[6] != null)
      .map((s) => ({
        id: s[0],
        callsign: (s[1] ?? "").trim() || "—",
        country: s[2],
        lng: s[5] as number,
        lat: s[6] as number,
        altitude: s[7] ?? s[13] ?? 0,
        onGround: s[8],
        velocity: s[9] ?? 0,
        heading: s[10] ?? 0,
        verticalRate: s[11] ?? 0,
      }));

    return NextResponse.json({ flights, time: data.time });
  } catch {
    return NextResponse.json({ flights: [], error: "fetch_failed" }, { status: 200 });
  }
}
