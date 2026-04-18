import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, LayoutDashboard, Package, FolderTree, ShoppingBag, Users } from "lucide-react";
import { AdminOverview } from "./admin/AdminOverview";
import { AdminProducts } from "./admin/AdminProducts";
import { AdminCategories } from "./admin/AdminCategories";
import { AdminOrders } from "./admin/AdminOrders";
import { AdminUsers } from "./admin/AdminUsers";
import type {
  AdminStats,
  UserRow,
  ProductRow,
  OrderRow,
  CategoryRow,
} from "./admin/types";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockCount: 0,
  });
  const [users, setUsers] = useState<UserRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    const checkAdmin = async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error || !data) {
        toast({
          title: "Accès refusé",
          description: "Cette page est réservée aux administrateurs.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    };
    checkAdmin();
  }, [user, authLoading, navigate, toast]);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profilesRes, rolesRes, productsRes, ordersRes, categoriesRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("user_id, full_name, city, phone, avatar_url, created_at")
          .order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id, role"),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("id, name, icon").order("name"),
      ]);

      const rolesMap = new Map<string, string[]>();
      (rolesRes.data ?? []).forEach((r) => {
        const arr = rolesMap.get(r.user_id) ?? [];
        arr.push(r.role);
        rolesMap.set(r.user_id, arr);
      });

      const usersData: UserRow[] = (profilesRes.data ?? []).map((p) => ({
        ...p,
        roles: rolesMap.get(p.user_id) ?? [],
      }));

      setUsers(usersData);
      setProducts(productsRes.data ?? []);
      setOrders(ordersRes.data ?? []);
      setCategories(categoriesRes.data ?? []);

      const totalRevenue = (ordersRes.data ?? [])
        .filter((o) => o.payment_status === "paid" || o.payment_status === "released")
        .reduce((sum, o) => sum + Number(o.total), 0);

      setStats({
        totalUsers: usersData.length,
        totalProducts: (productsRes.data ?? []).length,
        totalOrders: (ordersRes.data ?? []).length,
        totalRevenue,
        pendingOrders: (ordersRes.data ?? []).filter((o) => o.status === "pending").length,
        lowStockCount: (productsRes.data ?? []).filter((p) => p.stock <= 5 && p.is_active).length,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      toast({ title: "Erreur de chargement", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (checking || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Administration
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Gestion globale de la plateforme Agrumen
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 w-full md:w-auto justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="overview" className="gap-1.5">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tableau de bord</span>
              <span className="sm:hidden">Vue</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-1.5">
              <Package className="h-3.5 w-3.5" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-1.5">
              <FolderTree className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Catégories</span>
              <span className="sm:hidden">Cat.</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Utilisateurs</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview
              stats={stats}
              loading={loading}
              orders={orders}
              products={products}
              categories={categories}
            />
          </TabsContent>
          <TabsContent value="products">
            <AdminProducts
              products={products}
              categories={categories}
              loading={loading}
              onChange={loadData}
            />
          </TabsContent>
          <TabsContent value="categories">
            <AdminCategories
              categories={categories}
              products={products}
              onChange={loadData}
            />
          </TabsContent>
          <TabsContent value="orders">
            <AdminOrders
              orders={orders}
              users={users}
              loading={loading}
              onChange={loadData}
            />
          </TabsContent>
          <TabsContent value="users">
            <AdminUsers users={users} loading={loading} onChange={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
