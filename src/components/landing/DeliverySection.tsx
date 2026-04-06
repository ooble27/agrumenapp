import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import illustDoorstepDelivery from "@/assets/illust-doorstep-delivery.png";

const DeliverySection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-inverse-surface rounded-3xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-container/8 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left — text */}
          <div className="relative z-10 p-8 md:p-14 lg:p-16">
            <span className="inline-block w-12 h-0.5 bg-primary-container mb-6" />
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-surface mb-4 leading-[1.1]">
              Du Champ
              <br />
              <span className="text-primary-container">à Votre Table.</span>
            </h3>
            <p className="text-sm md:text-base text-inverse-on-surface mb-8 leading-relaxed max-w-md font-body">
              Nos équipes parcourent le Sénégal pour sélectionner les meilleurs produits et vous les livrer directement chez vous. Frais, naturels, sans intermédiaires.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: "schedule", label: "Livraison en 24h" },
                { icon: "location_on", label: "Tout Dakar" },
                { icon: "eco", label: "100% Naturel" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-lg">{item.icon}</span>
                  <span className="text-[11px] text-inverse-on-surface font-headline font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/marche"
              className="inline-flex items-center gap-2 bg-primary-container text-primary-container-foreground px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:scale-[0.97] transition-transform w-fit"
            >
              Commander Maintenant
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>

          {/* Right — illustration */}
          <div className="relative flex items-center justify-center p-6 lg:p-10">
            <motion.img
              src={illustDoorstepDelivery}
              alt="Livraison à domicile"
              className="w-full max-w-[420px] lg:max-w-[480px] h-auto drop-shadow-2xl"
              loading="lazy"
              width={1024}
              height={1024}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DeliverySection;
