import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const LandingNavbar = () => {
  const { user, role } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-[60]"
    >
      <div className="mx-4 md:mx-8 mt-4">
        <div className="flex items-center justify-between px-5 md:px-8 py-3 max-w-[1200px] mx-auto rounded-2xl bg-white/8 backdrop-blur-xl border border-white/10">
          <Link to="/" className="text-lg font-black tracking-tighter text-white font-headline">
            Agrumen
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {["Marché", "Comment ça marche", "Nos valeurs"].map((item) => (
              <a
                key={item}
                href={item === "Marché" ? "/marche" : `#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-white/70 hover:text-white text-[13px] font-headline font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to={role === "seller" ? "/dashboard" : "/mon-compte"}
                className="bg-white text-foreground text-[13px] font-headline font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
              >
                Mon Compte
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-white/80 hover:text-white text-[13px] font-headline font-medium px-4 py-2.5 transition-colors hidden sm:block"
                >
                  Connexion
                </Link>
                <Link
                  to="/auth?role=seller"
                  className="bg-white text-foreground text-[13px] font-headline font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
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
