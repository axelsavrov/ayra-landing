"use client";

import Image from "next/image";

export default function ContextsShowcase() {
  const contexts = [
    {
      title: "Healthcare — Ayra Connect",
      desc: "On-call staff, rounds, critical alerts, stock & internal requests — all inside WhatsApp.",
      img: "/assets/phone/health.png",
    },
    {
      title: "Logistics Hubs",
      desc: "Live ETAs, dock tasks, incidents and re-packaging; coordination between areas in seconds.",
      img: "/assets/phone/logistics.png",
    },
    {
      title: "Airports",
      desc: "Crew paging, gate changes, handling coordination and operations — right in the chat.",
      img: "/assets/phone/airport.png",
    },
  ];

  return (
    <section id="contexts" className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h2 className="text-5xl font-semibold">Ayra in Different Contexts</h2>
      <p className="mt-3 text-neutral-400 text-lg max-w-2xl mx-auto">
        One conversational brain, specialized for every operation.
      </p>

      {/* Grid with 3 items */}
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {contexts.map((c) => (
          <div
            key={c.title}
            className="flex flex-col items-center text-center gap-6"
          >
            <Image
              src={c.img}
              alt={c.title}
              width={320}
              height={640}
              className="rounded-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.7)] object-contain"
            />
            <div>
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-neutral-400 text-sm max-w-xs mx-auto">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

