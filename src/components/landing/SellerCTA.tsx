import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SellerCTA = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="bg-inverse-surface rounded-3xl overflow-hidden relative">
        {/* Subtle gradient orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-container/10 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8 md:p-16 lg:p-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block w-12 h-0.5 bg-primary-container mb-8" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-tight text-surface mb-6 leading-[1.05]">
                Vous Cultivez.
                <br />
                Nous Vous Connectons.
              </h2>
              <p className="text-base md:text-lg text-inverse-on-surface mb-10 leading-relaxed max-w-lg font-body">
                Agrumen travaille main dans la main avec les agriculteurs sénégalais. Nous achetons vos récoltes au prix juste et les distribuons dans tout Dakar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { num: "0%", label: "Commission", icon: "trending_up" },
                  { num: "24h", label: "Paiement reçu", icon: "bolt" },
                  { num: "100%", label: "Traçabilité", icon: "visibility" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary-container/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container text-lg">{item.icon}</span>
                    </div>
                    <div className="text-2xl font-headline font-extrabold text-surface">{item.num}</div>
                    <div className="text-xs text-inverse-on-surface font-body mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/auth"
                className="inline-flex items-center gap-2 bg-primary-container text-primary-container-foreground px-8 py-4 rounded-full font-headline font-bold text-base hover:scale-[0.97] transition-transform"
              >
                Devenir Partenaire
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
