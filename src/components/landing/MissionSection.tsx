import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import produceFlatlay from "@/assets/produce-flatlay.jpg";
import farmerPortrait from "@/assets/farmer-portrait.jpg";

const MissionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="mission" ref={ref} className="py-24 md:py-40 px-4 md:px-8 max-w-[1200px] mx-auto overflow-hidden">
      {/* Staggered editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left: Big statement */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block w-12 h-0.5 bg-primary mb-8" />
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-[-0.03em] leading-[1] mb-6">
              Nous cultivons
              <br />
              <span className="text-primary">la confiance.</span>
            </h2>
            <p className="text-base text-on-surface-variant font-body leading-relaxed mb-8 max-w-sm">
              Agrumen sélectionne les meilleurs producteurs du Sénégal, achète directement leurs récoltes et vous les livre avec une fraîcheur incomparable.
            </p>

            <div className="space-y-5">
              {[
                { num: "500+", label: "Producteurs partenaires" },
                { num: "24h", label: "De la récolte à votre porte" },
                { num: "0", label: "Intermédiaire entre vous et la terre" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-4">
                  <span className="text-3xl font-headline font-extrabold text-primary tracking-tight">{stat.num}</span>
                  <span className="text-sm text-on-surface-variant font-body">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Overlapping images with parallax */}
        <div className="lg:col-span-7 relative min-h-[500px] md:min-h-[600px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[55%] md:w-[50%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            <img
              src={farmerPortrait}
              alt="Agricultrice sénégalaise"
              className="w-full h-full object-cover"
              loading="lazy"
              width={800}
              height={1024}
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-[60%] md:w-[55%] aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={produceFlatlay}
              alt="Produits frais"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </motion.div>

          {/* Accent decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-primary/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
