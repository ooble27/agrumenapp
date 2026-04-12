import { motion } from "framer-motion";

const values = [
  { icon: "spa", title: "Fraîcheur Garantie", desc: "Récolté le matin, livré l'après-midi. Nos produits ne passent jamais par des entrepôts." },
  { icon: "public", title: "Circuit Court", desc: "Zéro intermédiaire entre le producteur et votre assiette. Plus frais, plus juste." },
  { icon: "eco", title: "Zéro Pesticide", desc: "Tous nos producteurs s'engagent à des pratiques agricoles 100% naturelles et responsables." },
  { icon: "favorite", title: "Impact Local", desc: "Chaque commande finance directement les agriculteurs sénégalais et leurs familles." },
  { icon: "inventory_2", title: "Emballage Éco", desc: "Nos emballages sont recyclables et conçus pour minimiser le gaspillage alimentaire." },
  { icon: "star", title: "Qualité Premium", desc: "Chaque produit est inspecté et sélectionné selon des standards de qualité stricts." },
];

const ValuesSection = () => {
  return (
    <section id="valeurs" className="px-5 md:px-8 max-w-[1200px] mx-auto py-20 md:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 md:mb-16 max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 text-xs font-headline font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
          <span className="inline-block h-px w-6 bg-primary" />
          Nos Valeurs
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1.05]">
          Ce qui nous
          <br />
          <span className="text-on-surface-variant">rend différents.</span>
        </h2>
      </motion.div>

      {/* Values grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {values.map((val, i) => (
          <motion.div
            key={val.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 md:p-8 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <span className="material-symbols-outlined text-xl">{val.icon}</span>
            </div>
            <h3 className="font-headline font-bold text-base md:text-lg mb-2">{val.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">{val.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 md:mt-28 h-px bg-outline-variant" />
    </section>
  );
};

export default ValuesSection;
