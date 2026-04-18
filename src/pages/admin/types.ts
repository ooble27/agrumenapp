export const AGRUMEN_SHOP_ID = "5e13a171-bd77-4bba-9137-47569f31a42c";

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockCount: number;
}

export interface UserRow {
  user_id: string;
  full_name: string;
  city: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  roles: string[];
}

export interface ProductRow {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  stock: number;
  is_active: boolean;
  shop_id: string;
  category_id: string | null;
  image_url: string | null;
  created_at: string;
}

export interface OrderRow {
  id: string;
  buyer_id: string;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  phone: string | null;
  created_at: string;
}

export interface OrderItemDetail {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  products: { name: string; image_url: string | null } | null;
}

export interface CategoryRow {
  id: string;
  name: string;
  icon: string | null;
}

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const PAYMENT_STATUSES = ["pending", "paid", "released", "refunded"] as const;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export const formatDate = (s: string) =>
  new Date(s).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatDateTime = (s: string) =>
  new Date(s).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
