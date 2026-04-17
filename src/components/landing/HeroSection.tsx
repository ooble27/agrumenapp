import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-inverse-surface">
      {/* Courbe décorative en arrière-plan (style remotion.dev) */}
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
          opacity="0.95"
        />
      </svg>

      {/* Halo doux */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--inverse-surface)/0)_0%,_hsl(var(--inverse-surface)/0.6)_70%,_hsl(var(--inverse-surface))_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8 lg:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-[3.2rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-inverse-on-surface sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem]"
          style={{ color: "hsl(var(--background))" }}
        >
          <span className="block">Du Champ</span>
          <span className="block">à Votre Table.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-6 max-w-2xl font-body text-base text-inverse-on-surface/90 sm:text-lg md:mt-8 md:text-xl"
          style={{ color: "hsl(var(--background) / 0.85)" }}
        >
          Des produits frais, locaux et de saison livrés directement
          <br className="hidden sm:block" />
          des producteurs sénégalais à votre porte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <Link
            to="/marche"
            className="inline-flex items-center gap-2 rounded-full bg-primary-container px-6 py-3.5 font-headline text-sm font-bold text-primary-container-foreground shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97] sm:px-8 sm:py-4 sm:text-base"
          >
            Commander maintenant
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 rounded-full border border-inverse-on-surface/30 bg-inverse-surface/40 px-6 py-3.5 font-headline text-sm font-bold text-inverse-on-surface backdrop-blur-sm transition-all hover:bg-inverse-surface/60 sm:px-8 sm:py-4 sm:text-base"
            style={{ color: "hsl(var(--background))" }}
          >
            Notre mission
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
