import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import waveLogo from "@/assets/wave-logo.png";
import orangeMoneyLogo from "@/assets/orange-money-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const CITIES = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Touba", "Rufisque", "Mbour", "Diourbel", "Tambacounda"];

const Checkout = () => {
  const { user, loading: authLoading, profile } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dakar");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wave");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: livraison, 2: paiement, 3: confirmation

  const formatPrice = (n: number) => n.toLocaleString("fr-FR") + " FCFA";

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && items.length === 0) navigate("/");
  }, [authLoading, user, items.length]);

  useEffect(() => {
    if (profile?.phone) setPhone(profile.phone);
    if (profile?.city) setCity(profile.city);
  }, [profile]);

  if (authLoading || !user || items.length === 0) return null;

  const handleOrder = async () => {
    setLoading(true);
    try {
      const { data: order, error: orderErr } = await supabase.from("orders").insert({
        buyer_id: user.id,
        total: totalPrice,
        shipping_address: address,
        shipping_city: city,
        phone,
        payment_method: paymentMethod,
      }).select().single();
      if (orderErr) throw orderErr;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        shop_id: item.shopId,
        quantity: item.quantity,
        unit_price: item.priceNum,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      clearCart();
      toast.success("Commande confirmée ! 🎉");
      navigate("/mes-commandes");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la commande");
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = address.trim().length > 0 && phone.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-32 md:pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-headline font-extrabold tracking-tight">Checkout</h1>
            <p className="text-xs text-on-surface-variant">Étape {step} sur 3</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-primary" : "bg-surface-container"}`} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Steps */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Step 1: Livraison */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="bg-surface-container-lowest rounded-2xl p-5 space-y-4 border border-border/30">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                      </div>
                      <h2 className="font-headline font-extrabold text-base">Adresse de livraison</h2>
                    </div>

                    <div>
                      <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">Adresse</label>
                      <input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Ex: Sacré Cœur 3, Villa 123"
                        className="w-full bg-surface-container-low rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">Ville</label>
                        <select
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="w-full bg-surface-container-low rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/20 appearance-none"
                        >
                          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">Téléphone</label>
                        <input
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="77 000 00 00"
                          type="tel"
                          className="w-full bg-surface-container-low rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body border border-border/20"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="w-full bg-foreground text-background py-4 rounded-md font-headline font-extrabold text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 shadow-lg flex items-center justify-center gap-2"
                  >
                    Continuer
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </motion.div>
              )}

              {/* Step 2: Paiement */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="bg-surface-container-lowest rounded-2xl p-5 space-y-5 border border-border/30">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">payments</span>
                      </div>
                      <h2 className="font-headline font-extrabold text-base">Mode de paiement</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wave")}
                        className={`relative p-5 rounded-md border-2 transition-all flex flex-col items-center gap-3 ${
                          paymentMethod === "wave"
                            ? "border-foreground bg-foreground/5 shadow-md"
                            : "border-border/30 hover:border-border"
                        }`}
                      >
                        {paymentMethod === "wave" && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                            <span className="material-symbols-outlined text-background text-xs">check</span>
                          </div>
                        )}
                        <img src={waveLogo} alt="Wave" className="w-12 h-12 rounded-xl object-cover" />
                        <span className="font-headline font-bold text-sm">Wave</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("orange_money")}
                        className={`relative p-5 rounded-md border-2 transition-all flex flex-col items-center gap-3 ${
                          paymentMethod === "orange_money"
                            ? "border-foreground bg-foreground/5 shadow-md"
                            : "border-border/30 hover:border-border"
                        }`}
                      >
                        {paymentMethod === "orange_money" && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                            <span className="material-symbols-outlined text-background text-xs">check</span>
                          </div>
                        )}
                        <img src={orangeMoneyLogo} alt="Orange Money" className="w-12 h-12 rounded-xl object-cover" />
                        <span className="font-headline font-bold text-sm">Orange Money</span>
                      </button>
                    </div>

                    <div className="flex items-start gap-2.5 bg-primary/5 rounded-xl p-3.5">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">info</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Après confirmation, vous recevrez une notification {paymentMethod === "wave" ? "Wave" : "Orange Money"} pour valider le paiement de <strong className="text-foreground">{formatPrice(totalPrice)}</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-foreground text-background py-4 rounded-md font-headline font-extrabold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Vérifier la commande
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Delivery summary */}
                  <div className="bg-surface-container-lowest rounded-2xl p-5 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                        <h3 className="font-headline font-bold text-sm">Livraison</h3>
                      </div>
                      <button onClick={() => setStep(1)} className="text-primary text-xs font-headline font-bold hover:underline">Modifier</button>
                    </div>
                    <div className="text-sm text-on-surface-variant space-y-0.5">
                      <p className="text-foreground font-medium">{address}</p>
                      <p>{city} • {phone}</p>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-surface-container-lowest rounded-2xl p-5 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">payments</span>
                        <h3 className="font-headline font-bold text-sm">Paiement</h3>
                      </div>
                      <button onClick={() => setStep(2)} className="text-primary text-xs font-headline font-bold hover:underline">Modifier</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={paymentMethod === "wave" ? waveLogo : orangeMoneyLogo}
                        alt={paymentMethod === "wave" ? "Wave" : "Orange Money"}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium">{paymentMethod === "wave" ? "Wave" : "Orange Money"}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-surface-container-lowest rounded-2xl p-5 border border-border/30">
                    <h3 className="font-headline font-bold text-sm mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">shopping_basket</span>
                      Articles ({items.length})
                    </h3>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-on-surface-variant">× {item.quantity}</p>
                          </div>
                          <span className="text-sm font-headline font-bold">{formatPrice(item.priceNum * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-foreground text-background py-4 rounded-md font-headline font-extrabold text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">shopping_basket</span>
                        Confirmer • {formatPrice(totalPrice)}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary (desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-surface-container-lowest rounded-2xl p-5 border border-border/30 sticky top-24">
              <h2 className="font-headline font-extrabold text-base mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">receipt_long</span>
                Récapitulatif
              </h2>
              <div className="space-y-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">{item.farmer} • × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-headline font-bold whitespace-nowrap">{formatPrice(item.priceNum * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Sous-total</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Livraison</span>
                  <span className="font-bold text-primary">Gratuite</span>
                </div>
                <div className="border-t border-border/30 pt-3 flex justify-between">
                  <span className="font-headline font-extrabold text-lg">Total</span>
                  <span className="font-headline font-extrabold text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sticky total bar */}
        <div className="fixed bottom-16 left-0 right-0 lg:hidden bg-background/80 backdrop-blur-xl border-t border-border/30 px-4 py-3 safe-area-bottom z-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant">{items.length} article{items.length > 1 ? "s" : ""}</p>
              <p className="font-headline font-extrabold text-lg">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-headline font-bold">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              Livraison gratuite
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
