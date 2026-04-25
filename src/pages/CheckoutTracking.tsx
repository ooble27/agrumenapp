import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import mapImage from "@/assets/tracking-map.jpg";

interface OrderRow {
  id: string;
  total: number;
  status: string;
  created_at: string;
  shipping_address: string | null;
  shipping_city: string | null;
  payment_method: string | null;
}

interface OrderItemRow {
  id: string;
  quantity: number;
  unit_price: number;
  products?: { name: string; image_url: string | null } | null;
}

const TIMELINE = [
  { key: "confirmed", label: "Commande confirmée", icon: "check_circle" },
  { key: "preparing", label: "Articles préparés", icon: "inventory_2" },
  { key: "shipped", label: "En cours de livraison", icon: "local_shipping" },
  { key: "delivered", label: "Livrée", icon: "home" },
];

const STATUS_INDEX: Record<string, number> = {
  pending: 0, confirmed: 0, preparing: 1, shipped: 2, delivered: 3, cancelled: -1,
};

const CheckoutTracking = () => {
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

  const currentIndex = order ? STATUS_INDEX[order.status] ?? 0 : 0;
  const reference = order ? `AGR-${order.id.slice(0, 8).toUpperCase()}` : "";
  const arrival = order ? new Date(new Date(order.created_at).getTime() + 1000 * 60 * 90).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";
  const arrivalEnd = order ? new Date(new Date(order.created_at).getTime() + 1000 * 60 * 150).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <Link to="/mes-commandes" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-foreground transition-colors mb-4">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Mes commandes
        </Link>

        {loading ? (
          <div className="text-center py-32">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant animate-spin">progress_activity</span>
          </div>
        ) : !order ? (
          <div className="text-center py-20">
            <p className="font-headline font-bold text-lg">Commande introuvable</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Map */}
              <div className="lg:col-span-2 bg-card rounded-md border border-border/40 overflow-hidden relative">
                <img src={mapImage} alt="Carte de livraison" className="w-full h-[280px] md:h-[420px] object-cover" loading="lazy" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <button className="w-9 h-9 rounded-md bg-card border border-border/40 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-base">add</span>
                  </button>
                  <button className="w-9 h-9 rounded-md bg-card border border-border/40 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-base">remove</span>
                  </button>
                </div>
              </div>

              {/* Status panel */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-primary-container/30 rounded-md p-5 border border-primary/20">
                  <p className="text-[11px] font-headline font-bold uppercase tracking-wider text-primary mb-1">
                    En route
                  </p>
                  <p className="text-xl font-headline font-extrabold leading-tight">Arrivée aujourd'hui</p>
                  <p className="text-sm text-on-surface-variant mt-1">{arrival} – {arrivalEnd}</p>
                </div>

                <div className="bg-card rounded-md p-5 border border-border/40">
                  <p className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                    Suivi de livraison
                  </p>

                  <div className="space-y-4">
                    {TIMELINE.map((step, i) => {
                      const done = i <= currentIndex;
                      const active = i === currentIndex;
                      return (
                        <div key={step.key} className="flex gap-3 relative">
                          {i < TIMELINE.length - 1 && (
                            <div className={`absolute left-[14px] top-8 w-px h-8 ${done ? "bg-primary" : "bg-border"}`} />
                          )}
                          <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                            done ? "bg-primary text-primary-foreground" : "bg-surface-container text-on-surface-variant"
                          }`}>
                            <span className="material-symbols-outlined text-sm">{step.icon}</span>
                          </div>
                          <div className="flex-1 pb-1">
                            <p className={`text-sm font-headline ${done ? "font-bold" : "font-medium text-on-surface-variant"}`}>
                              {step.label}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                              {active ? "En cours" : done ? "Terminé" : "À venir"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Driver */}
                <div className="bg-card rounded-md p-4 border border-border/40 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-primary-container flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">delivery_dining</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-headline font-bold">Mateo D.</p>
                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-tertiary">star</span>
                      4.9 · Livreur Agrumen
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-md bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-base">call</span>
                  </button>
                  <button className="w-9 h-9 rounded-md bg-surface-container text-foreground flex items-center justify-center hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-base">chat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-card rounded-md p-6 border border-border/40">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-headline font-extrabold text-base">Récapitulatif</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Commande #{reference} · {items.length} article{items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <Link to="/mes-commandes" className="text-xs font-headline font-bold text-primary flex items-center gap-1 hover:underline">
                  Reçu complet
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-surface-container-low rounded-md p-3 flex items-center gap-3">
                    <img
                      src={item.products?.image_url || "/placeholder.svg"}
                      alt={item.products?.name || ""}
                      className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.products?.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {item.quantity} × {formatPrice(item.unit_price)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-foreground text-background rounded-md p-4 flex flex-col justify-center">
                  <p className="text-[11px] uppercase tracking-wider opacity-70 font-headline font-bold">Total</p>
                  <p className="font-headline font-extrabold text-2xl">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CheckoutTracking;
