import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import type { Category } from "@/types/database";

const FALLBACK_CATEGORIES: { name: string; icon: string; id: string }[] = [
  { id: "fruits", name: "Fruits", icon: "nutrition" },
  { id: "legumes", name: "Légumes", icon: "eco" },
  { id: "cereales", name: "Céréales", icon: "grain" },
  { id: "tubercules", name: "Tubercules", icon: "spa" },
  { id: "epices", name: "Épices", icon: "local_fire_department" },
];

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, role, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [marcheOpen, setMarcheOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);
  const marcheRef = useRef<HTMLDivElement>(null);
  const marcheTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => {
      if (data && data.length > 0) setCategories(data);
    });
  }, []);

  const displayCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES as Category[];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (marcheRef.current && !marcheRef.current.contains(e.target as Node)) setMarcheOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setMarcheOpen(false);
  }, [location.pathname]);

  const accountPath = role === "seller" ? "/dashboard" : "/mon-compte";

  const handleMarcheEnter = () => { clearTimeout(marcheTimeout.current); setMarcheOpen(true); };
  const handleMarcheLeave = () => { marcheTimeout.current = setTimeout(() => setMarcheOpen(false), 150); };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 safe-area-top">
        <div className="flex items-center px-5 md:px-8 lg:px-10 py-2.5 max-w-[1440px] mx-auto w-full gap-1">
          {/* Logo */}
          <Link to="/" className="text-xl font-black tracking-tighter text-foreground font-headline shrink-0 mr-6">
            Agrumen
          </Link>

          {/* Desktop nav — LEFT aligned */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {/* Marché mega-menu */}
            <div
              ref={marcheRef}
              className="relative"
              onMouseEnter={handleMarcheEnter}
              onMouseLeave={handleMarcheLeave}
            >
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive("/marche") || marcheOpen
                    ? "text-foreground bg-surface-container"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/50"
                }`}
                onClick={() => setMarcheOpen(!marcheOpen)}
              >
                Marché
                <span
                  className="material-symbols-outlined text-[15px] transition-transform duration-200"
                  style={{ transform: marcheOpen ? "rotate(180deg)" : "none" }}
                >
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {marcheOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 bg-background rounded-2xl border border-border/40 shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden z-50"
                    style={{ width: "520px" }}
                    onMouseEnter={handleMarcheEnter}
                    onMouseLeave={handleMarcheLeave}
                  >
                    <div className="flex">
                      {/* Categories */}
                      <div className="flex-1 p-4">
                        <div className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-[0.12em] mb-2.5 px-2">
                          Catégories
                        </div>
                        <div className="grid grid-cols-2 gap-0.5">
                          {displayCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/marche?cat=${cat.id}`}
                              className="flex items-start gap-3 px-3 py-3 rounded-xl transition-colors group hover:bg-surface-container/50"
                            >
                              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary-container/40 transition-colors">
                                <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-colors">
                                  {cat.icon || "eco"}
                                </span>
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-foreground leading-tight">{cat.name}</div>
                                <div className="text-[11px] text-on-surface-variant/70 mt-0.5">Produits frais</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Side panel */}
                      <div className="w-44 bg-surface-container/20 p-4 border-l border-border/20">
                        <div className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-[0.12em] mb-2.5 px-2">
                          Explorer
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <Link to="/marche" className="px-3 py-2.5 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                            Tous les produits
                          </Link>
                          <Link to="/marche?sort=new" className="px-3 py-2.5 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                            Nouveautés
                          </Link>
                          <Link to="/marche?sort=popular" className="px-3 py-2.5 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                            Populaires
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user && (
              <Link
                to={accountPath}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive("/mon-compte") || (role === "seller" && isActive("/dashboard"))
                    ? "text-foreground bg-surface-container"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/50"
                }`}
              >
                Mon Compte
              </Link>
            )}

            {user && role === "seller" && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive("/dashboard")
                    ? "text-foreground bg-surface-container"
                    : "text-on-surface-variant hover:text-foreground hover:bg-surface-container/50"
                }`}
              >
                Mes Produits
              </Link>
            )}
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-1.5">
              {user ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary-container-foreground text-xs font-bold">
                      {(user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <span className="material-symbols-outlined text-[15px] transition-transform duration-200" style={{ transform: profileOpen ? "rotate(180deg)" : "none" }}>
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-background rounded-xl border border-border/40 shadow-[0_12px_36px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-border/20">
                          <div className="text-sm font-semibold text-foreground truncate">{user.email}</div>
                          <div className="text-[11px] text-on-surface-variant mt-0.5 capitalize">{role || "Utilisateur"}</div>
                        </div>
                        <div className="py-1">
                          <Link to={accountPath} className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                            <span className="material-symbols-outlined text-lg">person</span>
                            Mon Compte
                          </Link>
                          {role === "buyer" && (
                            <Link to="/mes-commandes" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                              <span className="material-symbols-outlined text-lg">receipt_long</span>
                              Mes Commandes
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-border/20 py-1">
                          <button
                            onClick={() => { signOut(); setProfileOpen(false); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-destructive hover:bg-destructive/5 transition-colors"
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
                  <Link to="/auth" className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                    Connexion
                  </Link>
                  <Link to="/auth?role=seller" className="px-4 py-2 rounded-full bg-foreground text-background text-[13px] font-semibold hover:opacity-90 transition-opacity">
                    Commencer
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container/50 transition-colors"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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
              className="fixed top-[49px] left-0 right-0 z-50 md:hidden bg-background border-b border-border/40 shadow-xl"
            >
              <div className="flex flex-col px-5 py-4 gap-0.5 max-h-[80vh] overflow-y-auto">
                {user && (
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-surface-container/40 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary-container-foreground font-bold">
                      {(user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{user.email}</div>
                      <div className="text-[11px] text-on-surface-variant capitalize">{role || "Utilisateur"}</div>
                    </div>
                  </div>
                )}

                <Link to="/marche" className="flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                  <span className="material-symbols-outlined text-lg">storefront</span>
                  Tous les produits
                </Link>

                <div className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-[0.12em] mt-3 mb-1.5 px-4">
                  Catégories
                </div>
                <div className="grid grid-cols-2 gap-0.5 mb-2">
                  {displayCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/marche?cat=${cat.id}`}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">{cat.icon || "eco"}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>

                {user && (
                  <div className="border-t border-border/20 mt-1 pt-2">
                    <Link to={accountPath} className="flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                      <span className="material-symbols-outlined text-lg">person</span>
                      Mon Compte
                    </Link>
                    {role === "seller" && (
                      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                        <span className="material-symbols-outlined text-lg">eco</span>
                        Mes Produits
                      </Link>
                    )}
                    {role === "buyer" && (
                      <Link to="/mes-commandes" className="flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium text-on-surface-variant hover:text-foreground hover:bg-surface-container/50 transition-colors">
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                        Mes Commandes
                      </Link>
                    )}
                  </div>
                )}

                <div className="border-t border-border/20 mt-2 pt-2">
                  {user ? (
                    <button
                      onClick={() => { signOut(); setMobileOpen(false); }}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[13px] font-medium text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Déconnexion
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/auth" className="flex items-center justify-center py-3 rounded-xl text-[13px] font-semibold text-on-surface-variant hover:bg-surface-container/50 transition-colors border border-border/30">
                        Connexion
                      </Link>
                      <Link to="/auth?role=seller" className="flex items-center justify-center py-3 rounded-full bg-foreground text-background text-[13px] font-semibold hover:opacity-90 transition-opacity">
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
