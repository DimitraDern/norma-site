import { MapPin, Phone, Mail } from "lucide-react";
import Reveal from "./Reveal.jsx";

const rows = [
  { icon: MapPin, label: "Διεύθυνση", value: "7ο χλμ. Διδυμότειχο – Αλεξανδρούπολη" },
  { icon: Phone, label: "Τηλέφωνο", value: "+30 25xx xxx xxx" },
  { icon: Mail, label: "Email", value: "info@evros-mreja.com" },
];

export default function ContactForm() {
  return (
    <section id="contact" className="bg-ink py-24">
      <div className="max-w-xl mx-auto px-6">
        <Reveal>
          {/* Μεγάλη ετικέτα-αποστολής, σαν label δέματος */}
          <div className="tag-card p-8 md:p-10 -rotate-1" style={{ "--rot": "-1deg" }}>
            <div className="pt-3 flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Ετικέτα Επικοινωνίας</span>
              <span className="font-mono text-[10px] text-accent">No. 01</span>
            </div>

            <h2 className="font-display font-700 text-3xl text-ink mb-2">Ας μιλήσουμε.</h2>
            <p className="text-steel text-sm mb-7">
              Στείλτε μας τις προδιαγραφές του έργου σας — απάντηση εντός 24 ωρών.
            </p>

            <div className="border-t border-dashed border-ink/20 pt-6 space-y-4">
              {rows.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.label} className="flex items-center gap-3">
                    <Icon size={16} className="text-accent shrink-0" />
                    <span className="font-mono text-xs text-steel w-20 shrink-0">{r.label}</span>
                    <span className="text-ink text-sm">{r.value}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="mailto:info@evros-mreja.com"
              className="mt-8 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-sm transition-all hover:-translate-y-0.5"
            >
              Στείλτε email →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
