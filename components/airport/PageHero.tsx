import Image from "next/image";

export default function PageHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative h-60 md:h-72 flex items-end overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover kia-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/95 via-[#002b5c]/55 to-[#002b5c]/25" />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg kia-rise">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-white/85 text-base md:text-lg max-w-2xl kia-rise drop-shadow" style={{ animationDelay: "0.08s" }}>
            {subtitle}
          </p>
        )}
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-[#2e9bd6] to-white/70 rounded-full kia-rise" style={{ animationDelay: "0.16s" }} />
      </div>
    </section>
  );
}
