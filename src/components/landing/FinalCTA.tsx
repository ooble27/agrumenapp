import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-40 px-4 md:px-8 max-w-[1200px] mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-headline font-extrabold tracking-[-0.05em] leading-[0.9] mb-10">
          Agrumen
        </h2>
        <p className="text-base md:text-lg text-on-surface-variant font-body max-w-md mx-auto mb-10">
          Mangez local. Soutenez nos héros. Rejoignez des milliers de Sénégalais qui font le choix de la qualité.
        </p>
        <Link
          to="/marche"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-full font-headline font-bold text-lg hover:opacity-90 transition-opacity shadow-2xl"
        >
          Explorer le Marché
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
