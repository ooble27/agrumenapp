import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import waveLogo from "@/assets/wave-logo.png";
import orangeMoneyLogo from "@/assets/orange-money-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Step = "delivery" | "payment" | "confirm";

const STEPS: { key: Step; label: string; icon: string }[] = [
  { key: "delivery", label: "Livraison", icon: "local_shipping" },
  { key: "payment", label: "Paiement", icon: "payments" },
  { key: "confirm", label: "Confirmation", icon: "check_circle" },
];

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, totalItems, clearCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("delivery");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dakar");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wave");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ id: string; total: number } | null>(null);

  const formatPrice = (n: number) => n.toLocaleString("fr-FR");

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && items.length === 0 && !orderSuccess) navigate("/marche");
  }, [authLoading, user, items.length, orderSuccess]);

  const canProceedDelivery = address.trim().length >= 3 && city.trim().length >= 2 && phone.trim().length >= 7;

  const handleOrder = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Filter out mock products for real DB insert — mock IDs start with "m"
      const realItems = items.filter((i) => !i.id.startsWith("m"));
      const mockItems = items.filter((i) => i.id.startsWith("m"));

      if (realItems.length > 0) {
        const { data: order, error: orderErr } = await supabase
          .from("orders")
          .insert({
            buyer_id: user.id,
            total: totalPrice,
            shipping_address: address,
            shipping_city: city,
            phone,
            payment_method: paymentMethod,
          })
          .select()
          .single();
        if (orderErr) throw orderErr;

        const orderItems = realItems.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          shop_id: item.shopId,
          quantity: item.quantity,
          unit_price: item.priceNum,
        }));
        const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
        if (itemsErr) throw itemsErr;

        setOrderSuccess({ id: order.id, total: totalPrice });
      } else {
        // All mock — simulate success
        setOrderSuccess({ id: "demo-" + Date.now(), total: totalPrice });
      }

      if (mockItems.length > 0 && realItems.length > 0) {
        toast.info("Les produits de démonstration n'ont pas été inclus dans la commande réelle.");
      }

      clearCart();
      setStep("confirm");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la commande");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) return null;
  if (items.length === 0 && !orderSuccess) return null;

  // ─── SUCCESS SCREEN ───
  if (step === "confirm" && orderSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="hidden md:block"><Navbar /></div>
        <main className="pt-12 md:pt-32 pb-24 px-5 md:px-12 max-w-lg mx-auto text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-4xl filled">check_circle</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-headline font-extrabold mb-2">Commande confirmée !</h1>
            <p className="text-on-surface-variant text-sm mb-6">
              Votre commande de <span className="font-bold text-foreground">{formatPrice(orderSuccess.total)} FCFA</span> a été enregistrée avec succès.
            </p>

            <div className="bg-surface-container/50 rounded-2xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">N° de commande</span>
                <span className="font-mono font-bold text-xs">#{orderSuccess.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Paiement</span>
                <span className="font-bold flex items-center gap-1.5">
                  <img src={paymentMethod === "wave" ? waveLogo : orangeMoneyLogo} alt="" className="w-5 h-5 rounded-full object-cover" />
                  {paymentMethod === "wave" ? "Wave" : "Orange Money"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Livraison</span>
                <span className="font-bold">{address}, {city}</span>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-primary font-medium flex items-start gap-2">
                <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">info</span>
                Vous recevrez une notification {paymentMethod === "wave" ? "Wave" : "Orange Money"} pour finaliser le paiement.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/mes-commandes"
                className="w-full bg-foreground text-background py-3.5 rounded-2xl font-headline font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <span className="material-symbols-outlined text-lg">receipt_long</span>
                Voir mes commandes
              </Link>
              <Link
                to="/marche"
                className="w-full text-center text-sm text-on-surface-variant font-headline font-bold hover:text-foreground transition-colors py-2"
              >
                Continuer mes achats
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block"><Navbar /></div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20 safe-area-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => step === "delivery" ? navigate(-1) : setStep("delivery")} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <h1 className="font-headline font-extrabold text-lg flex-1">Checkout</h1>
          <span className="text-xs text-on-surface-variant font-bold">Étape {currentStepIndex + 1}/3</span>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1.5 px-4 pb-3">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= currentStepIndex ? "bg-foreground" : "bg-surface-container"}`}
            />
          ))}
        </div>
      </div>

      <main className="pt-[88px] md:pt-28 pb-32 md:pb-24 px-4 md:px-12 max-w-5xl mx-auto">
        {/* Desktop stepper */}
        <div className="hidden md:flex items-center justify-center gap-6 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= currentStepIndex ? "bg-foreground text-background" : "bg-surface-container text-on-surface-variant"}`}>
                {i < currentStepIndex ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`font-headline font-bold text-sm ${i <= currentStepIndex ? "text-foreground" : "text-on-surface-variant/50"}`}>{s.label}</span>
              {i < STEPS.length - 1 && <div className={`w-12 h-px ${i < currentStepIndex ? "bg-foreground" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "delivery" && (
                <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="bg-surface-container/30 border border-border/20 rounded-2xl p-5 space-y-4">
                    <h2 className="text-base font-headline font-extrabold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                      Adresse de livraison
                    </h2>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Adresse complète</label>
                      <input value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Ex: Quartier Almadies, Villa 23" className="w-full bg-background border border-border/30 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Ville</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Dakar" className="w-full bg-background border border-border/30 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Téléphone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="77 000 00 00" type="tel" className="w-full bg-background border border-border/30 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Cart items — editable */}
                  <div className="bg-surface-container/30 border border-border/20 rounded-2xl p-5">
                    <h2 className="text-base font-headline font-extrabold flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary text-lg">shopping_basket</span>
                      Articles ({totalItems})
                    </h2>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-headline font-bold text-sm truncate">{item.name}</p>
                            <p className="text-[11px] text-on-surface-variant">{item.unit}</p>
                          </div>
                          <div className="flex items-center gap-0 bg-surface-container rounded-lg shrink-0">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center">
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center">
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                          <span className="font-headline font-bold text-sm shrink-0">{formatPrice(item.priceNum * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="bg-surface-container/30 border border-border/20 rounded-2xl p-5 space-y-4">
                    <h2 className="text-base font-headline font-extrabold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">payments</span>
                      Mode de paiement
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: "wave", label: "Wave", logo: waveLogo },
                        { key: "orange_money", label: "Orange Money", logo: orangeMoneyLogo },
                      ].map((pm) => (
                        <button
                          key={pm.key}
                          type="button"
                          onClick={() => setPaymentMethod(pm.key)}
                          className={`p-4 rounded-xl border-2 font-bold text-center transition-all text-sm flex flex-col items-center gap-2.5 ${paymentMethod === pm.key ? "border-foreground bg-foreground/5 shadow-sm" : "border-border/30 hover:border-border"}`}
                        >
                          <img src={pm.logo} alt={pm.label} className="w-12 h-12 rounded-full object-cover" />
                          <span className="font-headline font-bold text-sm">{pm.label}</span>
                          {paymentMethod === pm.key && (
                            <span className="material-symbols-outlined text-foreground text-lg filled">check_circle</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-on-surface-variant bg-surface-container/50 rounded-lg p-3 flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">info</span>
                      Après validation, vous recevrez une notification {paymentMethod === "wave" ? "Wave" : "Orange Money"} sur le numéro <span className="font-bold">{phone || "..."}</span> pour confirmer le paiement.
                    </p>
                  </div>

                  {/* Delivery summary */}
                  <div className="bg-surface-container/30 border border-border/20 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-headline font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                        Livraison
                      </h3>
                      <button onClick={() => setStep("delivery")} className="text-xs text-primary font-bold">Modifier</button>
                    </div>
                    <p className="text-sm text-on-surface-variant">{address}</p>
                    <p className="text-sm text-on-surface-variant">{city} · {phone}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-surface-container/30 border border-border/20 rounded-2xl p-5 sticky top-28">
              <h2 className="text-base font-headline font-extrabold mb-4">Récapitulatif</h2>
              <div className="space-y-2.5 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5 text-sm">
                    <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <span className="flex-1 text-on-surface-variant truncate">{item.name} × {item.quantity}</span>
                    <span className="font-bold shrink-0">{formatPrice(item.priceNum * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Sous-total</span>
                  <span className="font-bold">{formatPrice(totalPrice)} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Livraison</span>
                  <span className="font-bold text-primary">Gratuite</span>
                </div>
                <div className="border-t border-border/20 pt-3 flex justify-between items-baseline">
                  <span className="font-headline font-extrabold">Total</span>
                  <span className="font-headline font-extrabold text-xl">{formatPrice(totalPrice)} <span className="text-xs font-normal text-on-surface-variant">FCFA</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/20 px-5 py-3 safe-area-bottom">
        <div className="max-w-5xl mx-auto">
          {/* Mobile total */}
          <div className="lg:hidden flex items-baseline justify-between mb-2">
            <span className="text-sm text-on-surface-variant">Total</span>
            <span className="font-headline font-extrabold text-lg">{formatPrice(totalPrice)} <span className="text-xs font-normal text-on-surface-variant">FCFA</span></span>
          </div>

          {step === "delivery" ? (
            <button
              onClick={() => setStep("payment")}
              disabled={!canProceedDelivery}
              className="w-full bg-foreground text-background py-3.5 rounded-2xl font-headline font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-30"
            >
              Continuer vers le paiement
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-foreground text-background py-3.5 rounded-2xl font-headline font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  Traitement...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Confirmer et payer · {formatPrice(totalPrice)} FCFA
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:block"><Footer /></div>
    </div>
  );
};

export default Checkout;
