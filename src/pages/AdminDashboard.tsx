import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, Package, ShoppingBag, TrendingUp, Trash2, Shield } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface UserRow {
  user_id: string;
  full_name: string;
  city: string | null;
  phone: string | null;
  created_at: string;
  role: string | null;
}

interface ProductRow {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  is_active: boolean;
  shop_id: string;
  created_at: string;
}

interface OrderRow {
  id: string;
  buyer_id: string;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
}

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
  });
  const [users, setUsers] = useState<UserRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);

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
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profilesRes, rolesRes, productsRes, ordersRes] = await Promise.all([
        supabase.from("profiles").select("user_id, full_name, city, phone, created_at").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("user_id, role"),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);

      const rolesMap = new Map<string, string>();
      (rolesRes.data ?? []).forEach((r) => rolesMap.set(r.user_id, r.role));

      const usersData: UserRow[] = (profilesRes.data ?? []).map((p) => ({
        ...p,
        role: rolesMap.get(p.user_id) ?? null,
      }));

      setUsers(usersData);
      setProducts(productsRes.data ?? []);
      setOrders(ordersRes.data ?? []);

      const totalRevenue = (ordersRes.data ?? [])
        .filter((o) => o.payment_status === "paid" || o.payment_status === "released")
        .reduce((sum, o) => sum + Number(o.total), 0);

      setStats({
        totalUsers: usersData.length,
        totalProducts: (productsRes.data ?? []).length,
        totalOrders: (ordersRes.data ?? []).length,
        totalRevenue,
      });
    } catch (e) {
      toast({ title: "Erreur de chargement", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleProductActive = async (p: ProductRow) => {
    const { error } = await supabase
      .from("products")
      .update({ is_active: !p.is_active })
      .eq("id", p.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, is_active: !p.is_active } : x))
    );
    toast({ title: "Produit mis à jour" });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Produit supprimé" });
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: status as never })
      .eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: "Statut mis à jour" });
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  if (checking || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Administration
              </h1>
              <p className="text-sm text-muted-foreground">
                Gestion globale de la plateforme Agrumen
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Utilisateurs"
            value={stats.totalUsers.toString()}
            loading={loading}
          />
          <StatCard
            icon={<Package className="h-5 w-5" />}
            label="Produits"
            value={stats.totalProducts.toString()}
            loading={loading}
          />
          <StatCard
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Commandes"
            value={stats.totalOrders.toString()}
            loading={loading}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Revenus"
            value={formatPrice(stats.totalRevenue)}
            loading={loading}
          />
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Tous les utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Aucun utilisateur</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Inscrit le</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.user_id}>
                          <TableCell className="font-medium">{u.full_name || "—"}</TableCell>
                          <TableCell>{u.city || "—"}</TableCell>
                          <TableCell>{u.phone || "—"}</TableCell>
                          <TableCell>
                            <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                              {u.role || "buyer"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(u.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Tous les produits</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Aucun produit</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell>
                            {formatPrice(Number(p.price))} / {p.unit}
                          </TableCell>
                          <TableCell>{p.stock}</TableCell>
                          <TableCell>
                            <Badge variant={p.is_active ? "default" : "secondary"}>
                              {p.is_active ? "Actif" : "Inactif"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleProductActive(p)}
                              >
                                {p.is_active ? "Désactiver" : "Activer"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteProduct(p.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Toutes les commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Aucune commande</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Paiement</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow key={o.id}>
                          <TableCell className="font-mono text-xs">
                            {o.id.slice(0, 8)}…
                          </TableCell>
                          <TableCell className="font-medium">{formatPrice(Number(o.total))}</TableCell>
                          <TableCell>
                            <Badge variant={o.payment_status === "paid" ? "default" : "secondary"}>
                              {o.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{o.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(o.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 flex-wrap">
                              {o.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateOrderStatus(o.id, "confirmed")}
                                >
                                  Confirmer
                                </Button>
                              )}
                              {o.status === "confirmed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateOrderStatus(o.id, "shipped")}
                                >
                                  Expédier
                                </Button>
                              )}
                              {o.status === "shipped" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateOrderStatus(o.id, "delivered")}
                                >
                                  Livrer
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  loading: boolean;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <p className="text-2xl font-display font-bold text-foreground truncate">{value}</p>
      )}
    </CardContent>
  </Card>
);

export default AdminDashboard;
