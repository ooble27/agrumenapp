import { useRef } from "react";
import { Link } from "react-router-dom";
import watermelonImg from "@/assets/watermelon-promo.png";
import papayaImg from "@/assets/papaya-promo.png";
import vegetablesImg from "@/assets/vegetables-promo.png";
import fruitsPromo from "@/assets/fruits-promo.png";

const banners = [
  {
    id: 1,
    bg: "bg-gradient-to-br from-[hsl(30,90%,55%)] to-[hsl(20,85%,48%)]",
    badge: "Saison 🍊",
    title: "Papayes & Mangues\ndu Terroir",
    cta: "Découvrir",
    link: "/marche?cat=fruits",
    image: papayaImg,
  },
  {
    id: 2,
    bg: "bg-gradient-to-br from-[hsl(150,45%,40%)] to-[hsl(160,50%,32%)]",
    badge: "Frais 🍉",
    title: "Pastèques\nJuteuses",
    cta: "Voir les fruits",
    link: "/marche?cat=fruits",
    image: watermelonImg,
  },
  {
    id: 3,
    bg: "bg-gradient-to-br from-[hsl(45,90%,52%)] to-[hsl(38,85%,45%)]",
    badgeColor: "bg-[hsl(30,60%,30%)]/80 text-white",
    titleColor: "text-[hsl(30,50%,15%)]",
    badge: "Promo 🔥",
    title: "Légumes Frais\nChaque Jour",
    cta: "Commander",
    link: "/marche?cat=legumes",
    image: vegetablesImg,
  },
  {
    id: 4,
    bg: "bg-gradient-to-br from-[hsl(78,50%,45%)] to-[hsl(85,45%,38%)]",
    badge: "Panier 🧺",
    title: "Produits Frais\ndu Marché",
    cta: "Voir tout",
    link: "/marche",
    image: fruitsPromo,
  },
  {
    id: 5,
    bg: "bg-gradient-to-br from-[hsl(355,65%,50%)] to-[hsl(340,60%,42%)]",
    badge: "Nouveau 🌶️",
    title: "Piments &\nÉpices Locales",
    cta: "Explorer",
    link: "/marche",
    image: vegetablesImg,
  },
  {
    id: 6,
    bg: "bg-gradient-to-br from-[hsl(200,55%,45%)] to-[hsl(210,50%,38%)]",
    badge: "Livraison 🚚",
    title: "Livré Chez Vous\nen 24h",
    cta: "Commander",
    link: "/marche",
    image: fruitsPromo,
  },
];

const PromoCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1"
      >
        {banners.map((banner) => {
          const isLight = !!banner.titleColor;
          return (
            <Link
              key={banner.id}
              to={banner.link}
              className={`shrink-0 w-[85%] md:w-[45%] lg:w-[30%] snap-start relative ${banner.bg} rounded-lg p-5 md:p-6 flex items-center overflow-hidden min-h-[140px] md:min-h-[160px] group`}
            >
              <div className="flex-1 relative z-10">
                <span className={`inline-block ${banner.badgeColor || "bg-white/20 backdrop-blur-sm text-white"} text-[10px] md:text-xs font-bold uppercase px-2.5 py-1 rounded mb-2`}>
                  {banner.badge}
                </span>
                <h3 className={`${isLight ? banner.titleColor : "text-white"} font-headline font-bold text-base md:text-xl leading-tight mb-2 whitespace-pre-line`}>
                  {banner.title}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 ${isLight ? "text-[hsl(30,50%,15%)] bg-[hsl(30,60%,30%)]/15" : "text-white bg-white/20"} text-xs font-semibold px-3 py-1.5 rounded-md group-hover:opacity-80 transition-opacity`}
                >
                  {banner.cta}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
              <img
                src={banner.image}
                alt=""
                className="w-28 md:w-36 h-28 md:h-36 object-contain -mr-2 -mb-3 -mt-1 relative z-10 drop-shadow-lg"
                loading="lazy"
                width={512}
                height={512}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PromoCarousel;
