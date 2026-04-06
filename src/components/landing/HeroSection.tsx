import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-delivery-guy.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 items-center min-h-[100svh]">
          {/* Left — Image, big */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-end justify-center lg:justify-start pt-20 lg:pt-0"
          >
            <img
              src={heroGuy}
              alt="Livreur Agrumen avec panier de produits frais"
              className="w-[380px] md:w-[480px] lg:w-[580px] xl:w-[650px] object-contain"
              width={1344}
              height={896}
            />
          </motion.div>

          {/* Right — Big text on green card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col justify-center items-start bg-primary rounded-3xl p-10 md:p-14 lg:p-16"
          >
            <h1 className="font-headline font-extrabold text-primary-foreground leading-[0.92] tracking-[-0.04em] text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem]">
              Du Champ à Votre Table
            </h1>

            <Link
              to="/marche"
              className="mt-10 inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Commander maintenant
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
