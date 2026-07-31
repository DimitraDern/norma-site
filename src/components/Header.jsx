import { useState } from "react";

const links = [
  { label: "Αρχική", href: "#top" },
  { label: "Εταιρεία", href: "#about" },
  { label: "Προϊόντα", href: "#products" },
  { label: "Επικοινωνία", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 bg-ink">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#top">
            {/* Πραγματικό λογότυπο — βλ. οδηγίες παρακάτω για το πού μπαίνει το αρχείο */}
            <img src="/images/norma-logo.png" alt="NORMA S.A. λογότυπο" className="w-10 h-10 object-contain" />
          </a>
          <div className="leading-tight">
            <a href="#top" className="block font-display font-600 text-white text-sm tracking-wide hover:text-accent transition-colors">
              NORMA S.A.
            </a>
            <a
              href="https://normasa.gr/"
              target="_blank"
              rel="noreferrer"
              className="block font-mono text-[9px] text-accent tracking-wide uppercase hover:underline"
            >
              ΣΤΟΪΛΟΥΔΗΣ ΙΩΑΝΝΗΣ Α.Β.Ε.Ε.
            </a>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-4 py-2 rounded-sm transition-colors"
        >
          Ζητήστε προσφορά
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white p-2"
          aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={menuOpen}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 bg-white rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-ink-light ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white text-sm">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
