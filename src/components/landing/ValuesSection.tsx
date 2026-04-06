import { motion } from "framer-motion";

const values = [
  { icon: "handshake", title: "Équité Radicale", desc: "Les agriculteurs fixent leurs propres prix. Zéro intermédiaire inutile." },
  { icon: "temp_preferences_custom", title: "Traçabilité Absolue", desc: "Chaque produit raconte une histoire. Du champ d'origine au producteur." },
  { icon: "nutrition", title: "Pureté Originelle", desc: "Zéro pesticide chimique. Méthodes ancestrales et biologiques." },
  { icon: "groups", title: "Communauté Forte", desc: "Un réseau de producteurs passionnés, unis pour nourrir le Sénégal." },
  { icon: "local_shipping", title: "Livraison Express", desc: "De la récolte à votre porte en moins de 24 heures." },
  { icon: "security", title: "Paiement Sécurisé", desc: "Wave et Orange Money. Transactions instantanées et protégées." },
];

const ValuesSection = () => {
  return (
    <section id="nos-valeurs" className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">Nos Engagements</span>
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mt-3">
          L'art de bien faire.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group p-7 rounded-2xl border border-border/20 hover:border-primary/30 hover:bg-surface-container-lowest transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary text-xl group-hover:text-primary-container-foreground transition-colors">{v.icon}</span>
            </div>
            <h3 className="font-headline font-extrabold text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;
