export default function VideoHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-ink">
      {/* Το βίντεο παίζει αυτόματα, σε loop, χωρίς ήχο -- καμία αλληλεπίδραση με το scroll */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Σκούρο overlay πάνω από το βίντεο ώστε το κείμενο να διαβάζεται καθαρά */}
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-5">
            Από το 1976
          </p>
          <h1 className="font-display font-700 text-5xl md:text-6xl text-white leading-tight mb-6">
            Συρματουργία Έβρου
            <br />
            NORMA A.E.
          </h1>
          <p className="text-white/70 text-lg mb-9">
            Πρώτοι στον κλάδο συρματουργίας στην Ελλάδα — Κατασκευή, εγκατάσταση, ποιότητα.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
            >
              Δείτε τα προϊόντα
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-white hover:text-ink transition-colors"
            >
              Ζητήστε προσφορά
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
