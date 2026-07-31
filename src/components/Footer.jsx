export default function Footer() {
  return (
    <footer className="bg-ink py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="font-mono text-[11px] text-white/35">
          &copy; {new Date().getFullYear()} NORMA S.A. — ΣΤΟΪΛΟΥΔΗΣ ΙΩΑΝΝΗΣ Α.Β.Ε.Ε. ΜΕ ΕΠΙΦΥΛΑΞΗ ΠΑΝΤΟΣ ΔΙΚΑΙΩΜΑΤΟΣ.
        </p>
      </div>
    </footer>
  );
}
