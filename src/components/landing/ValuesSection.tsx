import { motion } from "framer-motion";
import farmPeppers from "@/assets/farm-peppers.jpg";
import farmTeam from "@/assets/farm-team.jpg";
import farmNursery1 from "@/assets/farm-nursery-1.jpg";
import farmNursery3 from "@/assets/farm-nursery-3.jpg";
import farmFieldWide from "@/assets/farm-field-wide.jpg";
import seedlingClose from "@/assets/seedling-close.jpg";

const ValuesSection = () => {
  return (
    <section id="valeurs" className="px-4 md:px-8 max-w-[1200px] mx-auto py-20 md:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1.05] max-w-2xl">
          Collaborez & Apprenez
          <br />
          <span className="text-on-surface-variant">de Nos Experts</span>
        </h2>
      </motion.div>

      {/* Masonry-like image grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Tall left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="col-span-1 row-span-2"
        >
          <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] rounded-2xl overflow-hidden group">
            <img
              src={farmPeppers}
              alt="Nos champs de piments"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={600}
              height={900}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-xs font-headline font-bold text-white/80 tracking-wider uppercase">Nos Champs</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img
              src={farmTeam}
              alt="Notre équipe sur le terrain"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[10px] font-headline font-bold text-white/80 tracking-wider uppercase">Notre Équipe</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img
              src={farmNursery1}
              alt="Pépinière"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[10px] font-headline font-bold text-white/80 tracking-wider uppercase">Pépinière</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img
              src={farmNursery3}
              alt="Culture en croissance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[10px] font-headline font-bold text-white/80 tracking-wider uppercase">Nos Cultures</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="col-span-1 md:col-span-2"
        >
          <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden group">
            <img
              src={farmFieldWide}
              alt="Vue panoramique de nos champs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={800}
              height={400}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2 shadow-lg">
                <span className="material-symbols-outlined text-primary text-xl">play_arrow</span>
                <span className="text-xs font-headline font-bold">Découvrir Notre Mission</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <img
              src={seedlingClose}
              alt="Jeune pousse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[10px] font-headline font-bold text-white/80 tracking-wider uppercase">Jeunes Pousses</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 md:mt-28 h-px bg-outline-variant" />
    </section>
  );
};

export default ValuesSection;
