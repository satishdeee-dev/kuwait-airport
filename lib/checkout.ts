export type CheckoutInput = {
  amount: number;
  customerName: string;
  customerMobile?: string;
  description: string;
  locale: string;
};

// Calls the payment API and redirects the browser to the (real or demo)
// MyFatoorah hosted checkout. Returns an error string on failure.
export async function startCheckout(input: CheckoutInput): Promise<string | null> {
  try {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        callbackPath: `/${input.locale}/payment/result`,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.paymentUrl) {
      return data.error || "Could not start payment.";
    }
    window.location.href = data.paymentUrl;
    return null;
  } catch {
    return "Network error. Please try again.";
  }
}
