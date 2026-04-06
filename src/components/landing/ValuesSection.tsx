import { motion } from "framer-motion";

const values = [
  { icon: "eco", title: "100% Naturel", desc: "Zéro pesticide chimique. Agriculture biologique et méthodes ancestrales." },
  { icon: "location_on", title: "Traçabilité Totale", desc: "Chaque produit a une origine. Niayes, Casamance, Vallée du Fleuve." },
  { icon: "favorite", title: "Prix Justes", desc: "Nos agriculteurs sont rémunérés équitablement. Pas d'intermédiaire." },
  { icon: "local_shipping", title: "Fraîcheur Express", desc: "De la récolte à votre porte en moins de 24 heures." },
  { icon: "security", title: "Paiement Sécurisé", desc: "Wave et Orange Money. Transactions instantanées et protégées." },
  { icon: "groups", title: "Impact Local", desc: "Chaque achat soutient directement les familles agricoles sénégalaises." },
];

const ValuesSection = () => {
  return (
    <section id="valeurs" className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky left title */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block w-12 h-0.5 bg-primary mb-6" />
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mb-4 leading-[1.05]">
              Nos
              <br />
              engagements.
            </h2>
            <p className="text-on-surface-variant font-body text-base leading-relaxed">
              Six promesses qui définissent notre façon de travailler et de servir le Sénégal.
            </p>
          </motion.div>
        </div>

        {/* Right: values grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative p-7 rounded-2xl border border-border/20 hover:border-primary/30 transition-all overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary text-lg group-hover:text-primary-container-foreground transition-colors">{v.icon}</span>
                  </div>
                  <h3 className="font-headline font-extrabold text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
