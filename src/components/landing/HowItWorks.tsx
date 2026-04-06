import { motion } from "framer-motion";

const steps = [
  { icon: "search", num: "01", title: "Explorez", description: "Parcourez les produits frais de nos artisans locaux." },
  { icon: "add_shopping_cart", num: "02", title: "Composez", description: "Ajoutez vos produits préférés en un clic." },
  { icon: "payments", num: "03", title: "Payez", description: "Wave ou Orange Money. Paiement instantané." },
  { icon: "local_shipping", num: "04", title: "Recevez", description: "Livré chez vous en moins de 24h." },
];

const HowItWorks = () => {
  return (
    <section id="comment-ça-marche" className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">Simple & Rapide</span>
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mt-3">
          Comment ça marche ?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative group"
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-border/30" />
            )}

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-surface-container-lowest border border-border/30 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
              </div>
              <span className="text-[10px] font-headline font-bold text-on-surface-variant/50 uppercase tracking-widest">{step.num}</span>
              <h3 className="text-lg font-headline font-extrabold mt-1 mb-2">{step.title}</h3>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
