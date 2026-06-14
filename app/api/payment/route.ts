import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/myfatoorah";

export const revalidate = 0;

type Body = {
  amount: number;
  customerName: string;
  customerMobile?: string;
  description: string;
  locale: string;
  callbackPath: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!body.customerName?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const origin = req.nextUrl.origin;
    const locale = body.locale === "ar" ? "ar" : "en";
    const reference = `KIA-${Date.now()}`;
    const callbackUrl = `${origin}${body.callbackPath}`;

    const result = await createPayment({
      amount: body.amount,
      customerName: body.customerName.trim(),
      customerMobile: body.customerMobile,
      description: body.description,
      locale,
      callbackUrl,
      reference,
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "payment_failed" },
      { status: 500 }
    );
  }
}
