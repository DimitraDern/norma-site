import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";

// Το πεδίο "img" δείχνει σε αρχείο μέσα στο public/images/.
const products = [
  { code: "01", title: "Συρματόπλεγμα", group: "Πλέγματα", img: "/images/product-01.jpg" },
  { code: "02", title: "NORMA Panel", group: "Πλέγματα", img: "/images/product-02.jpg" },
  { code: "03", title: "Σύρματα & Αγκαθωτά", group: "Ασφάλεια", img: "/images/product-03.png" },
  { code: "04", title: "Πονταριστά", group: "Πλέγματα", img: "/images/product-04.png" },
  { code: "05", title: "Κατασκευές Περιφράξεων", group: "Κατασκευές", img: "/images/product-05.png" },
  { code: "06", title: "Χειράμαξες & Κάγκελα", group: "Εξοπλισμός", img: "/images/product-06.png" },
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
