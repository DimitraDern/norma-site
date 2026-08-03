import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";

// Το πεδίο "img" δείχνει σε αρχείο μέσα στο public/images/.
const products = [
  { code: "01", title: "Συρματόπλεγμα", desc: "Πονταριστά, δικτυωτά, εξάγωνα - σε ρολό ή φύλλο.", img: "/images/product-01.jpg" },
  { code: "02", title: "NORMA Panel", desc: "Ηλεκτροστατικά βαμμένα & γαλβανιζέ σε φύλλα 2,50.", img: "/images/product-02.jpg" },
  { code: "03", title: "Σύρματα & Αγκαθωτά", desc: "Ακανθωτά, κονσερτίνα, σύρματα γαλβανιζέ & χορτοδεσίας.", img: "/images/product-03.png" },
  { code: "04", title: "Πονταριστά", desc: "Ηλεκτροσυγκολλητά γαλβανιζέ πλέγματα σε ρολό και φύλλο.", img: "/images/product-04.png" },
  { code: "05", title: "Κατασκευές Περιφράξεων", desc: "Πλήρης κατασκευή & τοποθέτηση - οικόπεδα, φωτοβολταϊκά, NATO.", img: "/images/product-05.png" },
  { code: "06", title: "Χειράμαξες & Κάγκελα", desc: "Χειράμαξες ηλεκτροστατικά βαμμένες, πόρτες, gabion & διακοσμητικά.", img: "/images/product-06.png" },
];

export default function Products() {
  return (
    <section id="products" className="bg-paper mesh-line-bg py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="mb-10">
          <h2 className="font-display font-700 text-3xl md:text-4xl text-ink">Η γκάμα μας</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <Reveal key={p.code} delay={i * 80}>
              <div className="bg-tag border border-ink/12 rounded-sm overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img src={p.img} alt={p.title} className="w-full h-44 object-cover border-b border-ink/10" />
                <div className="pt-3 px-5 pb-5 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-xs text-accent">{p.code}</span>
                  </div>
                  <h3 className="font-display font-600 text-lg text-ink mb-2">{p.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            Δείτε όλο τον κατάλογο →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
