import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { AdminStats, OrderRow, ProductRow, CategoryRow } from "./types";
import { formatPrice } from "./types";

interface Props {
  stats: AdminStats;
  loading: boolean;
  orders: OrderRow[];
  products: ProductRow[];
  categories: CategoryRow[];
}

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(142 71% 45%)",
  "hsl(45 93% 58%)",
  "hsl(15 85% 60%)",
  "hsl(265 70% 60%)",
];

const StatCard = ({
  icon,
  label,
  value,
  loading,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  loading: boolean;
  hint?: string;
}) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
    <Card className="overflow-hidden">
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
          <>
            <p className="text-2xl font-display font-bold text-foreground truncate">
              {value}
            </p>
            {hint && (
              <p className="text-xs text-muted-foreground mt-1">{hint}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export const AdminOverview = ({
  stats,
  loading,
  orders,
  products,
  categories,
}: Props) => {
  // Revenue by day (last 14 days)
  const revenueData = (() => {
    const days: { date: string; revenue: number; orders: number }[] = [];
    const map = new Map<string, { revenue: number; orders: number }>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map.set(key, { revenue: 0, orders: 0 });
    }
    orders.forEach((o) => {
      const key = o.created_at.slice(0, 10);
      if (map.has(key)) {
        const cur = map.get(key)!;
        cur.orders += 1;
        if (o.payment_status === "paid" || o.payment_status === "released") {
          cur.revenue += Number(o.total);
        }
      }
    });
    map.forEach((v, k) => {
      days.push({
        date: new Date(k).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
        }),
        revenue: v.revenue,
        orders: v.orders,
      });
    });
    return days;
  })();

  // Category breakdown
  const categoryData = categories
    .map((cat) => ({
      name: cat.name,
      value: products.filter((p) => p.category_id === cat.id).length,
    }))
    .filter((c) => c.value > 0);

  // Top products by stock activity (most stocked = most active assumption)
  const topProducts = [...products]
    .filter((p) => p.is_active)
    .sort((a, b) => Number(b.price) * b.stock - Number(a.price) * a.stock)
    .slice(0, 5)
    .map((p) => ({
      name: p.name.length > 14 ? p.name.slice(0, 14) + "…" : p.name,
      valeur: Number(p.price) * p.stock,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Utilisateurs"
          value={stats.totalUsers.toString()}
          loading={loading}
        />
        <StatCard
          icon={<Package className="h-5 w-5" />}
          label="Produits actifs"
          value={products.filter((p) => p.is_active).length.toString()}
          loading={loading}
          hint={`${stats.totalProducts} au total`}
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
          hint="Paiements confirmés"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="En attente"
          value={stats.pendingOrders.toString()}
          loading={loading}
          hint="À traiter"
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Stock faible"
          value={stats.lowStockCount.toString()}
          loading={loading}
          hint="≤ 5 unités"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenus — 14 derniers jours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => formatPrice(v)}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#revGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Commandes par jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {categoryData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Aucun produit catégorisé
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(e) => e.name}
                      labelLine={false}
                    >
                      {categoryData.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top produits (valeur stock)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {topProducts.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Aucun produit
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 10 }}
                      stroke="hsl(var(--muted-foreground))"
                      width={90}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => formatPrice(v)}
                    />
                    <Bar dataKey="valeur" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
