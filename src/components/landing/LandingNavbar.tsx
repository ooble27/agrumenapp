import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LandingNavbar = () => {
  const { user, role } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-[60]"
    >
      <div className="mx-4 md:mx-8 mt-4">
        <div
          className={`flex items-center justify-between px-5 md:px-8 py-3 max-w-[1200px] mx-auto rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "bg-background/80 backdrop-blur-xl border-border/40 shadow-lg"
              : "bg-white/8 backdrop-blur-xl border-white/10"
          }`}
        >
          <Link to="/" className={`text-lg font-black tracking-tighter font-headline transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            Agrumen
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Marché", href: "/marche" },
              { label: "Notre mission", href: "#mission" },
              { label: "Nos valeurs", href: "#valeurs" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[13px] font-headline font-medium px-4 py-2 rounded-xl transition-all ${
                  scrolled
                    ? "text-on-surface-variant hover:text-foreground hover:bg-surface-container-lowest"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to={role === "seller" ? "/dashboard" : "/mon-compte"}
                className={`text-[13px] font-headline font-bold px-5 py-2.5 rounded-xl transition-colors ${
                  scrolled
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-white text-foreground hover:bg-white/90"
                }`}
              >
                Mon Compte
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className={`text-[13px] font-headline font-medium px-4 py-2.5 transition-colors hidden sm:block ${
                    scrolled ? "text-on-surface-variant hover:text-foreground" : "text-white/80 hover:text-white"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  to="/auth"
                  className={`text-[13px] font-headline font-bold px-5 py-2.5 rounded-xl transition-colors ${
                    scrolled
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-white text-foreground hover:bg-white/90"
                  }`}
                >
                  Commencer
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavbar;
