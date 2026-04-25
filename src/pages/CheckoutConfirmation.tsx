import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import leafImage from "@/assets/tracking-map.jpg";

interface OrderRow {
  id: string;
  total: number;
  created_at: string;
  shipping_city: string | null;
  payment_method: string | null;
}

interface OrderItemRow {
  id: string;
  quantity: number;
  unit_price: number;
  product_id: string;
  products?: { name: string; image_url: string | null } | null;
}

const CheckoutConfirmation = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (n: number) => n.toLocaleString("fr-FR") + " FCFA";

  useEffect(() => {
    if (!id || !user) return;
    const load = async () => {
      const [{ data: o }, { data: it }] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id).maybeSingle(),
        supabase.from("order_items").select("*, products(name, image_url)").eq("order_id", id),
      ]);
      if (o) setOrder(o);
      if (it) setItems(it as OrderItemRow[]);
      setLoading(false);
    };
    load();
  }, [id, user]);

  const reference = order ? `AGR-${order.id.slice(0, 8).toUpperCase()}` : "";
  const arrival = order ? new Date(new Date(order.created_at).getTime() + 1000 * 60 * 90).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";
  const arrivalEnd = order ? new Date(new Date(order.created_at).getTime() + 1000 * 60 * 150).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-32">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant animate-spin">progress_activity</span>
          </div>
        ) : !order ? (
          <div className="text-center py-20">
            <p className="font-headline font-bold text-lg">Commande introuvable</p>
            <Link to="/marche" className="inline-block mt-4 bg-foreground text-background px-6 py-3 rounded-md font-headline font-bold text-sm">
              Retour au marché
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-md border border-border/40 p-6 md:p-12"
          >
            {/* Hero header */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start mb-10">
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-md overflow-hidden bg-primary/10">
                  <img src={leafImage} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
              </div>

              <div className="flex-1">
                <span className="inline-block bg-primary-container/40 text-primary px-3 py-1 rounded-md text-[11px] font-headline font-bold uppercase tracking-wider mb-3">
                  Commande Confirmée
                </span>
                <h1 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight leading-[1.05]">
                  Merci pour<br />votre commande !
                </h1>
                <p className="text-sm text-on-surface-variant mt-3 max-w-md">
                  Vos produits frais sont en cours de préparation et seront bientôt en route vers votre porte.
                </p>
              </div>
            </div>

            {/* Reference + Arrival */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-md p-5 border border-border/30 border-dashed">
                <p className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                  Référence
                </p>
                <p className="text-xl font-headline font-extrabold tracking-tight">{reference}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Confirmation envoyée à {user?.email}
                </div>
              </div>

              <div className="bg-surface-container-low rounded-md p-5 border border-border/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Arrivée estimée
                  </p>
                  <p className="text-base font-headline font-extrabold leading-tight">
                    Aujourd'hui, {arrival} – {arrivalEnd}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">De la ferme à votre porte.</p>
                </div>
              </div>
            </div>

            {/* Order summary strip */}
            <div className="bg-surface-container-low rounded-md p-5 mb-8 flex items-center gap-4">
              <div className="flex -space-x-2 flex-shrink-0">
                {items.slice(0, 3).map((it) => (
                  <img
                    key={it.id}
                    src={it.products?.image_url || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-10 rounded-md object-cover border-2 border-card"
                  />
                ))}
                {items.length > 3 && (
                  <div className="w-10 h-10 rounded-md bg-foreground text-background border-2 border-card flex items-center justify-center text-xs font-headline font-bold">
                    +{items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-headline font-bold">Récapitulatif</p>
                <p className="text-xs text-on-surface-variant">
                  {items.length} article{items.length > 1 ? "s" : ""} · Livraison express
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-headline font-bold">Total payé</p>
                <p className="font-headline font-extrabold text-lg">{formatPrice(order.total)}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={`/checkout/tracking/${order.id}`}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-md font-headline font-extrabold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Suivre la commande
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                to="/marche"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border px-7 py-3.5 rounded-md font-headline font-extrabold text-sm hover:bg-surface-container-low transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>

            <div className="text-center mt-10 pt-8 border-t border-border/40">
              <p className="font-headline font-extrabold text-lg">Agrumen</p>
              <p className="text-[11px] text-on-surface-variant tracking-[0.3em] uppercase font-headline font-bold mt-1">
                Frais · Local · Direct
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CheckoutConfirmation;
