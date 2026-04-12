import { motion } from "framer-motion";

const MissionSection = () => {
  return (
    <section id="mission" className="px-5 md:px-8 max-w-[1200px] mx-auto py-20 md:py-32">
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 text-xs font-headline font-semibold tracking-[0.15em] uppercase text-primary">
          <span className="inline-block h-px w-6 bg-primary" />
          Notre Mission
        </span>
      </motion.div>

      {/* Big statement */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <h2 className="text-2xl sm:text-3xl md:text-[2.8rem] lg:text-[3.5rem] font-headline font-extrabold tracking-[-0.03em] leading-[1.15]">
          Agrumen s'engage à créer un avenir plus juste et durable pour l'agriculture.{" "}
          <span className="text-on-surface-variant">
            Le vrai pouvoir appartient à la terre, avec le producteur comme acteur principal.
          </span>
        </h2>
      </motion.div>

      {/* 3 pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: "handshake", title: "Commerce Équitable", desc: "Des prix justes pour les producteurs, de la qualité pour les consommateurs." },
          { icon: "nature", title: "Agriculture Durable", desc: "Pratiques respectueuses de l'environnement et des saisons naturelles." },
          { icon: "diversity_3", title: "Impact Social", desc: "Chaque commande soutient directement les communautés agricoles locales." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 md:p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
            <h3 className="font-headline font-bold text-base md:text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 md:mt-28 h-px bg-outline-variant" />
    </section>
  );
};

export default MissionSection;
