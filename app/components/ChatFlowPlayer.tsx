"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === Tipos ===
export type Msg = {
  from: "in" | "out";
  text?: string;
  time?: string;
  typing?: boolean; // burbuja de "escribiendo..."
  delay?: number;   // ms antes de revelar este mensaje (si no se da, usa 1200)
  check?: "sent" | "delivered" | "read"; // doble check
};

export type ChatFlowProps = {
  scenario: Msg[];
  baseDelayMs?: number; // fallback delay
  loop?: boolean;
};

// === Componente ===
const ChatFlowPlayer: React.FC<ChatFlowProps> = ({
  scenario,
  baseDelayMs = 1200,
  loop = true,
}) => {
  const [visible, setVisible] = useState<Msg[]>([]);

  useEffect(() => {
    let cancelled = false;
    setVisible([]);

    async function play() {
      for (let i = 0; i < scenario.length; i++) {
        const step = scenario[i];
        const wait = step.delay ?? baseDelayMs;
        await new Promise((r) => setTimeout(r, wait));
        if (cancelled) return;
        setVisible((v) => [...v, step]);
      }
      if (loop && !cancelled) {
        // pequeña pausa y reinicio
        await new Promise((r) => setTimeout(r, 2000));
        if (!cancelled) {
          setVisible([]);
          play();
        }
      }
    }

    play();
    return () => {
      cancelled = true;
    };
  }, [scenario, baseDelayMs, loop]);

  // Render de checks estilo WhatsApp
  const Checks = ({ state }: { state?: Msg["check"] }) => {
    if (!state) return null;
    const color =
      state === "read" ? "#34B7F1" : state === "delivered" ? "#9aa6b2" : "#9aa6b2";
    return (
      <svg viewBox="0 0 24 24" className="h-3 w-3">
        <path fill={color} d="M1 13l3-3 4 4 10-10 3 3L8 21z" />
        <path
          fill={color}
          opacity={state === "sent" ? 0 : 1}
          d="M5 13l3-3 4 4"
        />
      </svg>
    );
  };

  return (
    // Este contenedor está diseñado para ir "encima" de la imagen del teléfono
    <div className="absolute inset-0 px-3 pt-16 pb-10 overflow-hidden pointer-events-none">
      <div className="space-y-3 text-[13px]">
        <AnimatePresence initial={false}>
          {visible.map((m, i) => {
            const isOut = m.from === "out";
            // Burbuja "escribiendo..."
            if (m.typing) {
              return (
                <motion.div
                  key={`typing-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[78%] px-3 py-2 rounded-2xl bg-[#1f1f1f] text-neutral-300 rounded-tl-sm">
                    <div className="flex gap-1">
                      <Dot /><Dot delay={120} /><Dot delay={240} />
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isOut ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] px-3 py-2 rounded-2xl shadow ${
                    isOut
                      ? "bg-[#25D366] text-white rounded-tr-sm"
                      : "bg-[#1f1f1f] text-neutral-200 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                  <div className="mt-1 flex items-center gap-1 text-[10px]">
                    <span className={isOut ? "text-white/90" : "text-neutral-400"}>
                      {m.time}
                    </span>
                    {isOut && <Checks state={m.check} />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Dot = ({ delay = 0 }: { delay?: number }) => (
  <motion.span
    className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400"
    initial={{ opacity: 0.2 }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ repeat: Infinity, duration: 1, delay }}
  />
);

export default ChatFlowPlayer;
