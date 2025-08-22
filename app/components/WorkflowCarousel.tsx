"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

type Slide = {
  key: "health" | "logistics" | "airport";
  src: string;
  title: string;
  caption: string;
};

const SLIDES: Slide[] = [
  {
    key: "health",
    src: "/assets/phone/health.png",
    title: "Healthcare — Ayra Connect",
    caption:
      "On-call, rounds, critical alerts, stock & internal requests — todo dentro de WhatsApp.",
  },
  {
    key: "logistics",
    src: "/assets/phone/logistics.png",
    title: "Logistics hubs",
    caption:
      "ETAs en vivo, tareas de muelle, incidencias y reempaques; coordinación entre áreas en segundos.",
  },
  {
    key: "airport",
    src: "/assets/phone/airport.png",
    title: "Airports",
    caption:
      "Paginación de tripulaciones, cambios de puerta, coordinación con handling y operaciones.",
  },
];

export default function ContextsCarousel() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
   const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const controls = useDragControls();

  // Auto-play cada 6s
 useEffect(() => {
  if (!auto) {
    if (timer.current) clearInterval(timer.current);
    return;
  }
  if (timer.current) clearInterval(timer.current);

  timer.current = setInterval(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, 6000);

  return () => {
    if (timer.current) clearInterval(timer.current);
  };
}, [auto]);


  // Helpers
  const go = (i: number) => {
    setIndex(i);
  };
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section
      id="contexts"
      className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center"
    >
      {/* Copy */}
      <div className="text-left">
        <h2 className="text-5xl font-semibold">Ayra en diferentes contextos</h2>
        <p className="mt-3 text-neutral-400 text-lg">
          Un mismo cerebro conversacional, especializado para cada operación.
        </p>

        {/* título + caption de la slide actual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[index].key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            <div className="text-2xl font-medium">{SLIDES[index].title}</div>
            <div className="mt-2 text-neutral-300 max-w-xl">
              {SLIDES[index].caption}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => {
              setAuto(false);
              prev();
            }}
            className="rounded-xl border border-white/15 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
          >
            ◀︎
          </button>
          <button
            onClick={() => {
              setAuto(false);
              next();
            }}
            className="rounded-xl border border-white/15 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
          >
            ▶︎
          </button>

          <button
            onClick={() => setAuto((v) => !v)}
            className="ml-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
            aria-label={auto ? "Pausar autoplay" : "Reanudar autoplay"}
          >
            {auto ? "Pause" : "Play"}
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                setAuto(false);
                go(i);
              }}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir a ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Lado derecho: mock grande con swipe y micro-tilt */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[index].key}
            initial={{ opacity: 0, y: 12, rotateX: -6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -12, rotateX: 6 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative mx-auto w-[92%] md:w-[620px] lg:w-[640px] [perspective:2000px]"
          >
            {/* arrastrable para cambiar */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              dragControls={controls}
              onDragStart={() => setAuto(false)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                if (info.offset.x > 60) prev();
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <Image
                src={SLIDES[index].src}
                alt={SLIDES[index].title}
                width={1280}
                height={1600}
                priority
                className="w-full h-auto rounded-[2.2rem] shadow-[0_50px_160px_-20px_rgba(0,0,0,0.8)] select-none"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
