import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-delivery-guy.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-start overflow-hidden px-4 pb-6 pt-20 sm:px-6 lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:justify-normal lg:gap-0 lg:px-16 lg:pb-0 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 -mt-2 flex w-full justify-center sm:-mt-4 lg:mt-0 lg:justify-start"
        >
          <img
            src={heroGuy}
            alt="Livreur Agrumen avec panier de produits frais"
            className="w-[116vw] max-w-none sm:w-[86vw] md:w-[760px] lg:w-[760px] xl:w-[860px] -ml-[12vw] sm:-ml-10 lg:-ml-20 object-contain"
            width={1344}
            height={896}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative z-20 -mt-10 flex w-full items-center justify-start lg:mt-0 lg:justify-end"
        >
          <div className="ml-12 w-[calc(100%+1.5rem)] max-w-[34rem] rounded-xl bg-primary px-6 py-6 shadow-2xl sm:ml-0 sm:w-full sm:px-9 sm:py-10 lg:rounded-2xl lg:px-12 lg:py-14">
            <h1 className="font-headline text-[2.25rem] font-extrabold leading-[0.9] tracking-[-0.055em] text-primary-foreground sm:text-[3.7rem] md:text-[4.5rem] lg:text-[5.2rem] xl:text-[5.8rem]">
              <span className="block">Du Champ</span>
              <span className="block">à Votre Table</span>
            </h1>

            <Link
              to="/marche"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 font-headline text-[13px] font-bold text-primary transition-all hover:opacity-90 active:scale-[0.97] sm:mt-8 sm:px-8 sm:py-4 sm:text-sm"
            >
              Commander maintenant
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
