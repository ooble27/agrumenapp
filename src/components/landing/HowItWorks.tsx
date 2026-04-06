import { motion } from "framer-motion";
import illustSortingProduce from "@/assets/illust-sorting-produce.png";
import illustPackingOrder from "@/assets/illust-packing-order.png";
import deliveryMoto from "@/assets/delivery-moto.png";

const steps = [
  {
    step: "01",
    title: "Sélection Rigoureuse",
    desc: "Nos équipes sélectionnent les meilleurs produits directement auprès de nos agriculteurs partenaires.",
    image: illustSortingProduce,
    icon: "eco",
  },
  {
    step: "02",
    title: "Préparation Soignée",
    desc: "Chaque commande est emballée avec soin dans nos entrepôts pour garantir fraîcheur et qualité.",
    image: illustPackingOrder,
    icon: "inventory_2",
  },
  {
    step: "03",
    title: "Livraison Express",
    desc: "Nos livreurs vous apportent vos produits partout à Dakar en moins de 24 heures.",
    image: deliveryMoto,
    icon: "local_shipping",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.2em]">
          Comment ça marche
        </span>
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mt-3">
          Commandez en <span className="text-primary">3 Étapes</span>
        </h2>
        <p className="text-on-surface-variant font-body mt-4 max-w-lg mx-auto">
          Des produits frais sélectionnés, emballés et livrés avec soin jusqu'à votre porte.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group text-center"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-primary/5 flex items-center justify-center p-6 mb-6 mx-auto max-w-[280px]">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                loading="lazy"
                width={400}
                height={400}
              />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-sm font-headline font-bold text-primary-foreground">{s.step}</span>
              </div>
            </div>
            <h3 className="text-lg font-headline font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed max-w-xs mx-auto">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
