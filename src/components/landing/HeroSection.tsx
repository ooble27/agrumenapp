import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import phoneMockup from "@/assets/illust-phone-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[hsl(90,20%,95%)] via-background to-[hsl(100,30%,92%)]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <span className="inline-block border border-outline/30 rounded-full px-4 py-1.5 text-xs font-body tracking-wide text-on-surface-variant mb-6">
              PLATEFORME AGRICOLE N°1 AU SÉNÉGAL
            </span>

            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-headline font-extrabold text-foreground tracking-[-0.03em] leading-[1.05] mb-6">
              Produits Frais{" "}
              <span className="text-primary">Livrés</span>{" "}
              Directement à Votre{" "}
              <span className="text-primary">Porte</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground font-body max-w-md leading-relaxed mb-10">
              Votre marché en ligne pour commander des produits agricoles frais, suivre vos commandes et profiter de livraisons rapides.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/marche"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                Commander maintenant
              </Link>
              <Link
                to="/marche"
                className="inline-flex items-center gap-2 border border-outline/30 text-foreground px-7 py-3.5 rounded-full font-headline font-semibold text-sm hover:bg-surface-variant/50 active:scale-95 transition-all"
              >
                Explorer le Marché
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-primary text-sm">person</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-headline font-bold text-foreground">5000+ Clients Satisfaits</p>
                <p className="text-xs text-muted-foreground font-body">Livraisons fraîches chaque jour à Dakar</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={phoneMockup}
              alt="Application Agrumen sur mobile"
              className="w-[320px] md:w-[400px] lg:w-[460px] drop-shadow-2xl"
              width={928}
              height={1152}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
