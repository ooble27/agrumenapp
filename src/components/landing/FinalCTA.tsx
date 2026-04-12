import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center sm:p-12 md:p-16 lg:p-24"
      >
        {/* Decorative */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-foreground/[0.06] blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-foreground/[0.04] blur-3xl" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-xs font-headline font-bold uppercase tracking-wider text-primary-foreground/70">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              Rejoignez le mouvement
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-headline font-extrabold text-primary-foreground tracking-tight mb-6 leading-[1.05]">
            Mangez Local.
            <br />
            Soutenez nos Héros.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/70 font-body max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Rejoignez des milliers de Sénégalais qui font le choix de la qualité, de la fraîcheur et de la justice sociale.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              to="/marche"
              className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 font-headline text-sm font-bold text-primary shadow-xl transition-all hover:scale-[1.03] sm:px-10 sm:text-base"
            >
              Explorer le Marché
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-6 py-3.5 font-headline text-sm font-medium text-primary-foreground/80 transition-all hover:bg-primary-foreground/10"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
