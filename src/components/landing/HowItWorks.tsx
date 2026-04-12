import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  { num: "01", icon: "search", title: "Parcourez", desc: "Explorez notre marché de produits frais, triés par catégorie et par saison." },
  { num: "02", icon: "shopping_cart", title: "Commandez", desc: "Ajoutez vos produits au panier et passez commande en quelques clics." },
  { num: "03", icon: "payments", title: "Payez", desc: "Wave, Orange Money ou carte bancaire — payez comme vous voulez." },
  { num: "04", icon: "local_shipping", title: "Recevez", desc: "Livraison à domicile en moins de 24h partout à Dakar." },
];

const HowItWorks = () => {
  return (
    <section className="px-5 md:px-8 max-w-[1200px] mx-auto py-20 md:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-headline font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            <span className="inline-block h-px w-6 bg-primary" />
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1.05]">
            Simple comme
            <br />
            <span className="text-on-surface-variant">1, 2, 3, 4.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/marche"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-headline font-bold hover:opacity-90 transition-opacity"
          >
            Commencer
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <span className="absolute top-5 right-5 text-[3rem] font-headline font-extrabold text-outline-variant/20 leading-none select-none">
              {step.num}
            </span>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">{step.icon}</span>
            </div>
            <h3 className="font-headline font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 md:mt-28 h-px bg-outline-variant" />
    </section>
  );
};

export default HowItWorks;
