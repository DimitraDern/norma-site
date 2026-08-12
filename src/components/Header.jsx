import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Αρχική", to: "/" },
  { label: "Εταιρεία", to: "/#about" },
  { label: "Προϊόντα", to: "/products" },
  { label: "Επικοινωνία", to: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Στην αρχική, το header είναι διάφανο πάνω από το βίντεο μέχρι να κάνει scroll ο χρήστης.
  // Σε κάθε άλλη σελίδα παραμένει πάντα συμπαγές (δεν υπάρχει βίντεο από πίσω του να φανεί).
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showSolidBg = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        showSolidBg ? "bg-ink" : "bg-gradient-to-b from-ink/60 via-ink/20 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            {/* Πραγματικό λογότυπο */}
            <img src="/images/norma-logo.png" alt="NORMA S.A. λογότυπο" className="w-10 h-10 object-contain" />
          </Link>
          <div className="leading-tight">
            <Link to="/" className="block font-display font-600 text-white text-sm tracking-wide hover:text-accent transition-colors">
              NORMA S.A.
            </Link>
            <a
              
              target="_blank"
              rel="noreferrer"
              className="block font-mono text-[9px] text-white/70 tracking-wide uppercase hover:text-white"
            >
              ΣΤΟΪΛΟΥΔΗΣ ΙΩΑΝΝΗΣ Α.Β.Ε.Ε.
            </a>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/#contact"
          className="hidden md:inline-block bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-4 py-2 rounded-sm transition-colors"
        >
          Ζητήστε προσφορά
        </Link>

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
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white text-sm">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
