import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import waveLogo from "@/assets/wave-logo.png";
import orangeMoneyLogo from "@/assets/orange-money-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

interface CheckoutData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  paymentMethod: "wave" | "orange_money" | "cash";
}

const PAYMENT_LABELS: Record<string, { label: string; logo: string | null; expiry: string }> = {
  wave: { label: "Wave", logo: waveLogo, expiry: "Validation instantanée" },
  orange_money: { label: "Orange Money", logo: orangeMoneyLogo, expiry: "Code USSD requis" },
  cash: { label: "Paiement à la livraison", logo: null, expiry: "Espèces" },
};

const Review = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [data, setData] = useState<CheckoutData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const formatPrice = (n: number) => n.toLocaleString("fr-FR") + " FCFA";
  const serviceFee = Math.round(totalPrice * 0.02);
  const grandTotal = totalPrice + serviceFee;

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && items.length === 0) navigate("/marche");
    const stored = sessionStorage.getItem("checkout_data");
    if (!stored) {
      navigate("/checkout");
      return;
    }
    setData(JSON.parse(stored));
  }, [authLoading, user, items.length]);

  if (!data || !user) return null;

  const payment = PAYMENT_LABELS[data.paymentMethod];

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const { data: order, error: orderErr } = await supabase.from("orders").insert({
        buyer_id: user.id,
        total: grandTotal,
        shipping_address: data.address,
        shipping_city: data.city,
        phone: data.phone,
        payment_method: data.paymentMethod,
      }).select().single();
      if (orderErr) throw orderErr;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        shop_id: item.shopId,
        quantity: item.quantity,
        unit_price: item.priceNum,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      sessionStorage.removeItem("checkout_data");
      sessionStorage.setItem("last_order_id", order.id);
      clearCart();
      toast.success("Commande confirmée ! 🎉");
      navigate(`/checkout/confirmation/${order.id}`);
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la commande");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-32 md:pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <Link to="/checkout" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-foreground transition-colors mb-4">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Retour à la livraison
        </Link>

        <div className="mb-8">
          <p className="text-[11px] font-headline font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">
            Étape 2 sur 2
          </p>
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight">
            Vérifiez votre commande.
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 max-w-lg">
            Un dernier coup d'œil avant que nous préparions votre livraison à la ferme jusqu'à votre porte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Address + Payment + Items */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Delivery */}
              <section className="bg-card rounded-md p-5 border border-border/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-base">location_on</span>
                    </div>
                    <h3 className="font-headline font-bold text-sm">Adresse de livraison</h3>
                  </div>
                  <Link to="/checkout" className="text-xs font-headline font-bold text-on-surface-variant hover:text-foreground transition-colors">
                    Modifier
                  </Link>
                </div>
                <p className="text-sm font-medium">{data.fullName}</p>
                <p className="text-sm text-on-surface-variant mt-0.5">{data.address}</p>
                <p className="text-sm text-on-surface-variant">{data.city}{data.zipCode && ` ${data.zipCode}`}</p>
                <p className="text-sm text-on-surface-variant mt-1">{data.phone}</p>
              </section>

              {/* Payment */}
              <section className="bg-card rounded-md p-5 border border-border/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-base">credit_card</span>
                    </div>
                    <h3 className="font-headline font-bold text-sm">Paiement</h3>
                  </div>
                  <Link to="/checkout" className="text-xs font-headline font-bold text-on-surface-variant hover:text-foreground transition-colors">
                    Modifier
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  {payment.logo ? (
                    <img src={payment.logo} alt={payment.label} className="w-10 h-10 rounded-md object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{payment.label}</p>
                    <p className="text-xs text-on-surface-variant">{payment.expiry}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Items */}
            <section className="bg-card rounded-md p-6 border border-border/40">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-headline font-extrabold text-base">Votre sélection ({items.length} article{items.length > 1 ? "s" : ""})</h3>
              </div>

              <ul className="divide-y divide-border/40">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-headline font-bold tracking-wider uppercase text-on-surface-variant">{item.farmer}</p>
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">{item.quantity} {item.unit} · {item.price}</p>
                    </div>
                    <span className="text-sm font-headline font-bold whitespace-nowrap">
                      {formatPrice(item.priceNum * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>

          {/* Right: Summary + CTA */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-md p-6 border border-border/40 lg:sticky lg:top-24">
              <h2 className="font-headline font-extrabold text-base mb-5">Résumé</h2>

              <div className="space-y-2 text-sm">
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

              <div className="border-t border-border/40 mt-4 pt-4">
                <p className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant">Total à payer</p>
                <p className="font-headline font-extrabold text-3xl mt-1">{formatPrice(grandTotal)}</p>
              </div>

              <button
                onClick={handleConfirm}
                disabled={submitting}
                className="hidden lg:flex mt-5 w-full bg-foreground text-background py-4 rounded-md font-headline font-extrabold text-sm items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Traitement...
                  </>
                ) : (
                  <>
                    Confirmer & Payer
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Paiement sécurisé
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">eco</span>
                  Emballage zéro déchet
                </span>
              </div>
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
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-[1.6] bg-foreground text-background py-3.5 rounded-md font-headline font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {submitting ? "Traitement..." : "Confirmer & Payer"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Review;
