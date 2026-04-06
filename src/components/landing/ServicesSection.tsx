import { motion } from "framer-motion";

const services = [
  {
    icon: "verified",
    title: "Qualité Garantie",
    desc: "Chaque produit est vérifié et sélectionné pour sa fraîcheur avant d'être expédié.",
  },
  {
    icon: "payments",
    title: "Paiement Flexible",
    desc: "Payez avec Wave, Orange Money ou carte bancaire en toute sécurité.",
  },
  {
    icon: "local_shipping",
    title: "Livraison Rapide",
    desc: "Livraison express partout à Dakar en moins de 24 heures.",
  },
  {
    icon: "smartphone",
    title: "Commande Facile",
    desc: "Parcourez notre catalogue et commandez en quelques clics depuis votre téléphone.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">
          Nos Services
        </span>
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mt-3">
          Pourquoi choisir <span className="text-primary">Agrumen</span> ?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.icon}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-border/20 hover:border-primary/30 hover:shadow-lg transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:text-primary-container-foreground transition-colors">
                {s.icon}
              </span>
            </div>
            <h3 className="text-base font-headline font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
