import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (n: number) => n.toLocaleString("fr-FR");

  const handleCheckout = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background flex flex-col p-0">
        <SheetHeader
          className="px-5 pb-4 border-b border-border/30"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.25rem)" }}
        >
          <SheetTitle className="font-headline font-extrabold text-xl tracking-tight flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-xl">shopping_basket</span>
            Mon Panier
            {totalItems > 0 && (
              <span className="ml-auto text-xs bg-foreground text-background px-2.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">shopping_basket</span>
            </div>
            <p className="font-headline font-extrabold text-lg mb-1.5">Votre panier est vide</p>
            <p className="text-on-surface-variant text-sm mb-6 max-w-[240px]">Explorez notre marché et ajoutez des produits frais à votre panier.</p>
            <button
              onClick={() => { setIsOpen(false); navigate("/marche"); }}
              className="bg-foreground text-background px-6 py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Explorer le Marché
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -80, transition: { duration: 0.2 } }}
                    className="flex gap-3 bg-surface-container/40 rounded-xl p-3"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-headline font-bold text-sm truncate">{item.name}</h4>
                          <p className="text-[11px] text-on-surface-variant">{item.farmer} · {item.unit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-variant/40 hover:text-destructive transition-colors shrink-0 mt-0.5"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-0 bg-surface-container rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-l-lg hover:bg-background transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-7 text-center font-headline font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-r-lg hover:bg-background transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        <span className="font-headline font-extrabold text-sm">{formatPrice(item.priceNum * item.quantity)} <span className="text-[10px] font-normal text-on-surface-variant">FCFA</span></span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-border/30 px-5 py-5 space-y-3 safe-area-bottom">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                  <span className="font-headline font-bold">{formatPrice(totalPrice)} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Livraison</span>
                  <span className="font-headline font-bold text-primary">Gratuite</span>
                </div>
                <div className="h-px bg-border/30 my-1" />
                <div className="flex justify-between items-baseline">
                  <span className="font-headline font-extrabold">Total</span>
                  <span className="font-headline font-extrabold text-xl">{formatPrice(totalPrice)} <span className="text-xs font-normal text-on-surface-variant">FCFA</span></span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-foreground text-background py-3.5 rounded-2xl font-headline font-bold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <span className="material-symbols-outlined text-lg">shopping_basket</span>
                Commander · {formatPrice(totalPrice)} FCFA
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-on-surface-variant/60 hover:text-destructive font-medium transition-colors py-1"
              >
                Vider le panier
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
