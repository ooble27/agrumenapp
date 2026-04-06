import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-delivery-guy.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-4 px-5 pb-10 pt-28 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-0 lg:px-16 lg:pb-0 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-start"
        >
          <img
            src={heroGuy}
            alt="Livreur Agrumen avec panier de produits frais"
            className="w-[110vw] max-w-none sm:w-[96vw] md:w-[760px] lg:w-[760px] xl:w-[860px] -ml-[8vw] sm:-ml-10 lg:-ml-20 object-contain"
            width={1344}
            height={896}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="flex items-center justify-start lg:justify-end"
        >
          <div className="w-full max-w-[34rem] rounded-[2rem] bg-primary px-7 py-8 shadow-2xl sm:px-9 sm:py-10 lg:rounded-[2.75rem] lg:px-12 lg:py-14">
            <h1 className="font-headline text-[3rem] font-extrabold leading-[0.88] tracking-[-0.055em] text-primary-foreground sm:text-[3.7rem] md:text-[4.5rem] lg:text-[5.2rem] xl:text-[5.8rem]">
              <span className="block">Du Champ</span>
              <span className="block">à Votre Table</span>
            </h1>

            <Link
              to="/marche"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 font-headline text-sm font-bold text-primary transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Commander maintenant
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
