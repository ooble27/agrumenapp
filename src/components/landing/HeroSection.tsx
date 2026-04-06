import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-delivery-guy.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-end lg:items-center overflow-hidden bg-primary">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(100,60%,18%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 items-end lg:items-center min-h-[100svh]">
          {/* Left — Big bold text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center py-24 lg:py-0 order-2 lg:order-1"
          >
            <h1 className="font-headline font-extrabold text-primary-foreground leading-[0.9] tracking-[-0.05em]">
              <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                Du Champ
              </span>
              <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] italic opacity-90">
                à Votre
              </span>
              <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                Table.
              </span>
            </h1>

            <Link
              to="/marche"
              className="mt-10 w-fit inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Commander maintenant
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex items-end justify-center lg:justify-end order-1 lg:order-2 pt-24 lg:pt-0"
          >
            <img
              src={heroGuy}
              alt="Livreur Agrumen avec panier de produits frais"
              className="w-[280px] md:w-[360px] lg:w-[460px] xl:w-[520px] object-contain"
              width={1344}
              height={896}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
