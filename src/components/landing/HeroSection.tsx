import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroGuy from "@/assets/hero-agrumen-guy.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(95,40%,96%)] via-[hsl(90,25%,94%)] to-[hsl(100,35%,90%)]">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start z-10 order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-xs font-headline font-bold tracking-widest text-primary uppercase mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Plateforme agricole n°1 au Sénégal
            </motion.span>

            <h1 className="font-headline font-extrabold text-foreground tracking-[-0.04em] leading-[0.95] mb-6">
              <span className="block text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem]">
                Du Champ
              </span>
              <span className="block text-[3.2rem] md:text-[4.2rem] lg:text-[5rem] italic text-primary">
                à Votre Table
              </span>
              <span className="block text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-semibold text-muted-foreground mt-2">
                en un clic.
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground font-body max-w-lg leading-relaxed mb-10">
              Commandez des produits agricoles frais, 100% locaux, livrés directement chez vous à Dakar et partout au Sénégal.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/marche"
                className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-full font-headline font-bold text-sm hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97] transition-all duration-200"
              >
                Commander maintenant
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/marche"
                className="inline-flex items-center gap-2 border-2 border-primary/30 text-foreground px-8 py-4 rounded-full font-headline font-semibold text-sm hover:border-primary/60 hover:bg-primary/5 active:scale-[0.97] transition-all duration-200"
              >
                Explorer le Marché
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">group</span>
                </div>
                <div>
                  <p className="text-lg font-headline font-extrabold text-foreground leading-tight">5 000+</p>
                  <p className="text-xs text-muted-foreground font-body">Clients satisfaits</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">local_shipping</span>
                </div>
                <div>
                  <p className="text-lg font-headline font-extrabold text-foreground leading-tight">30 min</p>
                  <p className="text-xs text-muted-foreground font-body">Livraison express</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">eco</span>
                </div>
                <div>
                  <p className="text-lg font-headline font-extrabold text-foreground leading-tight">100%</p>
                  <p className="text-xs text-muted-foreground font-body">Produits locaux</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative z-10 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow behind person */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent rounded-full blur-2xl scale-110" />
              <img
                src={heroGuy}
                alt="Employé Agrumen tenant un panier de fruits et légumes frais"
                className="w-[300px] md:w-[380px] lg:w-[460px] relative z-10 drop-shadow-2xl"
                width={1024}
                height={1024}
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-8 -left-4 md:-left-8 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-lg z-20"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                  <div>
                    <p className="text-xs font-headline font-bold text-foreground">Qualité Garantie</p>
                    <p className="text-[10px] text-muted-foreground">Produits certifiés frais</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating badge bottom */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-16 -right-4 md:-right-8 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-lg z-20"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl">speed</span>
                  <div>
                    <p className="text-xs font-headline font-bold text-foreground">Livraison Rapide</p>
                    <p className="text-[10px] text-muted-foreground">Partout à Dakar</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
