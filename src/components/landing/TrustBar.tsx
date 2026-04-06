import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Producteurs Partenaires" },
  { value: "10K+", label: "Commandes Livrées" },
  { value: "24h", label: "Livraison Express" },
  { value: "100%", label: "Produits Naturels" },
];

const TrustBar = () => {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.04em] mb-2">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-on-surface-variant font-body">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-20 md:mt-28 h-px bg-outline-variant" />
    </section>
  );
};

export default TrustBar;
