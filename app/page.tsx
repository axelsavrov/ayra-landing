"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ======================= Headings con gradient ======================= */
function GradientH2({ text, size = "lg" }: { text: string; size?: "md" | "lg" }) {
  const sizes = { md: "text-4xl md:text-5xl", lg: "text-5xl md:text-6xl" }[size];
  return (
    <h2 className={`${sizes} font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent`}>
      {text}
    </h2>
  );
}
function GradientH3({ text }: { text: string }) {
  return (
    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
      {text}
    </h3>
  );
}

/* ======================= HERO helper (video fallback) ======================= */
function HeroVideoFallback() {
  const [videoOk, setVideoOk] = useState(true);
  return videoOk ? (
    <video
      className="w-full h-auto"
      src="/assets/hero-chat.mp4"
      autoPlay
      muted
      playsInline
      loop
      onError={() => setVideoOk(false)}
    />
  ) : (
    <Image
      src="/assets/hero-phone.png"
      alt="Ayra demo phone"
      width={1000}
      height={1800}
      className="w-full h-auto"
      priority
    />
  );
}

/* ======================= SECCIONES ======================= */

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

function Hero({ isDark, onOpenDemo }: { isDark: boolean; onOpenDemo: () => void }) {
  return (
    <section
      className={[
        "relative overflow-hidden",
        isDark ? "bg-gradient-to-b from-black via-neutral-900 to-black" : "bg-gradient-to-b from-white via-neutral-100 to-white",
      ].join(" ")}
    >
      {/* Glow */}
      <div
        className={[
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(700px_400px_at_90%_10%,rgba(236,72,153,0.14),transparent)]"
            : "bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(56,189,248,0.20),transparent),radial-gradient(700px_400px_at_90%_10%,rgba(236,72,153,0.18),transparent)]",
        ].join(" ")}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        {/* Copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.05]">
            Ayra{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              redefines hospital experience
            </span>
          </h1>

          <p
            className={[
              "mt-6 max-w-xl text-xl",
              isDark ? "text-neutral-300" : "text-neutral-600",
            ].join(" ")}
          >
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
            <a
              href="#waitlist"
              className={[
                "rounded-2xl px-6 py-3 text-lg font-semibold hover:shadow-xl transition",
                isDark ? "bg-white text-black" : "bg-black text-white",
              ].join(" ")}
            >
              ⚡ Request Access
            </a>

            <button
              onClick={onOpenDemo}
              className={[
                "rounded-2xl border px-6 py-3 text-lg font-semibold transition",
                isDark
                  ? "border-white/20 text-neutral-200 hover:bg-white/10"
                  : "border-black/20 text-neutral-800 hover:bg-black/5",
              ].join(" ")}
            >
              💬 Try Ayra demo
            </button>
          </div>
        </motion.div>

        {/* iPhone mock con video */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          viewport={{ once: true }}
          className="relative mx-auto w-[88%] md:w-[520px]"
        >
          <div
            className={[
              "relative rounded-[48px] border overflow-hidden",
              isDark ? "border-white/10 bg-black" : "border-black/10 bg-neutral-50",
              "shadow-[0_30px_120px_rgba(0,0,0,0.45)]",
            ].join(" ")}
          >
            {/* Notch */}
            <div
              className={[
                "absolute left-1/2 -translate-x-1/2 top-3 h-6 w-40 rounded-full",
                isDark ? "bg-black" : "bg-neutral-200",
              ].join(" ")}
            />
            {/* Video dentro del “dispositivo” */}
            <div className="pt-9">
              <HeroVideoFallback />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Modules({ isDark }: { isDark: boolean }) {
  const mods = [
    { name: "Connect", desc: "Real-time coordination in WhatsApp." },
    { name: "Wellness", desc: "Support doctors & residents’ mental health." },
    { name: "Insights", desc: "Analytics & trends for decision-makers." },
    { name: "Global", desc: "Seamless collaboration across regions." },
    { name: "Voice", desc: "Hands-free assistant for emergencies." },
    { name: "Flow", desc: "Automate workflows, reduce friction." },
  ];
  return (
    <section id="modules" className="mx-auto max-w-7xl px-6 py-28 text-center">
      <GradientH2 text="One brand. Six modules." size="lg" />
      <p className={["mt-3 text-lg tracking-wide", isDark ? "text-neutral-400" : "text-neutral-600"].join(" ")}>
        Endless possibilities.
      </p>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {mods.map((m) => (
          <motion.div
            key={m.name}
            whileHover={{ scale: 1.05 }}
            className={[
              "rounded-2xl p-8 flex flex-col items-center gap-4 transition",
              "border",
              isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-black/[0.03] hover:bg-black/[0.06]",
            ].join(" ")}
          >
            <Image src={`/assets/modules/${m.name.toLowerCase()}.png`} alt={`${m.name} logo`} width={72} height={72} />
            <div className="font-medium text-lg">Ayra {m.name}</div>
            <p className={isDark ? "text-sm text-neutral-400" : "text-sm text-neutral-600"}>{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Roadmap({ isDark }: { isDark: boolean }) {
  const steps = [
    { year: "2025", phase: "Build phase", desc: "Functional prototype in development." },
    { year: "2025", phase: "Pilot & feedback", desc: "50+ real scenarios tested in clinical rotations." },
    { year: "2026", phase: "Scale & expansion", desc: "Multi-country deployments from day one." },
  ];

  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-6 py-28 text-center">
      <GradientH2 text="Where are we now?" />
      <div className="mt-16 grid md:grid-cols-3 gap-10">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={[
              "rounded-3xl p-10 shadow-xl border",
              isDark ? "border-white/10 bg-gradient-to-b from-neutral-900 to-black" : "border-black/10 bg-gradient-to-b from-white to-neutral-100",
            ].join(" ")}
          >
            <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 grid place-items-center text-black font-bold text-lg">
              {i + 1}
            </div>
            <h3 className="text-xl font-semibold">
              {s.phase} <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>{s.year}</span>
            </h3>
            <p className={["mt-3 text-sm", isDark ? "text-neutral-300" : "text-neutral-700"].join(" ")}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ isDark }: { isDark: boolean }) {
  const quotes = [
    { text: "We’d have to test it and more, but it sounds potentially useful.", author: "Dr. Q — Neurosurgeon" },
    { text: "I would use it every day. Simple as that.", author: "Surgical Resident — Spain" },
    { text: "Feels like WhatsApp, but smarter for hospitals.", author: "Chief of Radiology — Mexico" },
  ];

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-28 text-center">
      <GradientH2 text="What Doctors Are Saying" />
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.55 }}
            viewport={{ once: true }}
            className={[
              "relative rounded-3xl border p-10 shadow-xl transition",
              isDark
                ? "bg-gradient-to-b from-neutral-900 to-black border-white/10 hover:scale-[1.02]"
                : "bg-gradient-to-b from-white to-neutral-100 border-black/10 hover:scale-[1.02]",
            ].join(" ")}
          >
            <p className={["text-xl md:text-2xl leading-relaxed font-light italic", isDark ? "text-neutral-200" : "text-neutral-800"].join(" ")}>
              “{q.text}”
            </p>
            <div className={["mt-6 text-sm font-medium", isDark ? "text-neutral-400" : "text-neutral-600"].join(" ")}>{q.author}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Founder({ isDark }: { isDark: boolean }) {
  return (
    <section id="founder" className="mx-auto max-w-5xl px-6 py-28 text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={[
          "rounded-3xl p-16 shadow-2xl border",
          isDark ? "border-white/10 bg-gradient-to-b from-neutral-900 to-black" : "border-black/10 bg-gradient-to-b from-white to-neutral-100",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/assets/founder.jpg"
            alt="Axel Salinas"
            width={180}
            height={180}
            className={["rounded-full border-4 shadow-xl", isDark ? "border-white/20" : "border-black/10"].join(" ")}
          />
          <GradientH3 text="Meet the Founder" />
          <p className={["mt-4 text-lg max-w-2xl leading-relaxed", isDark ? "text-neutral-300" : "text-neutral-700"].join(" ")}>
            Axel is a medical student at <span className="font-semibold">UNAM</span>, passionate about
            reimagining healthcare workflows. Experienced in <span className="font-semibold">ML & Genomics</span>,
            he has participated in international competitions and trained through programs such as{" "}
            <span className="italic">Harvard VIP, iGEM 2022</span>, and <span className="italic">MIT Hacking Medicine</span>.
          </p>
          <div className="mt-8 flex gap-6">
            <a
              href="https://github.com/axelsavrov"
              target="_blank"
              className={[
                "flex items-center gap-2 px-6 py-3 rounded-2xl border transition",
                isDark ? "bg-white/10 border-white/20 hover:bg-white/20" : "bg-black/[0.04] border-black/10 hover:bg-black/[0.08]",
              ].join(" ")}
            >
              <Image src="/assets/logos/github.png" alt="GitHub" width={24} height={24} />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/axeljsalinasvences"
              target="_blank"
              className={[
                "flex items-center gap-2 px-6 py-3 rounded-2xl border transition",
                isDark ? "bg-white/10 border-white/20 hover:bg-white/20" : "bg-black/[0.04] border-black/10 hover:bg-black/[0.08]",
              ].join(" ")}
            >
              <Image src="/assets/logos/linkedin.png" alt="LinkedIn" width={24} height={24} />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
          <p className="mt-10 italic text-sm max-w-xl text-neutral-500">
            Ayra never touches sensitive patient information — privacy and security are at the core of everything we build.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function TrustedPartners({ isDark }: { isDark: boolean }) {
  const partners = [
    { name: "Hospital General de México", file: "/assets/partners/hgm.png" },
    { name: "Facultad de Medicina", file: "/assets/partners/facmed.png" },
    { name: "UNAM", file: "/assets/partners/unam.png" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <p className={["text-sm tracking-wide uppercase", isDark ? "text-neutral-400" : "text-neutral-600"].join(" ")}>
        Trusted by early partners
      </p>
      <h4 className="mt-2 text-xl md:text-2xl font-semibold">Collaborating with leading institutions to build real workflows.</h4>

      <div className="mt-10 grid grid-cols-3 items-center justify-items-center gap-8">
        {partners.map((p) => (
          <div key={p.name} className="opacity-90 hover:opacity-100 transition">
            <Image src={p.file} alt={p.name} width={140} height={80} className="object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Waitlist({ isDark }: { isDark: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="waitlist" className="mx-auto max-w-3xl px-6 py-28 text-center">
      <div className={["rounded-3xl p-12 shadow-xl border", isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-neutral-50"].join(" ")}>
        <GradientH2 text="Get early access" size="md" />
        {!submitted ? (
          <form
            action="https://formspree.io/f/mkgzdbqk"
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="mt-8 grid sm:grid-cols-[1fr_auto] gap-4"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className={[
                "w-full rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-2",
                isDark ? "border border-white/10 bg-neutral-900 focus:ring-cyan-400" : "border border-black/10 bg-white focus:ring-cyan-600",
              ].join(" ")}
            />
            <button
              type="submit"
              className={[
                "rounded-2xl px-7 py-4 text-lg font-semibold transition",
                isDark ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]" : "bg-black text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.35)]",
              ].join(" ")}
            >
              Join
            </button>
          </form>
        ) : (
          <p className="mt-6 text-lg text-green-500 font-medium">✅ Thanks! You’re on the list.</p>
        )}
      </div>
    </section>
  );
}

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className={["border-t", isDark ? "border-white/10 bg-black/90" : "border-black/10 bg-white/90"].join(" ")}>
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm flex flex-col items-center justify-center text-center">
        <div className={isDark ? "text-neutral-400" : "text-neutral-600"}>© {new Date().getFullYear()} Ayra. All rights reserved.</div>
      </div>
    </footer>
  );
}

function FloatingButtons({ isDark, onOpenDemo }: { isDark: boolean; onOpenDemo: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <a
        href="#waitlist"
        className={[
          "backdrop-blur-xl rounded-2xl px-5 py-3 border transition",
          isDark ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-black/5 border-black/10 text-black hover:bg-black/10",
        ].join(" ")}
      >
        Join the waitlist →
      </a>
      <button
        onClick={onOpenDemo}
        className={[
          "backdrop-blur-xl rounded-2xl px-5 py-3 border transition",
          isDark ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-black/5 border-black/10 text-black hover:bg-black/10",
        ].join(" ")}
      >
        💬 Try Ayra demo
      </button>
    </div>
  );
}

/* ======================= Chat Demo Modal ======================= */

type ChatMsg = { role: "user" | "ayra"; content: string };

function ChatDemoModal({ open, onClose, isDark }: { open: boolean; onClose: () => void; isDark: boolean }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ayra", content: "Hi! I’m Ayra. Ask me anything about your hospital workflows." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Autoscroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Envío con burbuja degradada para el usuario
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => {
      const reply = simulateAyra(text);
      setMessages((prev) => [...prev, { role: "ayra", content: reply }]);
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
          {/* Modal */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={["relative w-[92%] max-w-2xl rounded-3xl overflow-hidden border", isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/10"].join(" ")}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="font-semibold">Ayra — Live Demo</div>
              <button onClick={onClose} className={["rounded-lg px-3 py-1 text-sm", isDark ? "hover:bg-white/10" : "hover:bg-black/5"].join(" ")}>
                Close
              </button>
            </div>

            <div ref={listRef} className="max-h-[60vh] overflow-y-auto px-6 py-6 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={[
                    "max-w-[80%] rounded-2xl px-5 py-3 shadow-md",
                    m.role === "user"
                      ? "ml-auto bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white"
                      : isDark
                        ? "bg-white/10 border border-white/10 text-neutral-200"
                        : "bg-black/5 border border-black/10 text-neutral-800",
                  ].join(" ")}
                >
                  <span className="text-sm leading-relaxed">{m.content}</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className={[
                    "flex-1 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2",
                    isDark ? "bg-neutral-900 border border-white/10 focus:ring-cyan-400" : "bg-white border border-black/10 focus:ring-cyan-600",
                  ].join(" ")}
                  placeholder='Try: "Who is on call in Neurosurgery?"'
                />
                <button
                  onClick={handleSend}
                  className={["rounded-2xl px-5 py-3 font-semibold", isDark ? "bg-white text-black" : "bg-black text-white"].join(" ")}
                >
                  Send
                </button>
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
  return "Got it. I’ll route that to the right module and follow up. Try asking about on-call staff, pharmacy stock, or logistics ETAs.";
}

/* ======================= PÁGINA PRINCIPAL ======================= */
export default function AyraLanding() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [demoOpen, setDemoOpen] = useState(false);

  // Persistir tema
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ayra-theme")) as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ayra-theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div className={["min-h-screen font-[system-ui]", isDark ? "bg-black text-neutral-100" : "bg-white text-neutral-900"].join(" ")}>
      <Header isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />
      <Hero isDark={isDark} onOpenDemo={() => setDemoOpen(true)} />

      <Modules isDark={isDark} />
      <Roadmap isDark={isDark} />
      <Testimonials isDark={isDark} />
      <Founder isDark={isDark} />
      <TrustedPartners isDark={isDark} />
      <Waitlist isDark={isDark} />

      <Footer isDark={isDark} />
      <FloatingButtons isDark={isDark} onOpenDemo={() => setDemoOpen(true)} />

      <ChatDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} isDark={isDark} />
    </div>
  );
}
