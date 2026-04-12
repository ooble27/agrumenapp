import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-foreground/[0.04] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary-foreground/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-xs font-headline font-bold uppercase tracking-[0.15em] text-primary-foreground/80 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm">eco</span>
            100% Produits Locaux & Naturels
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-headline text-[2.8rem] font-extrabold leading-[0.92] tracking-[-0.04em] text-primary-foreground sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]"
        >
          Du Champ
          <br />
          <span className="text-primary-foreground/60">à Votre</span>
          <br />
          Table.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-lg text-sm font-body leading-relaxed text-primary-foreground/70 sm:mt-8 sm:text-base md:max-w-xl md:text-lg"
        >
          Fruits, légumes, céréales — 100% frais, 100% sénégalais.
          Commandez en un clic et recevez chez vous en 24h.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <Link
            to="/marche"
            className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 font-headline text-sm font-bold text-primary shadow-xl transition-all hover:scale-[1.03] active:scale-[0.97] sm:px-10 sm:py-4 sm:text-base"
          >
            Commander maintenant
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-6 py-3.5 font-headline text-sm font-medium text-primary-foreground/80 transition-all hover:bg-primary-foreground/10 sm:px-8 sm:py-4"
          >
            En savoir plus
            <span className="material-symbols-outlined text-base">expand_more</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <span className="material-symbols-outlined text-2xl text-primary-foreground/30">
              keyboard_arrow_down
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
