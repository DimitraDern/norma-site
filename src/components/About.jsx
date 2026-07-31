import { Calendar, Award, Truck, Globe } from "lucide-react";
import Reveal from "./Reveal.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";

const stats = [
  { icon: Calendar, value: "1976", label: "Έτος ίδρυσης", rot: "-3deg" },
  { icon: Award, value: "48+", label: "Χρόνια εμπειρίας", rot: "2deg" },
  { icon: Truck, value: "Πανελλαδικά", label: "Διανομή", rot: "-1.5deg" },
  { icon: Globe, value: "Διεθνώς", label: "Εξαγωγές", rot: "3deg" },
];

export default function About() {
  return (
    <section id="about" className="bg-ink py-24">
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <Reveal>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-white mb-5 max-w-lg">
            Τρεις γενιές, ένα εργοστάσιο.
          </h2>
          <p className="text-white/50 leading-relaxed max-w-lg">
            Από το 1976 η ΝΟRΜΑ Α.Ε. είναι εργοστάσιο με κύριο αντικείμενο την παραγωγή συρματοπλεγμάτων περίφραξης. 
            Πραγματοποιώντας μια σειρά επενδύσεων, έχει κατορθώσει να βρίσκεται σήμερα στην πρώτη θέση στον κλάδο της συρματουργίας στην Ελλάδα. 
            Τα προϊόντα μας διατίθενται πανελλαδικά, ενώ η τελευταία πενταετία μας οδήγησε σε συνεργασίες και εξαγωγές στο εξωτερικό.
          </p>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-white/15 mb-10 relative">
          <span className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-accent" />
          <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-accent" />
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 100}>
                <div
                  className="tag-card w-40 px-4 py-4 text-center transition-transform duration-300 hover:rotate-0 hover:-translate-y-1"
                  style={{ "--rot": s.rot, transform: `rotate(${s.rot})` }}
                >
                  {/* Εικονίδιο πάνω από το κείμενο, όπως στο ζητούμενο στυλ */}
                  <Icon className="mx-auto mt-2 mb-2 text-accent" size={22} strokeWidth={1.75} />
                  <div className="font-display font-700 text-2xl text-ink tabular-nums leading-tight">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-steel mt-1">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
