"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, CreditCard, Loader2 } from "lucide-react";

function DemoCheckout() {
  const params = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const amount = params.get("amount") ?? "0.000";
  const name = params.get("name") ?? "Guest";
  const desc = params.get("desc") ?? "Airport service";
  const ref = params.get("ref") ?? "";
  const callback = params.get("callback") ?? "/";

  const finish = (status: "success" | "failed") => {
    setProcessing(true);
    const url = new URL(callback);
    url.searchParams.set("status", status);
    url.searchParams.set("ref", ref);
    url.searchParams.set("amount", amount);
    url.searchParams.set("desc", desc);
    setTimeout(() => router.push(url.pathname + url.search), 1100);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md kia-card rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4" />
          Secure checkout · MyFatoorah (Demo)
        </div>

        <p className="text-slate-400 text-sm">{desc}</p>
        <p className="text-4xl font-bold text-white mt-1">
          KWD {amount}
        </p>
        <p className="text-xs text-slate-500 mt-1">Ref: {ref}</p>

        <div className="mt-6 space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Cardholder</label>
            <input
              defaultValue={name}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Card number</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <input
                defaultValue="4242 4242 4242 4242"
                className="flex-1 bg-transparent text-white text-sm focus:outline-none tracking-widest"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              defaultValue="12/28"
              placeholder="MM/YY"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              defaultValue="123"
              placeholder="CVV"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <button
          onClick={() => finish("success")}
          disabled={processing}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing…
            </>
          ) : (
            <>Pay KWD {amount}</>
          )}
        </button>
        <button
          onClick={() => finish("failed")}
          disabled={processing}
          className="mt-2 w-full py-2 rounded-xl text-slate-400 text-sm hover:text-slate-200 transition"
        >
          Cancel payment
        </button>

        <p className="text-[11px] text-slate-500 mt-4 text-center">
          Demo mode — no real payment is processed. Configure MYFATOORAH_API_KEY to go live.
        </p>
      </div>
    </div>
  );
}

export default function PaymentDemoPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <DemoCheckout />
    </Suspense>
  );
}
