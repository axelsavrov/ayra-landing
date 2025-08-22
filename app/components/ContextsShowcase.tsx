"use client";

import Image from "next/image";

export default function ContextsShowcase() {
  const contexts = [
    {
      title: "Logistics Hubs",
      desc: "Ayra’s technology expands beyond healthcare. In logistics hubs, it orchestrates live ETAs, dock tasks, incidents and re-packaging; coordination between areas in seconds.",
      img: "/assets/phone/logistics.png",
      type: "laptop",
    },
    {
      title: "Healthcare — Ayra Connect",
      desc: "On-call staff, rounds, critical alerts, stock & internal requests — all seamlessly orchestrated inside WhatsApp.",
      img: "/assets/phone/health.png",
      type: "phone",
    },
    {
      title: "Airports",
      desc: "Crew paging, gate changes, handling coordination and real-time operations — Ayra becomes the conversational system for aviation.",
      img: "/assets/phone/airport.png",
      type: "phone",
    },
  ];

  return (
    <section className="relative w-full overflow-x-auto snap-x snap-mandatory">
      {/* Título principal estilo Apple */}
      <div className="text-center px-6 mt-20">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
          Ayra — Different Possibilities
        </h2>
      </div>

      {/* Carrusel horizontal */}
      <div className="flex w-full overflow-x-scroll no-scrollbar snap-x snap-mandatory mt-16">
        {contexts.map((c, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 snap-center flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Texto arriba */}
            <h3 className="text-4xl font-semibold">{c.title}</h3>
            <p className="mt-4 text-neutral-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {c.desc}
            </p>

            {/* Imagen */}
            <Image
              src={c.img}
              alt={c.title}
              width={c.type === "laptop" ? 1000 : 420}
              height={c.type === "laptop" ? 700 : 850}
              className="mx-auto mt-10 drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Indicadores (dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {contexts.map((_, i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-neutral-600 inline-block"
          />
        ))}
      </div>
    </section>
  );
}
