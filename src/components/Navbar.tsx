import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, role, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const accountPath = role === "seller" ? "/dashboard" : "/mon-compte";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 safe-area-top">
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 py-3 max-w-[1440px] mx-auto w-full">
          {/* Left — Logo */}
          <Link to="/" className="text-xl font-black tracking-tighter text-foreground font-headline shrink-0">
            Agrumen
          </Link>

          {/* Center — Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/marche"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/marche")
                  ? "text-foreground bg-surface-container"
                  : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/60"
              }`}
            >
              Marché
            </Link>

            {user && role === "seller" && (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "text-foreground bg-surface-container"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/60"
                }`}
              >
                Mes Produits
              </Link>
            )}

            {user && (
              <Link
                to={accountPath}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/mon-compte") || isActive("/dashboard")
                    ? "text-foreground bg-surface-container"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/60"
                }`}
              >
                Mon Compte
              </Link>
            )}
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary-container-foreground text-xs font-bold">
                      {(user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <span className="material-symbols-outlined text-base transition-transform" style={{ transform: profileOpen ? "rotate(180deg)" : "none" }}>
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-background rounded-xl border border-border/50 shadow-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-border/30">
                          <div className="text-sm font-bold text-foreground truncate">{user.email}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5 capitalize">{role || "Utilisateur"}</div>
                        </div>
                        <div className="py-1">
                          <Link
                            to={accountPath}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">person</span>
                            Mon Compte
                          </Link>
                          {role === "buyer" && (
                            <Link
                              to="/mes-commandes"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">receipt_long</span>
                              Mes Commandes
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-border/30 py-1">
                          <button
                            onClick={() => { signOut(); setProfileOpen(false); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/auth?role=seller"
                    className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Commencer
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container/60 transition-colors"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[53px] left-0 right-0 z-50 md:hidden bg-background border-b border-border/40 shadow-xl safe-area-top"
            >
              <div className="flex flex-col px-5 py-4 gap-0.5 max-h-[80vh] overflow-y-auto">
                {user && (
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-surface-container/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary-container-foreground font-bold">
                      {(user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">{user.email}</div>
                      <div className="text-xs text-on-surface-variant capitalize">{role || "Utilisateur"}</div>
                    </div>
                  </div>
                )}

                <Link to="/marche" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors">
                  <span className="material-symbols-outlined text-lg">storefront</span>
                  Marché
                </Link>

                {user && (
                  <>
                    <Link to={accountPath} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors">
                      <span className="material-symbols-outlined text-lg">person</span>
                      Mon Compte
                    </Link>
                    {role === "seller" && (
                      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors">
                        <span className="material-symbols-outlined text-lg">eco</span>
                        Mes Produits
                      </Link>
                    )}
                    {role === "buyer" && (
                      <Link to="/mes-commandes" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/60 transition-colors">
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                        Mes Commandes
                      </Link>
                    )}
                  </>
                )}

                <div className="border-t border-border/30 mt-2 pt-2">
                  {user ? (
                    <button
                      onClick={() => { signOut(); setMobileOpen(false); }}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Déconnexion
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/auth" className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container/60 transition-colors border border-border/40">
                        Connexion
                      </Link>
                      <Link to="/auth?role=seller" className="flex items-center justify-center py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
                        Commencer gratuitement
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
