import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import farmPeppers from "@/assets/farm-peppers.jpg";
import farmTeam from "@/assets/farm-team.jpg";
import farmFieldWide from "@/assets/farm-field-wide.jpg";

const steps = [
  {
    num: "01",
    icon: "search",
    title: "Explorez",
    desc: "Parcourez nos produits frais cueillis le jour même directement sur la plateforme.",
  },
  {
    num: "02",
    icon: "add_shopping_cart",
    title: "Commandez",
    desc: "Ajoutez vos produits au panier et choisissez votre créneau de livraison.",
  },
  {
    num: "03",
    icon: "payments",
    title: "Payez Facilement",
    desc: "Wave, Orange Money ou carte bancaire. Paiement instantané et sécurisé.",
  },
  {
    num: "04",
    icon: "local_shipping",
    title: "Recevez Chez Vous",
    desc: "Livré à votre porte en moins de 24h dans tout Dakar.",
  },
];

const SellerCTA = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
      {/* How it works — top part */}
      <div className="mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1.05]">
            Comment ça
            <br />
            <span className="text-on-surface-variant">marche ?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative p-6 rounded-2xl border border-border/20 hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="text-[3rem] font-headline font-extrabold text-border/15 leading-none select-none absolute -top-1 -left-1">
                  {step.num}
                </span>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 mt-6 group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl group-hover:text-primary-container-foreground transition-colors">
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-headline font-extrabold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-on-surface-variant font-body leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Big visual CTA with real photos */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-inverse-surface rounded-3xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-container/10 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — text */}
          <div className="relative z-10 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
            <span className="inline-block w-12 h-0.5 bg-primary-container mb-6" />
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-surface mb-4 leading-[1.1]">
              La fraîcheur,
              <br />
              sans compromis.
            </h3>
            <p className="text-sm md:text-base text-inverse-on-surface mb-8 leading-relaxed max-w-md font-body">
              De nos champs au Sénégal jusqu'à votre assiette, chaque produit est récolté, sélectionné et livré avec soin. Aucun intermédiaire. Aucun pesticide.
            </p>

            <div className="flex gap-8 mb-8">
              {[
                { num: "500+", label: "Producteurs" },
                { num: "24h", label: "Livraison" },
                { num: "100%", label: "Naturel" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl md:text-2xl font-headline font-extrabold text-primary-container">{stat.num}</div>
                  <div className="text-[11px] text-inverse-on-surface font-body mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/marche"
              className="inline-flex items-center gap-2 bg-primary-container text-primary-container-foreground px-7 py-3.5 rounded-full font-headline font-bold text-sm hover:scale-[0.97] transition-transform w-fit"
            >
              Découvrir nos produits
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>

          {/* Right — photo collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-2 p-4 h-full">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={farmPeppers}
                  alt="Nos cultures de piments"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={400}
                  height={500}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img
                    src={farmTeam}
                    alt="Notre équipe"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img
                    src={farmFieldWide}
                    alt="Nos champs"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile image */}
          <div className="lg:hidden h-[250px] overflow-hidden">
            <img
              src={farmFieldWide}
              alt="Nos champs"
              className="w-full h-full object-cover"
              loading="lazy"
              width={800}
              height={400}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SellerCTA;
