// MyFatoorah payment helper.
//
// Runs in DEMO mode unless a real API key is configured. In demo mode it
// returns a local simulated checkout URL so the full booking flow works
// end-to-end without charging real money. To go live, set MYFATOORAH_API_KEY
// (and optionally MYFATOORAH_BASE_URL) in the environment.

const PLACEHOLDER = "your-myfatoorah-api-key";

export function isMyFatoorahLive(): boolean {
  const key = process.env.MYFATOORAH_API_KEY;
  return Boolean(key && key !== PLACEHOLDER && key.trim().length > 10);
}

export type CreatePaymentInput = {
  amount: number; // in KWD
  customerName: string;
  customerMobile?: string;
  description: string;
  locale: string;
  callbackUrl: string; // absolute URL to return to after payment
  reference: string;
};

export type CreatePaymentResult = {
  paymentUrl: string;
  invoiceId: string;
  demo: boolean;
};

export async function createPayment(
  input: CreatePaymentInput
): Promise<CreatePaymentResult> {
  if (!isMyFatoorahLive()) {
    // Demo: route the user to a local simulated MyFatoorah hosted page.
    const params = new URLSearchParams({
      amount: input.amount.toFixed(3),
      name: input.customerName,
      desc: input.description,
      ref: input.reference,
      callback: input.callbackUrl,
    });
    return {
      paymentUrl: `/${input.locale}/payment/demo?${params.toString()}`,
      invoiceId: input.reference,
      demo: true,
    };
  }

  // Live: call MyFatoorah ExecutePayment (hosted checkout).
  const baseUrl =
    process.env.MYFATOORAH_BASE_URL || "https://api.myfatoorah.com";
  const res = await fetch(`${baseUrl}/v2/ExecutePayment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      PaymentMethodId: 0,
      InvoiceValue: input.amount,
      CustomerName: input.customerName,
      CustomerMobile: input.customerMobile,
      CallBackUrl: input.callbackUrl,
      ErrorUrl: input.callbackUrl,
      Language: input.locale === "ar" ? "ar" : "en",
      CustomerReference: input.reference,
      UserDefinedField: input.description,
    }),
  });

  if (!res.ok) {
    throw new Error(`MyFatoorah ExecutePayment failed: ${res.status}`);
  }

  const data = (await res.json()) as {
    Data?: { PaymentURL?: string; InvoiceId?: number };
  };
  const paymentUrl = data.Data?.PaymentURL;
  if (!paymentUrl) throw new Error("MyFatoorah returned no PaymentURL");

  return {
    paymentUrl,
    invoiceId: String(data.Data?.InvoiceId ?? input.reference),
    demo: false,
  };
}
