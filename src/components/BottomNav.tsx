import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/marche", icon: "storefront", label: "Marché" },
  { path: "__cart__", icon: "shopping_cart", label: "Panier" },
  { path: "__profile__", icon: "person", label: "Profil" },
];

const BottomNav = () => {
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { user, role } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  if (location.pathname === "/" || location.pathname.startsWith("/dashboard")) return null;

  const getProfilePath = () => (user ? (role === "seller" ? "/dashboard" : "/mon-compte") : "/auth");
  const isProfileActive = isActive("/mon-compte") || isActive("/auth");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-4 mb-4 safe-area-bottom">
        <div className="flex items-center justify-around bg-card/95 backdrop-blur-xl border border-border/30 rounded-2xl px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          {navItems.map((item) => {
            const isCart = item.path === "__cart__";
            const isProfile = item.path === "__profile__";
            const active = isCart ? false : isProfile ? isProfileActive : isActive(item.path);
            const href = isCart ? "#" : isProfile ? getProfilePath() : item.path;

            const content = (
              <div className="relative flex items-center justify-center">
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-primary shadow-[0_4px_12px_rgba(45,90,0,0.3)]"
                      : "bg-transparent"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <span
                    className={`material-symbols-outlined text-[24px] transition-all duration-300 ${
                      active ? "text-primary-foreground" : "text-on-surface-variant"
                    }`}
                    style={active ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : { fontVariationSettings: "'wght' 400" }}
                  >
                    {item.icon}
                  </span>
                </motion.div>
                {isCart && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-[20px] h-[20px] bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center z-20 shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
            );

            if (isCart) {
              return (
                <button key={item.path} onClick={() => setIsOpen(true)} className="outline-none">
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.path} to={href} className="outline-none">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
