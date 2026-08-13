import { useEffect, useRef, useState } from "react";
import { Calendar, Award, Truck, Globe } from "lucide-react";
import Reveal from "./Reveal.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

/* Το ΚΑΝΟΝΙΚΟ κάθετο scroll της σελίδας κινεί τη σειρά καρτών οριζόντια
   (σαν Apple-style section) -- όσο ο χρήστης κάνει scroll προς τα κάτω,
   το section παραμένει "καρφωμένο" στην οθόνη (sticky) και η σειρά καρτών
   γλιστράει προς τα αριστερά. Όποια κάρτα βρίσκεται πιο κοντά στο κέντρο
   της οθόνης "πετάγεται" μπροστά. */
function StatsCarousel() {
  const { t } = useLanguage();
  const stats = [
    { icon: Calendar, value: t("about.stat1v"), label: t("about.stat1l") },
    { icon: Award, value: t("about.stat2v"), label: t("about.stat2l") },
    { icon: Truck, value: t("about.stat3v"), label: t("about.stat3l") },
    { icon: Globe, value: t("about.stat4v"), label: t("about.stat4l") },
  ];

  const wrapperRef = useRef(null);
  const rowRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId;

    function loop() {
      const wrapper = wrapperRef.current;
      const row = rowRef.current;

      if (wrapper && row) {
        const rect = wrapper.getBoundingClientRect();
        const total = wrapper.offsetHeight - window.innerHeight;

        if (total > 0) {
          const scrolled = -rect.top;
          const p = Math.min(1, Math.max(0, scrolled / total));
          setProgress(p);

          const maxTranslate = Math.max(0, row.scrollWidth - window.innerWidth);
          const x = -p * maxTranslate;
          // Άμεση εφαρμογή στο DOM κάθε frame -- πιο σταθερό από scroll-event
          // listeners, που μπορούν να "χάσουν" events σε κινητά (momentum
          // scrolling, address bar collapse κλπ).
          row.style.transform = `translateX(${x}px)`;

          const viewportCenter = window.innerWidth / 2;
          let closestIdx = 0;
          let closestDist = Infinity;
          cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cardCenter = r.left + r.width / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
          });
          setActive(closestIdx);
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
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
          {t("about.journeyKicker")}
        </p>
        <h2 className="relative font-display font-700 text-3xl md:text-5xl text-white mb-14 text-center px-6">
          {t("about.journeyTitleA")} <span className="text-accent italic">NORMA</span> {t("about.journeyTitleB")}
        </h2>

        <div
          ref={rowRef}
          className="relative flex items-end gap-10 self-start"
          style={{ paddingLeft: "calc(50vw - 128px)", paddingRight: "calc(50vw - 128px)" }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <div key={s.label} ref={(el) => (cardRefs.current[i] = el)} className="flex flex-col items-center">
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
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-ink">
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-6 mb-4 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        {/* Αριστερά: κείμενο, με έμφαση χρώματος μέσα στον τίτλο */}
        <Reveal>
          <h2 className="font-display font-700 text-3xl md:text-[2.6rem] leading-[1.15] text-white mb-6">
            {t("about.titleA")} <span className="text-accent">{t("about.titleB")}</span>
          </h2>
          <p className="text-white/50 leading-relaxed">{t("about.body")}</p>
        </Reveal>

        {/* Δεξιά: η φωτο σε σχήμα "αψίδας", πάνω σε two-tone accent φόντο -- ίδια δομή
            με το πρότυπο που έστειλες, με τα χρώματα του site */}
        <Reveal delay={100}>
          <div className="relative aspect-[4/5] flex items-end justify-center">
            {/* Βάση: ορθογώνιο σε accent χρώμα */}
            <div className="absolute inset-0 bg-accent/90 rounded-sm" />
            {/* Δεύτερος τόνος: πιο ανοιχτός κύκλος στην πάνω-δεξιά γωνία */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-accent-light/40" />
            {/* Η φωτο, κομμένη σε σχήμα αψίδας */}
            <img
              src={asset("/images/aboutPic.png")}
              alt="Συρματουργία NORMA — εγκαταστάσεις παραγωγής"
              className="relative w-[82%] h-[90%] object-cover rounded-t-[50%] shadow-2xl"
            />
          </div>
        </Reveal>
      </div>

      {/* Το scroll-driven horizontal section */}
      <StatsCarousel />
    </section>
  );
}
