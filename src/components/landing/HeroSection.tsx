import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import phoneMockup from "@/assets/illust-phone-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary-container/10">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-container/10 translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-headline font-bold text-primary tracking-wide uppercase">
                Plateforme Agro N°1 au Sénégal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-headline font-extrabold tracking-[-0.03em] leading-[1.08] mb-6"
            >
              Produits <span className="text-primary">Frais</span> Livrés
              <br />
              Directement à Votre
              <br />
              Porte
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base md:text-lg text-on-surface-variant font-body leading-relaxed max-w-md mb-8"
            >
              Achetez des fruits, légumes et céréales 100% naturels depuis votre téléphone. Livraison rapide partout à Dakar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                to="/marche"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                Commander
              </Link>
              <Link
                to="/marche"
                className="inline-flex items-center gap-2 border-2 border-border px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:bg-surface-container transition-colors"
              >
                Explorer le Marché
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["AD", "MS", "FN", "KD"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-[10px] font-headline font-bold text-primary">{initials}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-headline font-bold">10K+ Clients Satisfaits</div>
                <div className="text-xs text-on-surface-variant">Livraisons réussies à Dakar</div>
              </div>
            </motion.div>
          </div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={phoneMockup}
              alt="Application Agrumen"
              className="w-[280px] md:w-[340px] lg:w-[420px] h-auto drop-shadow-2xl"
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
