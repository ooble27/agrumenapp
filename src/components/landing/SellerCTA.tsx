import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SellerCTA = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
      <div className="bg-inverse-surface rounded-3xl p-8 md:p-16 lg:p-20 overflow-hidden relative">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-container -translate-y-1/2 translate-x-1/4" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-surface">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-primary-container-foreground font-headline font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
              Vendeurs
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mb-6 leading-[1.1]">
              Vous Cultivez.
              <br />
              Nous Vous Connectons.
            </h2>
            <p className="text-base text-inverse-on-surface mb-8 leading-relaxed max-w-lg font-body">
              Devenez un Artisan Agrumen. Bénéficiez d'outils de gestion, de visibilité et de paiements instantanés via Wave et Orange Money.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {[
                { icon: "trending_up", title: "Revenu Direct", desc: "Fixez vos prix, zéro commission cachée." },
                { icon: "dashboard", title: "Dashboard Pro", desc: "Gérez produits et commandes facilement." },
                { icon: "visibility", title: "Visibilité", desc: "Touchez des milliers de clients à Dakar." },
                { icon: "bolt", title: "Paiement Instant", desc: "Recevez vos gains via mobile money." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-headline font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-inverse-on-surface font-body">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/auth?role=seller"
              className="inline-flex items-center gap-2 bg-primary-container text-primary-container-foreground px-8 py-4 rounded-full font-headline font-bold text-base hover:scale-[0.97] transition-transform"
            >
              Devenir Partenaire
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>

          <div className="flex-1 w-full max-w-sm">
            <div className="bg-surface/5 rounded-3xl p-8 border border-white/5 text-center">
              <span className="material-symbols-outlined text-primary-container text-7xl mb-4 block">storefront</span>
              <div className="text-2xl font-headline font-extrabold text-surface mb-2">Votre Boutique</div>
              <div className="text-sm text-inverse-on-surface font-body">Prête en 5 minutes</div>
              <div className="mt-6 space-y-3">
                {["Ajoutez vos produits", "Recevez les commandes", "Encaissez instantanément"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-white/5">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-primary-container-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm text-surface font-body">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
