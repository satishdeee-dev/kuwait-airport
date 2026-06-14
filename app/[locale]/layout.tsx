import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/airport/Navbar";
import Footer from "@/components/airport/Footer";

type Locale = "en" | "ar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className="dark">
      <body className="min-h-screen flex flex-col kia-page-bg text-slate-100">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
