import { motion } from "framer-motion";

const stats = [
  { icon: "groups", value: "500+", label: "Producteurs Partenaires" },
  { icon: "package_2", value: "10K+", label: "Commandes Livrées" },
  { icon: "bolt", value: "24h", label: "Livraison Express" },
  { icon: "verified", value: "100%", label: "Produits Naturels" },
];

const TrustBar = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 md:p-6 text-center group hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <span className="material-symbols-outlined text-xl">{stat.icon}</span>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-headline font-extrabold tracking-[-0.03em] mb-1">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-on-surface-variant font-body">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
