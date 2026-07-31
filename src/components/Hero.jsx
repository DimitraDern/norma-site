import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);

  // Ενημερώνει τη θέση του "φωτός" μέσω CSS custom properties,
  // ώστε το radial-gradient στο .hero-spotlight να ακολουθεί τον κέρσορα.
  function handleMouseMove(e) {
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty("--spot-x", `${x}%`);
    sectionRef.current.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-paper mesh-line-bg overflow-hidden"
    >
      {/* Το διαδραστικό φως — ακολουθεί το ποντίκι πάνω από το πλέγμα-φόντο */}
      <div className="pointer-events-none absolute inset-0 hero-spotlight" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        {/* Αριστερά: headline */}
        <div className="animate-fade-up">
          <h1 className="font-display font-700 text-5xl md:text-[3.7rem] leading-[1.02] text-ink mb-6">
            Συρματουργία Έβρου 
            <br />
            NORMA A.E.
          </h1>
          <p className="text-steel text-lg max-w-md mb-9 leading-relaxed">
            Πρώτοι στον κλάδο συρματουργίας στην Ελλάδα - Κατασκευή, εγκατάσταση, ποιότητα.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
            >
              Δείτε τα προϊόντα
            </a>
            <a
              href="#contact"
              className="border-2 border-ink text-ink font-semibold px-7 py-3.5 rounded-sm hover:bg-ink hover:text-white transition-colors"
            >
              Ζητήστε προσφορά
            </a>
          </div>
        </div>

        {/* Δεξιά: η πραγματική φωτογραφία του κτιρίου, σε "blueprint" μπλε απόχρωση,
            με το διαγώνιο πλέγμα σχεδιασμένο πάνω της σαν τεχνικό annotation.
            Η ιδέα: τα "blueprints" ήταν ιστορικά μπλε φωτογραφικές εκτυπώσεις —
            εδώ η πραγματική φωτο και το τεχνικό σχέδιο γίνονται ένα. */}
        <div className="relative hidden md:block">
          <div className="absolute -top-6 right-16 w-px h-8 bg-ink/30 z-20" />
          <div
            className="tag-card absolute -top-2 right-8 z-20 px-4 py-3 rotate-6 shadow-md"
            style={{ "--rot": "6deg" }}
          >
            <div className="pt-2 font-mono text-[10px] uppercase tracking-wide text-steel">Από το</div>
            <div className="font-display font-700 text-lg text-accent leading-none">1976</div>
          </div>

          <div className="relative w-full aspect-[6/5] rounded-sm border border-ink/20 overflow-hidden">
            {/* Η πραγματική φωτογραφία — βάλε το αρχείο σου στο public/images/hero-building.jpg */}
            <img
              src="/images/hero-building.png"
              
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            />
            {/* Δύο επίπεδα blend mode πάνω στη φωτο, ώστε να πάρει τη μπλε απόχρωση "blueprint" */}
            <div className="absolute inset-0 bg-ink mix-blend-color" />
            <div className="absolute inset-0 bg-accent/25 mix-blend-multiply" />

            {/* Το διαγώνιο πλέγμα, σχεδιασμένο πάνω στη φωτο σαν τεχνικό annotation */}
            <svg viewBox="0 0 360 300" className="absolute inset-0 w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`a${i}`}
                  x1={-60 + i * 40}
                  y1="0"
                  x2={-60 + i * 40 + 300}
                  y2="300"
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.28"
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`b${i}`}
                  x1={-60 + i * 40}
                  y1="300"
                  x2={-60 + i * 40 + 300}
                  y2="0"
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.28"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
