import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import greenFields from "@/assets/green-fields.jpg";

const SellerCTA = () => {
  return (
    <section className="px-4 md:px-8 max-w-[1200px] mx-auto py-20 md:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1.05]">
            Vous Cultivez,
            <br />
            <span className="text-primary">Nous Connectons.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-on-surface-variant font-body leading-relaxed max-w-sm"
        >
          Agrumen achète directement vos récoltes et les met à disposition de milliers de consommateurs. Paiement garanti sous 24h.
        </motion.p>
      </div>

      {/* Full-width CTA image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden"
      >
        <img
          src={greenFields}
          alt="Rejoignez la révolution agricole"
          className="w-full h-[300px] md:h-[450px] lg:h-[500px] object-cover"
          loading="lazy"
          width={1200}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="p-8 md:p-16 max-w-lg">
            <span className="inline-block text-[11px] font-headline font-bold tracking-[0.2em] uppercase text-primary-container mb-4">
              Devenir Partenaire
            </span>
            <h3 className="text-2xl md:text-4xl font-headline font-extrabold text-white tracking-tight mb-4 leading-tight">
              Rejoignez la Révolution Agricole Aujourd'hui !
            </h3>
            <p className="text-sm text-white/70 font-body mb-6 max-w-xs">
              Nous achetons directement vos récoltes. 0% commission, paiement rapide, zéro tracas.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-headline font-bold hover:opacity-90 transition-opacity"
            >
              Nous Contacter
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SellerCTA;
