import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-delivery-guy.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-start overflow-hidden px-4 pb-6 pt-24 sm:px-6 lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:justify-normal lg:gap-0 lg:px-16 lg:pb-0 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mt-4 flex w-full justify-center sm:mt-6 md:mt-8 lg:mt-0 lg:justify-start"
        >
          <img
            src={heroGuy}
            alt="Livreur Agrumen avec panier de produits frais"
            className="-ml-[10vw] w-[120vw] max-w-none object-contain sm:-ml-4 sm:w-[90vw] md:ml-0 md:w-[680px] lg:-ml-20 lg:w-[760px] xl:w-[860px]"
            width={1344}
            height={896}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative z-20 mt-4 flex w-full items-center justify-end sm:mt-6 md:mt-8 md:justify-center lg:mt-0 lg:justify-end"
        >
          <div className="w-[88%] max-w-[29rem] rounded-xl bg-primary px-5 py-6 shadow-2xl sm:w-[82%] sm:px-7 sm:py-7 md:w-full md:max-w-[34rem] md:px-10 md:py-10 lg:rounded-2xl lg:px-12 lg:py-14">
            <h1 className="font-headline text-[2.15rem] font-extrabold leading-[0.9] tracking-[-0.055em] text-primary-foreground sm:text-[3rem] md:text-[4rem] lg:text-[5.2rem] xl:text-[5.8rem]">
              <span className="block">Du Champ</span>
              <span className="block">à Votre Table</span>
            </h1>

            <Link
              to="/marche"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-background px-4 py-2.5 font-headline text-[12px] font-bold text-primary transition-all hover:opacity-90 active:scale-[0.97] sm:mt-6 sm:px-5 sm:py-3 sm:text-[13px] md:px-6 md:py-3.5 md:text-sm lg:mt-8 lg:px-8 lg:py-4"
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
