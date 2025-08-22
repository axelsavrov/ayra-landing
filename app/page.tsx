"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========================================================================
   Ayra Landing (tipo Apple)
   - Hero con video dentro de iPhone
   - Mini chat demo modal (con mensajes tipo WhatsApp)
   - Dark/Light toggle
   - Secciones: Modules, Roadmap, Testimonials, Founder
   - Trusted partners (logos)
   - Waitlist conectado a Formspree
   - Footer y botones flotantes
   ======================================================================== */

// ======================================================
// Main Component
// ======================================================
export default function AyraLanding() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [demoOpen, setDemoOpen] = useState(false);

  // Persistencia de tema en localStorage
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ayra-theme")) as
      | "dark"
      | "light"
      | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ayra-theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      className={[
        "min-h-screen font-[system-ui]",
        isDark ? "bg-black text-neutral-100" : "bg-white text-neutral-900",
      ].join(" ")}
    >
      {/* Header con toggle */}
      <Header isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />

      {/* Hero principal con video */}
      <Hero isDark={isDark} onOpenDemo={() => setDemoOpen(true)} />

      {/* Secciones principales */}
      <Modules isDark={isDark} />
      <Roadmap isDark={isDark} />
      <Testimonials isDark={isDark} />
      <Founder isDark={isDark} />
      <TrustedPartners isDark={isDark} />
      <Waitlist isDark={isDark} />

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Botones flotantes */}
      <FloatingButtons isDark={isDark} onOpenDemo={() => setDemoOpen(true)} />

      {/* Demo en modal */}
      <ChatDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} isDark={isDark} />
    </div>
  );
}

