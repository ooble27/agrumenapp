import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Courbe décorative verte (style remotion.dev) */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroCurve" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary-container))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          d="M -100 250 C 300 -50, 700 850, 1100 350 S 1700 100, 1600 600"
          stroke="url(#heroCurve)"
          strokeWidth="160"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>

      {/* Voile blanc pour adoucir la courbe et garder le fond clair */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--background)/0.55)_0%,_hsl(var(--background)/0.85)_60%,_hsl(var(--background))_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8 lg:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-[3.2rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-foreground sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem]"
        >
          <span className="block">Du Champ</span>
          <span className="block">à Votre Table.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-6 max-w-2xl font-body text-base text-on-surface-variant sm:text-lg md:mt-8 md:text-xl"
        >
          Des produits frais, locaux et de saison livrés
          <br className="hidden sm:block" />
          des producteurs sénégalais à votre porte.
        </motion.p>

        {/* Barre de boutons style remotion.dev (pills sombres) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-3"
        >
          {/* Bouton "terminal" CTA principal */}
          <Link
            to="/marche"
            className="inline-flex items-center gap-2 rounded-full bg-inverse-surface px-5 py-3 font-mono text-sm text-inverse-on-surface shadow-md transition-all hover:scale-[1.03] active:scale-[0.97] sm:px-6 sm:py-3.5 sm:text-base"
          >
            <span className="text-primary-container">$</span>
            <span className="font-medium" style={{ color: "hsl(var(--background))" }}>
              commander --frais
            </span>
          </Link>

          {/* Boutons secondaires gris foncé */}
          <a
            href="#mission"
            className="inline-flex items-center rounded-full bg-inverse-surface/90 px-5 py-3 font-headline text-sm font-semibold text-inverse-on-surface transition-all hover:bg-inverse-surface sm:px-6 sm:py-3.5 sm:text-base"
            style={{ color: "hsl(var(--background))" }}
          >
            Notre mission
          </a>
          <a
            href="#comment-ca-marche"
            className="inline-flex items-center rounded-full bg-inverse-surface/90 px-5 py-3 font-headline text-sm font-semibold transition-all hover:bg-inverse-surface sm:px-6 sm:py-3.5 sm:text-base"
            style={{ color: "hsl(var(--background))" }}
          >
            Comment ça marche
          </a>

          {/* Bouton accent "vendeur" avec icône */}
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-inverse-surface/90 px-5 py-3 font-headline text-sm font-semibold transition-all hover:bg-inverse-surface sm:px-6 sm:py-3.5 sm:text-base"
            style={{ color: "hsl(var(--background))" }}
          >
            <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "1.1rem" }}>
              storefront
            </span>
            Devenir vendeur
          </Link>
        </motion.div>

        {/* Mini-row d'icônes (style "templates" sur la référence) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-on-surface-variant sm:mt-14 sm:gap-8"
        >
          {[
            { icon: "eco", label: "Bio" },
            { icon: "local_shipping", label: "Livraison" },
            { icon: "agriculture", label: "Producteurs" },
            { icon: "verified", label: "Qualité" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5">
              <span className="material-symbols-outlined text-2xl text-foreground sm:text-3xl">
                {item.icon}
              </span>
              <span className="font-body text-xs sm:text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
