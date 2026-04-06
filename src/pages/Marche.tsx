import Navbar from "@/components/Navbar";
import { toast } from "sonner";

import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buildMarketCategories, getCategoryKey, MOCK_PRODUCTS, type MarketProduct } from "@/data/marketplaceMocks";
import type { Category } from "@/types/database";
import ProductCard from "@/components/ProductCard";
import PromoCarousel from "@/components/PromoCarousel";

type Product = MarketProduct;

const Marche = () => {
  const { addItem } = useCart();
  const { user, profile } = useAuth();
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("cat");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (catId: string | null) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);

      if (catId) {
        next.set("cat", catId);
      } else {
        next.delete("cat");
      }

      return next;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, catRes] = await Promise.all([
        supabase
          .from("products")
          .select("*, shops(name, seller_id), categories(name, icon)")
          .eq("is_active", true)
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("name"),
      ]);
      if (prodRes.data) setDbProducts(prodRes.data as Product[]);
      if (catRes.data) setDbCategories(catRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Merge DB products with mock products (mock IDs start with "m")
  const products = useMemo(() => {
    const dbIds = new Set(dbProducts.map(p => p.id));
    // Only add mock products that don't conflict
    const mocks = MOCK_PRODUCTS.filter(m => !dbIds.has(m.id));
    return [...dbProducts, ...mocks];
  }, [dbProducts]);

  const categories = useMemo(() => buildMarketCategories(dbCategories), [dbCategories]);

  const categoryKeyById = useMemo(
    () => new Map(categories.map((category) => [category.id, getCategoryKey(category.name) ?? category.id])),
    [categories]
  );

  const selectedCategoryKey = useMemo(() => {
    if (!selectedCategory) return null;
    return categoryKeyById.get(selectedCategory) ?? getCategoryKey(selectedCategory);
  }, [selectedCategory, categoryKeyById]);

  const selectedCategoryLabel = useMemo(() => {
    if (!selectedCategoryKey) return null;

    return (
      categories.find((category) => (getCategoryKey(category.name) ?? category.id) === selectedCategoryKey)?.name ??
      "Catégorie"
    );
  }, [categories, selectedCategoryKey]);

  const isCategorySelected = (category: Category) =>
    selectedCategoryKey === (getCategoryKey(category.name) ?? category.id);

  const filtered = products.filter((p) => {
    const productCategoryKey =
      getCategoryKey(p.categories?.name) ??
      (p.category_id ? categoryKeyById.get(p.category_id) ?? getCategoryKey(p.category_id) : null);
    const matchCat = !selectedCategoryKey || productCategoryKey === selectedCategoryKey;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.id.startsWith("m")) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price.toLocaleString("fr-FR") + " FCFA",
      priceNum: product.price,
      unit: product.unit,
      image: product.image_url || "/placeholder.svg",
      farmer: product.shops?.name || "Producteur",
      shopId: product.shop_id,
    });
    toast.success(`${product.name} ajouté au panier`, { icon: "🧺" });
  };

  const formatPrice = (n: number) => n.toLocaleString("fr-FR");
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-surface-container-lowest pb-20 md:pb-0">
      <Navbar />
      <main className="pt-28 md:pt-24">

        {/* ═══════ BREADCRUMB ═══════ */}
        <section className="px-5 md:px-12 pt-3 md:pt-4 max-w-[1440px] mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            {selectedCategoryKey ? (
              <>
                <button onClick={() => handleCategoryChange(null)} className="hover:text-foreground transition-colors">
                  Marché
                </button>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-foreground font-semibold">{selectedCategoryLabel || "Catégorie"}</span>
              </>
            ) : (
              <span className="text-foreground font-semibold">Marché</span>
            )}
          </nav>
        </section>

        {/* ═══════ HEADER — all screens ═══════ */}
        <section className="px-5 md:px-12 pt-2 md:pt-4 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xl md:text-2xl font-headline font-bold tracking-tight">
                Salut{user ? `, ${firstName}` : ""} 👋
              </p>
              <p className="text-xs md:text-sm text-on-surface-variant font-normal">Qu'est-ce qu'on cuisine aujourd'hui ?</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm text-on-surface-variant font-headline font-bold">
                {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
              </span>
              <button className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">notifications</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">search</span>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container border-none font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </section>

        {/* ═══════ PROMO BANNERS CAROUSEL ═══════ */}
        <section className="px-5 md:px-12 mt-4 max-w-[1440px] mx-auto">
          <PromoCarousel />
        </section>

        {/* ═══════ CATEGORIES ═══════ */}
        <section className="px-5 md:px-12 mt-4 md:mb-6 max-w-[1440px] mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`shrink-0 px-4 py-2 rounded-md text-xs font-headline font-semibold transition-colors ${
                  !selectedCategoryKey
                  ? "bg-foreground text-background"
                  : "bg-surface-container text-on-surface-variant"
              }`}
            >
              Tout
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(isCategorySelected(cat) ? null : cat.id)}
                className={`shrink-0 px-4 py-2 rounded-md text-xs font-headline font-semibold transition-colors flex items-center gap-1.5 ${
                  isCategorySelected(cat)
                    ? "bg-foreground text-background"
                    : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {cat.icon && <span className="material-symbols-outlined text-sm">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* ═══════ PRODUCTS ═══════ */}
        <section className="mt-3 md:mt-0 max-w-[1440px] mx-auto pb-4">
          {loading ? (
            <div className="px-5 md:px-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-xl bg-surface-container mb-2" />
                  <div className="h-4 bg-surface-container rounded-lg w-3/4 mb-1.5" />
                  <div className="h-3 bg-surface-container rounded-lg w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 mx-5">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">search_off</span>
              <p className="font-headline font-bold text-lg mb-2">Aucun produit trouvé</p>
              <p className="text-on-surface-variant text-sm">
                {searchQuery ? "Essayez avec d'autres termes." : "Aucun produit dans cette catégorie."}
              </p>
            </div>
          ) : (
            /* All products grid - always show flat grid */
            <div className="px-5 md:px-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} formatPrice={formatPrice} index={i} />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Marche;