// ======================================================
// Header
// ======================================================
function Header({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const nav = [
    { label: "Modules", href: "#modules" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Founder", href: "#founder" },
    { label: "Waitlist", href: "#waitlist" },
  ];
  return (
    <header
      className={[
        "sticky top-0 z-40 border-b backdrop-blur-xl",
        isDark ? "border-white/10 bg-black/70" : "border-black/10 bg-white/70",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className={[
              "h-8 w-8 rounded-xl grid place-content-center text-sm font-bold",
              isDark ? "bg-white/10" : "bg-black/10",
            ].join(" ")}
          >
            A
          </div>
          <span className="font-semibold tracking-wide text-lg">Ayra</span>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={[
                "text-sm transition-colors",
                isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black",
              ].join(" ")}
            >
              {n.label}
            </a>
          ))}

          {/* Botón Toggle */}
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className={[
              "ml-3 rounded-xl border px-3 py-1 text-sm",
              isDark
                ? "border-white/20 bg-white/10 hover:bg-white/20"
                : "border-black/10 bg-black/5 hover:bg-black/10",
            ].join(" ")}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ======================================================
// Hero Section
// ======================================================
function Hero({ isDark, onOpenDemo }: { isDark: boolean; onOpenDemo: () => void }) {
  return (
    <section
      className={[
        "relative overflow-hidden",
        isDark ? "bg-gradient-to-b from-black via-neutral-900 to-black" : "bg-gradient-to-b from-white via-neutral-100 to-white",
      ].join(" ")}
    >
      {/* Glow background */}
      <div
        className={[
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(700px_400px_at_90%_10%,rgba(236,72,153,0.14),transparent)]"
            : "bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(56,189,248,0.20),transparent),radial-gradient(700px_400px_at_90%_10%,rgba(236,72,153,0.18),transparent)]",
        ].join(" ")}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        {/* Copy lado izquierdo */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05]">
            Ayra{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              redefines hospital experience
            </span>
          </h1>
          <p className={["mt-6 max-w-xl text-xl", isDark ? "text-neutral-300" : "text-neutral-600"].join(" ")}>
            One platform. Seamless workflows. Inside WhatsApp, Teams, Messenger & Slack.
            No new apps, no friction.
          </p>
          <ul className={["mt-8 space-y-3", isDark ? "text-neutral-300" : "text-neutral-700"].join(" ")}>
            <li>• Find on-call staff instantly.</li>
            <li>• Check pharmacy stock in real time.</li>
            <li>• Broadcast hospital-wide updates in one tap.</li>
            <li>• Analytics that matter — right inside the chat.</li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#waitlist" className={["rounded-2xl px-6 py-3 text-lg font-semibold hover:shadow-xl transition", isDark ? "bg-white text-black" : "bg-black text-white"].join(" ")}>
              ⚡ Request Access
            </a>
            <button onClick={onOpenDemo} className={["rounded-2xl border px-6 py-3 text-lg font-semibold transition", isDark ? "border-white/20 text-neutral-200 hover:bg-white/10" : "border-black/20 text-neutral-800 hover:bg-black/5"].join(" ")}>
              💬 Try Ayra demo
            </button>
          </div>
        </motion.div>

        {/* iPhone mock con video */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} viewport={{ once: true }} className="relative mx-auto w-[88%] md:w-[520px]">
          <div className={["relative rounded-[48px] border overflow-hidden", isDark ? "border-white/10 bg-black" : "border-black/10 bg-neutral-50", "shadow-[0_30px_120px_rgba(0,0,0,0.45)]"].join(" ")}>
            <div className={["absolute left-1/2 -translate-x-1/2 top-3 h-6 w-40 rounded-full", isDark ? "bg-black" : "bg-neutral-200"].join(" ")} />
            <div className="pt-9">
              <HeroVideoFallback isDark={isDark} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroVideoFallback({ isDark }: { isDark: boolean }) {
  const [videoOk, setVideoOk] = useState(true);
  return videoOk ? (
    <video className="w-full h-auto" src="/assets/hero-chat.mp4" autoPlay muted playsInline loop onError={() => setVideoOk(false)} />
  ) : (
    <Image src="/assets/hero-phone.png" alt="Ayra demo phone" width={1000} height={1800} className="w-full h-auto" priority />
  );
}

// ======================================================
// Chat Demo Modal (con fix para Vercel)
// ======================================================
type ChatMsg = { role: "user" | "ayra"; content: string };

function ChatDemoModal({ open, onClose, isDark }: { open: boolean; onClose: () => void; isDark: boolean }) {
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: "ayra", content: "Hi! I’m Ayra. Ask me anything about your hospital workflows." }]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // FIX aplicado aquí
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const next: ChatMsg[] = [...messages, { role: "user", content: text } as ChatMsg];
    setMessages(next);
    setInput("");

    setTimeout(() => {
      const reply = simulateAyra(text);
      setMessages((prev: ChatMsg[]) => [...prev, { role: "ayra", content: reply } as ChatMsg]);
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className={["relative w-[92%] max-w-2xl rounded-3xl overflow-hidden border", isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/10"].join(" ")}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="font-semibold">Ayra — Live Demo</div>
              <button onClick={onClose} className={["rounded-lg px-3 py-1 text-sm", isDark ? "hover:bg-white/10" : "hover:bg-black/5"].join(" ")}>Close</button>
            </div>
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto px-6 py-6 space-y-3">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className={["max-w-[80%] rounded-2xl px-5 py-3 shadow-md", m.role === "user" ? "ml-auto bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white" : isDark ? "bg-white/10 border border-white/10 text-neutral-200" : "bg-black/5 border border-black/10 text-neutral-800"].join(" ")}>
                  <span className="text-sm leading-relaxed">{m.content}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className={["flex-1 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2", isDark ? "bg-neutral-900 border border-white/10 focus:ring-cyan-400" : "bg-white border border-black/10 focus:ring-cyan-600"].join(" ")} placeholder='Try: "Who is on call in Neurosurgery?"' />
                <button onClick={handleSend} className={["rounded-2xl px-5 py-3 font-semibold", isDark ? "bg-white text-black" : "bg-black text-white"].join(" ")}>Send</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function simulateAyra(q: string) {
  const lc = q.toLowerCase();
  if (lc.includes("on call") && lc.includes("neuro")) {
    return "On-call in Neurosurgery: Dr. Ortega until 18:00, then Dr. Marín (18:00–08:00). I can page them if you want.";
  }
  if (lc.includes("pharmacy") || lc.includes("stock")) {
    return "Pharmacy: midazolam 12 vials, ceftriaxone 24 vials, insulin 8 pens. Would you like to reorder?";
  }
  if (lc.includes("eta") || lc.includes("logistics")) {
    return "Logistics Hub: AMT-172 unloading at Gate 3, ETA 12 min. Dock B is free.";
  }
  return "Got it. I’ll route that to the right module and follow up.";
}
