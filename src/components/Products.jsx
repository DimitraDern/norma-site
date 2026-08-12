import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { asset } from "../utils/asset.js";

// Το πεδίο "img" δείχνει σε αρχείο μέσα στο public/images/.
const products = [
  { code: "01", title: "Συρματόπλεγμα", group: "Πλέγματα", img: asset("/images/product-01.jpg"), desc: "Πονταριστά, δικτυωτά, εξάγωνα — σε ρολό ή φύλλο." },
  { code: "02", title: "NORMA Panel", group: "Πλέγματα", img: asset("/images/product-02.jpg"), desc: "Ηλεκτροστατικά βαμμένα & γαλβανιζέ σε φύλλα 2,50." },
  { code: "03", title: "Σύρματα & Αγκαθωτά", group: "Ασφάλεια", img: asset("/images/product-03.png"), desc: "Ακανθωτά, κονσερτίνα, σύρματα γαλβανιζέ & χορτοδεσίας." },
  { code: "04", title: "Πονταριστά", group: "Πλέγματα", img: asset("/images/product-04.png"), desc: "Ηλεκτροσυγκολλητά γαλβανιζέ πλέγματα σε ρολό και φύλλο." },
  { code: "05", title: "Κατασκευές Περιφράξεων", group: "Κατασκευές", img: asset("/images/product-05.png"), desc: "Πλήρης κατασκευή & τοποθέτηση — οικόπεδα, φωτοβολταϊκά, NATO." },
  { code: "06", title: "Χειράμαξες & Κάγκελα", group: "Εξοπλισμός", img: asset("/images/product-06.png"), desc: "Χειράμαξες ηλεκτροστατικά βαμμένες, πόρτες, gabion & διακοσμητικά." },
];

const groups = ["Όλα", ...new Set(products.map((p) => p.group))];

export default function Products() {
  const [active, setActive] = useState("Όλα");
  const filtered = active === "Όλα" ? products : products.filter((p) => p.group === active);

  return (
    <section id="products" className="bg-paper py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="mb-8">
          <h2 className="font-display font-700 text-3xl md:text-4xl text-ink">Η γκάμα μας</h2>
        </Reveal>

        {/* Οριζόντια tabs κατηγοριών -- λειτουργικό φίλτρο, ελαφρύ/minimal ύφος */}
        <Reveal delay={60} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide transition-colors ${
                  active === g
                    ? "bg-ink text-white"
                    : "text-steel hover:text-ink border border-ink/15"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Dense photo grid -- χωρίς κάρτες/borders, minimal caption κάτω από κάθε εικόνα */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p, i) => (
            <Reveal key={p.code} delay={i * 60}>
              <Link to="/products" className="group block">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <h3 className="font-display font-600 text-base text-ink group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] text-steel">{p.code}</span>
                </div>
                <p className="text-steel text-sm mt-1 mb-1.5">{p.desc}</p>
                <span className="text-accent text-xs font-semibold inline-flex items-center gap-1 group-hover:underline">
                  Δείτε περισσότερα →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="text-center mt-12">
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
