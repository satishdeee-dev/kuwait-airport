"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Home } from "lucide-react";

function Result({ locale }: { locale: string }) {
  const params = useSearchParams();
  const status = params.get("status") ?? "failed";
  const amount = params.get("amount");
  const ref = params.get("ref");
  const desc = params.get("desc");
  const ok = status === "success";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md kia-card rounded-3xl p-8 text-center">
        {ok ? (
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
        ) : (
          <XCircle className="w-16 h-16 text-red-400 mx-auto" />
        )}
        <h1 className="text-2xl font-bold text-white mt-4">
          {ok ? "Payment Successful" : "Payment Cancelled"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {ok
            ? "Your reservation is confirmed. A confirmation has been sent to you."
            : "No charge was made. You can try again from the booking page."}
        </p>

        {ok && (
          <div className="mt-6 text-left text-sm bg-white/5 rounded-xl p-4 space-y-1.5">
            {desc && (
              <div className="flex justify-between">
                <span className="text-slate-400">Service</span>
                <span className="text-white font-medium">{desc}</span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between">
                <span className="text-slate-400">Amount</span>
                <span className="text-white font-medium">KWD {amount}</span>
              </div>
            )}
            {ref && (
              <div className="flex justify-between">
                <span className="text-slate-400">Reference</span>
                <span className="text-white font-mono">{ref}</span>
              </div>
            )}
          </div>
        )}

        <Link
          href={`/${locale}`}
          className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <Result locale={locale} />
    </Suspense>
  );
}
