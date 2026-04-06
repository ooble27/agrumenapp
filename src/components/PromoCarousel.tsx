import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import watermelonImg from "@/assets/watermelon-promo.png";
import papayaImg from "@/assets/papaya-promo.png";
import vegetablesImg from "@/assets/vegetables-promo.png";
import fruitsPromo from "@/assets/fruits-promo.png";

const banners = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-[hsl(220,35%,28%)] to-[hsl(230,30%,38%)]",
    badge: "Saison 🍊",
    title: "Papayes & Mangues\ndu Terroir",
    cta: "Découvrir",
    link: "/marche?cat=fruits",
    image: papayaImg,
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-[hsl(340,40%,35%)] to-[hsl(355,35%,42%)]",
    badge: "Frais 🍉",
    title: "Pastèques\nJuteuses",
    cta: "Voir les fruits",
    link: "/marche?cat=fruits",
    image: watermelonImg,
  },
  {
    id: 3,
    bg: "bg-gradient-to-r from-[hsl(25,50%,35%)] to-[hsl(35,45%,42%)]",
    badge: "Promo 🔥",
    title: "Légumes Frais\nChaque Jour",
    cta: "Commander",
    link: "/marche?cat=legumes",
    image: vegetablesImg,
  },
  {
    id: 4,
    bg: "bg-gradient-to-r from-[hsl(78,40%,28%)] to-[hsl(90,35%,35%)]",
    badge: "Panier 🧺",
    title: "Produits Frais\ndu Marché",
    cta: "Voir tout",
    link: "/marche",
    image: fruitsPromo,
  },
];

const PromoCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`relative ${banner.bg} rounded-lg p-5 md:p-8 flex items-center overflow-hidden min-h-[140px] md:min-h-[180px]`}
        >
          <div className="flex-1 relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold uppercase px-2.5 py-1 rounded mb-2">
              {banner.badge}
            </span>
            <h3 className="text-white font-headline font-bold text-lg md:text-2xl leading-tight mb-2 whitespace-pre-line">
              {banner.title}
            </h3>
            <Link
              to={banner.link}
              className="inline-flex items-center gap-1 text-white text-xs md:text-sm font-semibold bg-white/20 px-3 py-1.5 rounded-md hover:bg-white/30 transition-colors"
            >
              {banner.cta}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <img
            src={banner.image}
            alt=""
            className="w-32 md:w-44 h-32 md:h-44 object-contain -mr-2 -mb-4 -mt-2 relative z-10 drop-shadow-lg"
            loading="lazy"
            width={512}
            height={512}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
