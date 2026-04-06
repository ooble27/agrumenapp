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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-[3rem] md:text-[5.5rem] lg:text-[7rem] font-headline font-extrabold text-white tracking-[-0.04em] leading-[0.9] mb-6"
        >
          Du champ
          <br />
          <span className="text-primary-container">à votre table.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/60 font-body max-w-xl mx-auto leading-relaxed mb-10"
        >
          Produits frais, locaux et sans intermédiaires. Directement des agriculteurs sénégalais à votre foyer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Link
            to="/marche"
            className="group inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-headline font-bold text-base hover:scale-[0.97] active:scale-95 transition-all shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          >
            Explorer le Marché
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
