import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Agriculteurs", icon: "agriculture" },
  { value: "10K+", label: "Produits livrés", icon: "local_shipping" },
  { value: "24h", label: "Livraison Dakar", icon: "schedule" },
  { value: "0%", label: "Pesticides", icon: "eco" },
];

const TrustBar = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center group"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-xl">{stat.icon}</span>
            </div>
            <div className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight mb-1">{stat.value}</div>
            <div className="text-sm text-on-surface-variant font-body">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
