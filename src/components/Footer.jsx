import { Facebook, Instagram, Linkedin } from "lucide-react";

const socials = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Λογότυπο + σύντομο μότο */}
        <div>
          <img src="/images/norma-logo.png" alt="NORMA S.A." className="w-10 h-10 object-contain mb-3" />
          <p className="font-display font-600 text-white text-sm">NORMA S.A.</p>
          <p className="text-white/40 text-xs mt-1">Συρματουργία Έβρου, από το 1976.</p>
        </div>

        {/* Διεύθυνση */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">Διεύθυνση</p>
          <p className="text-white/50 text-sm leading-relaxed">
            7ο χλμ. Διδυμότειχο – Αλεξανδρούπολη<br />Έβρος, Ελλάδα
          </p>
        </div>

        {/* Επικοινωνία */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">Επικοινωνία</p>
          <p className="text-white/50 text-sm leading-relaxed">
            <a href="tel:+3025xxxxxxxx" className="hover:text-white transition-colors">+30 25xx xxx xxx</a>
            <br />
            <a href="mailto:info@evros-mreja.com" className="hover:text-white transition-colors">info@evros-mreja.com</a>
          </p>
        </div>

        {/* Social */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">Ακολουθήστε μας</p>
          <div className="flex gap-3">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="social link"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-white/10 text-center">
        <p className="font-mono text-[11px] text-white/35">
          &copy; {new Date().getFullYear()} NORMA S.A. — Στοϊλούδης Ιωάννης Α.Β.Ε.Ε. Με επιφύλαξη παντός δικαιώματος.
        </p>
      </div>
    </footer>
  );
}
