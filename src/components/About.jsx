import { useEffect, useRef, useState } from "react";
import { Calendar, Award, Truck, Globe } from "lucide-react";
import Reveal from "./Reveal.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";
import { asset } from "../utils/asset.js";

const stats = [
  { icon: Calendar, value: "1976", label: "Έτος ίδρυσης" },
  { icon: Award, value: "48+", label: "Χρόνια εμπειρίας" },
  { icon: Truck, value: "Πανελλαδικά", label: "Διανομή" },
  { icon: Globe, value: "Διεθνώς", label: "Εξαγωγές" },
];

/* Το ΚΑΝΟΝΙΚΟ κάθετο scroll της σελίδας κινεί τη σειρά καρτών οριζόντια
   (σαν Apple-style section) -- όσο ο χρήστης κάνει scroll προς τα κάτω,
   το section παραμένει "καρφωμένο" στην οθόνη (sticky) και η σειρά καρτών
   γλιστράει προς τα αριστερά. Όποια κάρτα βρίσκεται πιο κοντά στο κέντρο
   της οθόνης "πετάγεται" μπροστά. */
function StatsCarousel() {
  const wrapperRef = useRef(null);
  const rowRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const wrapper = wrapperRef.current;
      const row = rowRef.current;
      if (!wrapper || !row) return;

      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);

      const maxTranslate = Math.max(0, row.scrollWidth - window.innerWidth);
      setTranslateX(-p * maxTranslate);
      setActive(Math.round(p * (stats.length - 1)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "160vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center bg-ink mesh-line-bg">
        {/* Progress bar -- δείχνει τη συνολική πρόοδο μέσα στο section */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
          <div
            className="h-full bg-accent transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Απαλό "φως" πίσω από την ενεργή κάρτα, στο κέντρο της οθόνης */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 42%, rgba(31,95,168,0.28), transparent 34%)",
          }}
        />

        {/* Kicker + τίτλος -- ίδιο μοτίβο με τα άλλα sections του site */}
        <p className="relative font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">
          48 χρόνια πορείας
        </p>
        <h2 className="relative font-display font-700 text-3xl md:text-5xl text-white mb-14 text-center px-6">
          Η Πορεία της <span className="text-accent italic">NORMA</span> Α.Ε.
        </h2>

        <div
          ref={rowRef}
          className="relative flex items-end gap-10 pl-[12vw] pr-[12vw]"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <div key={s.label} className="flex flex-col items-center">
                <div
                  className={`tag-card w-64 shrink-0 px-6 py-8 text-center transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-110 -translate-y-3 rotate-0 shadow-[0_0_50px_-5px_rgba(31,95,168,0.65)] z-10"
                      : "scale-90 opacity-40 rotate-1"
                  }`}
                >
                  {/* Κυκλικό badge πίσω από το εικονίδιο -- γεμίζει accent χρώμα στην ενεργή κάρτα */}
                  <div
                    className={`mx-auto mt-2 mb-3 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive ? "bg-accent/15" : "bg-steel/10"
                    }`}
                  >
                    <Icon className="text-accent" size={22} strokeWidth={1.75} />
                  </div>
                  <div
                    className={`font-display font-700 tabular-nums leading-tight transition-all duration-500 ${
                      isActive ? "text-4xl text-ink" : "text-2xl text-ink/70"
                    }`}
                  >
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-steel mt-2">{s.label}</div>
                </div>

                {/* Κάθετη γραμμούλα που συνδέει την κάρτα με τη "διαδρομή" από κάτω */}
                <div className={`w-px h-6 transition-colors duration-500 ${isActive ? "bg-accent" : "bg-white/15"}`} />
                <span
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${
                    isActive ? "bg-accent border-accent scale-125" : "bg-ink border-white/25"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-ink">
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-6 mb-4 grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        {/* Πραγματική φωτο του κτιρίου -- στυλ "About" με εικόνα δίπλα στο κείμενο */}
        <Reveal>
          <img
            src={asset("/images/hero-building.png")}
            alt="Το εργοστάσιο της NORMA"
            className="w-full rounded-sm border border-white/10 object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-4">Η Εταιρεία</p>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-white mb-5">
            Τρεις γενιές, ένα εργοστάσιο.
          </h2>
          <p className="text-white/50 leading-relaxed mb-6">
            Από το 1976 η ΝΟRΜΑ Α.Ε. είναι εργοστάσιο με κύριο αντικείμενο την παραγωγή συρματοπλεγμάτων περίφραξης.
            Πραγματοποιώντας μια σειρά επενδύσεων, έχει κατορθώσει να βρίσκεται σήμερα στην πρώτη θέση στον κλάδο της συρματουργίας στην Ελλάδα.
          </p>
          <a href="#products" className="text-accent font-semibold hover:underline">
            Περισσότερα για εμάς →
          </a>
        </Reveal>
      </div>

      {/* Το scroll-driven horizontal section */}
      <StatsCarousel />
    </section>
  );
}
