import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroLanding from "@/assets/hero-landing.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroLanding}
          alt="Terres agricoles sénégalaises"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-headline font-semibold text-[11px] uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            L'Agronome Digital du Sénégal
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-[3rem] md:text-[5.5rem] lg:text-[7rem] font-headline font-extrabold text-white tracking-[-0.04em] leading-[0.9] mb-6"
        >
          Du champ
          <br />
          <span className="text-primary-container">à votre table.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/60 font-body max-w-xl mx-auto leading-relaxed mb-10"
        >
          Produits frais, locaux et sans intermédiaires. Directement des agriculteurs sénégalais à votre foyer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/marche"
            className="group bg-white text-foreground px-8 py-4 rounded-full font-headline font-bold text-base flex items-center justify-center gap-2 hover:scale-[0.97] active:scale-95 transition-all shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          >
            Explorer le Marché
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link
            to="/auth?role=seller"
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-headline font-bold text-base hover:bg-white/20 transition-all text-center"
          >
            Devenir Vendeur
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
