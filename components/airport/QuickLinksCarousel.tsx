"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

type Item = { key: string; href: string };

const ITEMS: Item[] = [
  { key: "flights", href: "/flights" },
  { key: "passenger", href: "/passenger" },
  { key: "services", href: "/services" },
  { key: "transport", href: "/transport" },
  { key: "carRental", href: "/car-rental" },
  { key: "parking", href: "/parking" },
  { key: "dining", href: "/dining" },
  { key: "lostFound", href: "/lost-found" },
  { key: "visa", href: "/visa" },
  { key: "complaints", href: "/complaints" },
  { key: "media", href: "/media" },
  { key: "vip", href: "/vip" },
  { key: "guidance", href: "/guidance" },
];

export default function QuickLinksCarousel({ locale }: { locale: string }) {
  const n = useTranslations("nav");

  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const slides = [...ITEMS, ...ITEMS];

  return (
    <div className="kia-marquee-mask overflow-hidden py-2">
      <div className="kia-marquee flex gap-5 w-max">
        {slides.map((item, i) => {
          const isClone = i >= ITEMS.length;
          return (
            <Link
              key={`${item.key}-${i}`}
              href={`/${locale}${item.href}`}
              aria-hidden={isClone || undefined}
              tabIndex={isClone ? -1 : undefined}
              className="relative shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg group/card"
            >
              <Image
                src={`/brand/ql/${item.key}.jpg`}
                alt={n(item.key)}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/95 via-[#002b5c]/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-bold leading-tight drop-shadow">{n(item.key)}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/90 opacity-0 -translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
