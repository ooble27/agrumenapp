import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import waveLogo from "@/assets/wave-logo.png";
import orangeMoneyLogo from "@/assets/orange-money-logo.png";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";

const CITIES = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Touba", "Rufisque", "Mbour", "Diourbel", "Tambacounda"];

const Checkout = () => {
  const { user, loading: authLoading, profile } = useAuth();
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dakar");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "orange_money" | "cash">("wave");

  const formatPrice = (n: number) => n.toLocaleString("fr-FR") + " FCFA";
  const deliveryFee = 0;
  const serviceFee = Math.round(totalPrice * 0.02);
  const grandTotal = totalPrice + deliveryFee + serviceFee;

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && items.length === 0) navigate("/marche");
  }, [authLoading, user, items.length]);

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
    if (profile?.phone) setPhone(profile.phone);
    if (profile?.city) setCity(profile.city);
    if (profile?.address) setAddress(profile.address);
  }, [profile]);

  if (authLoading || !user || items.length === 0) return null;

  const canSubmit = fullName.trim() && address.trim() && phone.trim();

  const handleContinue = () => {
    if (!canSubmit) return;
    sessionStorage.setItem("checkout_data", JSON.stringify({
      fullName, address, city, zipCode, phone, paymentMethod,
    }));
    navigate("/checkout/review");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-32 md:pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-headline font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">
            Paiement Sécurisé
          </p>
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight">
            Finalisez votre commande
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Forms */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Shipping */}
            <section className="bg-card rounded-md p-6 md:p-7 border border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                </div>
                <h2 className="font-headline font-extrabold text-lg">Adresse de livraison</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-headline font-bold text-on-surface-variant mb-1.5 block">Nom complet</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aminata Diop"
                    className="w-full bg-surface-container-low rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-headline font-bold text-on-surface-variant mb-1.5 block">Adresse complète</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Sacré Cœur 3, Villa 123"
                    className="w-full bg-surface-container-low rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-headline font-bold text-on-surface-variant mb-1.5 block">Ville</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-surface-container-low rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/30 appearance-none"
                    >
                      {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-headline font-bold text-on-surface-variant mb-1.5 block">Code postal</label>
                    <input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="11000"
                      className="w-full bg-surface-container-low rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-headline font-bold text-on-surface-variant mb-1.5 block">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="77 000 00 00"
                    className="w-full bg-surface-container-low rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/30"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-card rounded-md p-6 md:p-7 border border-border/40">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-lg">credit_card</span>
                </div>
                <h2 className="font-headline font-extrabold text-lg">Mode de paiement</h2>
              </div>

              <div className="space-y-3">
                {[
                  { id: "wave" as const, label: "Wave", logo: waveLogo, desc: "Paiement instantané" },
                  { id: "orange_money" as const, label: "Orange Money", logo: orangeMoneyLogo, desc: "Validation par code USSD" },
                  { id: "cash" as const, label: "Paiement à la livraison", logo: null, desc: "Espèces remises au livreur" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-md border transition-all text-left ${
                      paymentMethod === method.id
                        ? "border-foreground bg-foreground/[0.03]"
                        : "border-border/40 hover:border-border"
                    }`}
                  >
                    {method.logo ? (
                      <img src={method.logo} alt={method.label} className="w-10 h-10 rounded-md object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-headline font-bold text-sm">{method.label}</p>
                      <p className="text-xs text-on-surface-variant">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      paymentMethod === method.id ? "border-foreground bg-foreground" : "border-border"
                    }`}>
                      {paymentMethod === method.id && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">lock</span>
                Vos informations sont chiffrées et sécurisées
              </div>
            </section>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-md p-6 border border-border/40 lg:sticky lg:top-24">
              <h2 className="font-headline font-extrabold text-base mb-5">Récapitulatif</h2>

              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{item.quantity} × {item.price}</p>
                    </div>
                    <span className="text-sm font-headline font-bold whitespace-nowrap">
                      {formatPrice(item.priceNum * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-t border-border/40 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Sous-total</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Livraison</span>
                  <span className="font-medium text-primary">Gratuite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Frais de service</span>
                  <span className="font-medium">{formatPrice(serviceFee)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-border/40">
                <span className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface-variant">Total</span>
                <span className="font-headline font-extrabold text-2xl">{formatPrice(grandTotal)}</span>
              </div>

              <button
                onClick={handleContinue}
                disabled={!canSubmit}
                className="hidden lg:flex mt-5 w-full bg-foreground text-background py-4 rounded-md font-headline font-extrabold text-sm items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 shadow-lg"
              >
                Vérifier la commande
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <Link
                to="/marche"
                className="hidden lg:flex mt-3 w-full items-center justify-center text-xs text-on-surface-variant hover:text-foreground transition-colors gap-1"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Retour au marché
              </Link>
            </div>
          </motion.aside>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed bottom-16 left-0 right-0 lg:hidden bg-background/90 backdrop-blur-xl border-t border-border/40 px-4 py-3 safe-area-bottom z-40">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Total</p>
              <p className="font-headline font-extrabold text-lg leading-tight">{formatPrice(grandTotal)}</p>
            </div>
            <button
              onClick={handleContinue}
              disabled={!canSubmit}
              className="flex-[1.5] bg-foreground text-background py-3.5 rounded-md font-headline font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40"
            >
              Vérifier
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
