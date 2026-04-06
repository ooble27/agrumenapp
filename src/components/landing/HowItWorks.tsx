import { motion } from "framer-motion";

const steps = [
  { icon: "search", title: "Explorez", desc: "Parcourez nos produits frais cueillis le jour même." },
  { icon: "add_shopping_cart", title: "Commandez", desc: "Ajoutez à votre panier et choisissez la livraison." },
  { icon: "payments", title: "Payez", desc: "Wave, Orange Money. Paiement instantané et sécurisé." },
  { icon: "local_shipping", title: "Recevez", desc: "Livré chez vous en moins de 24h à Dakar." },
];

const HowItWorks = () => {
  return (
    <section id="comment-ça-marche" className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="inline-block w-12 h-0.5 bg-primary mb-6" />
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight">
          Quatre étapes.
          <br />
          <span className="text-on-surface-variant">Zéro complication.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 rounded-3xl overflow-hidden">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-background p-8 md:p-12 group hover:bg-surface-container-lowest transition-colors"
          >
            <div className="flex items-start gap-5">
              <div className="relative">
                <span className="text-[4rem] font-headline font-extrabold text-border/20 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl group-hover:text-primary-container-foreground transition-colors">{step.icon}</span>
                </div>
              </div>
              <div className="pt-3">
                <h3 className="text-xl font-headline font-extrabold mb-2">{step.title}</h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
