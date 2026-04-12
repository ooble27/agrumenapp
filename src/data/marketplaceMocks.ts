import type { Category, Product as BaseProduct } from "@/types/database";

export type MarketProduct = BaseProduct & {
  shops: { name: string; seller_id: string } | null;
  categories: { name: string; icon: string | null } | null;
};

export type MockSellerProfile = {
  full_name: string;
  avatar_url: string | null;
  city: string | null;
  phone: string | null;
};

export type MockShopInfo = {
  name: string;
  seller_id: string;
  city: string | null;
  phone: string | null;
  location: string | null;
};

export type MockProduct = MarketProduct & {
  mockImages: string[];
  mockSellerProfile: MockSellerProfile;
  mockShop: MockShopInfo;
};

const normalizeCategoryValue = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const getCategoryKey = (value?: string | null) => {
  if (!value) return null;

  const normalized = normalizeCategoryValue(value).replace(/^cat-/, "");

  if (normalized.includes("fruit")) return "fruits";
  if (normalized.includes("legume")) return "legumes";
  if (normalized.includes("cereale") || normalized.includes("grain")) return "cereales";
  if (normalized.includes("tubercule")) return "tubercules";
  if (normalized.includes("epice") || normalized.includes("condiment")) return "epices";

  return normalized;
};

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-fruits", name: "Fruits", icon: "park", created_at: "" },
  { id: "cat-legumes", name: "Légumes", icon: "nutrition", created_at: "" },
  { id: "cat-cereales", name: "Céréales", icon: "grain", created_at: "" },
  { id: "cat-tubercules", name: "Tubercules", icon: "compost", created_at: "" },
  { id: "cat-epices", name: "Épices et Condiments", icon: "local_fire_department", created_at: "" },
];

const MOCK_SELLERS: MockSellerProfile[] = [
  { full_name: "Awa Ndiaye", avatar_url: null, city: "Dakar", phone: "+221 77 000 00 00" },
  { full_name: "Moussa Diallo", avatar_url: null, city: "Thiès", phone: "+221 78 111 11 11" },
  { full_name: "Fatou Sow", avatar_url: null, city: "Saint-Louis", phone: "+221 76 222 22 22" },
  { full_name: "Ibrahima Fall", avatar_url: null, city: "Kaolack", phone: "+221 77 333 33 33" },
];

const MOCK_SHOPS: MockShopInfo[] = [
  { name: "Ferme Bio Dakar", seller_id: "mock-seller-1", city: "Dakar", phone: "+221 77 000 00 00", location: "Marché central, Dakar" },
  { name: "Les Jardins de Thiès", seller_id: "mock-seller-2", city: "Thiès", phone: "+221 78 111 11 11", location: "Route de Thiès" },
  { name: "Agri Saint-Louis", seller_id: "mock-seller-3", city: "Saint-Louis", phone: "+221 76 222 22 22", location: "Marché Sor" },
  { name: "Ferme du Sine", seller_id: "mock-seller-4", city: "Kaolack", phone: "+221 77 333 33 33", location: "Kaolack centre" },
];

type CreateMockProductParams = {
  id: string;
  name: string;
  price: number;
  unit: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  stock?: number;
  sellerIdx?: number;
};

const createMockProduct = ({
  id,
  name,
  price,
  unit,
  categoryId,
  imageUrl,
  description,
  stock = 24,
  sellerIdx = 0,
}: CreateMockProductParams): MockProduct => {
  const category = MOCK_CATEGORIES.find((item) => item.id === categoryId);
  const seller = MOCK_SELLERS[sellerIdx % MOCK_SELLERS.length];
  const shop = MOCK_SHOPS[sellerIdx % MOCK_SHOPS.length];

  return {
    id,
    name,
    price,
    unit,
    category_id: categoryId,
    shop_id: "mock-shop",
    image_url: imageUrl,
    description,
    stock,
    is_active: true,
    created_at: "",
    updated_at: "",
    shops: { name: shop.name, seller_id: shop.seller_id },
    categories: category ? { name: category.name, icon: category.icon } : null,
    mockImages: [],
    mockSellerProfile: seller,
    mockShop: shop,
  };
};

const MOCK_EXTRA_IMAGES: Record<string, string[]> = {
  m1: [
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800&h=800&fit=crop",
  ],
  m2: [
    "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&h=800&fit=crop",
  ],
  m3: [
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&h=800&fit=crop",
  ],
  m4: [
    "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=800&h=800&fit=crop",
  ],
  m5: [
    "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&h=800&fit=crop",
  ],
  m6: [
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&h=800&fit=crop",
  ],
  m7: [
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=800&h=800&fit=crop",
  ],
  m8: [
    "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&h=800&fit=crop",
  ],
  m11: [
    "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587049693270-e6518bb2e71f?w=800&h=800&fit=crop",
  ],
  m12: [
    "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&h=800&fit=crop",
  ],
  m13: [
    "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1613478881427-1c3607cea46f?w=800&h=800&fit=crop",
  ],
  m14: [
    "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=800&fit=crop",
  ],
  m15: [
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1592441379333-cb8bbce7e2c1?w=800&h=800&fit=crop",
  ],
  m16: [
    "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&h=800&fit=crop",
  ],
  m17: [
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&h=800&fit=crop",
  ],
  m20: [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1536304993881-460e32f50f09?w=800&h=800&fit=crop",
  ],
  m21: [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=800&fit=crop",
  ],
  m22: [
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1601312283160-c76710690aca?w=800&h=800&fit=crop",
  ],
  m31: [
    "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1582515073548-c7f3e6e3a0bc?w=800&h=800&fit=crop",
  ],
  m41: [
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1607198179219-cd8b835fdda7?w=800&h=800&fit=crop",
  ],
  m42: [
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1573414404571-a42cf6441617?w=800&h=800&fit=crop",
  ],
};

export const MOCK_PRODUCTS: MockProduct[] = [
  // ═══ FRUITS ═══
  createMockProduct({
    id: "m1", name: "Banane Plantain", price: 500, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    description: "Banane plantain ferme et généreuse, parfaite pour l'alloco, les grillades ou une cuisson au four.", stock: 32,
  }),
  createMockProduct({
    id: "m2", name: "Oranges", price: 700, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop",
    description: "Oranges juteuses récoltées à maturité pour le jus frais, les desserts et les paniers du quotidien.", stock: 28,
  }),
  createMockProduct({
    id: "m3", name: "Mangues Kent", price: 1500, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    description: "Mangues Kent sucrées, à chair fondante, idéales pour les smoothies, desserts et salades fraîches.", stock: 18,
  }),
  createMockProduct({
    id: "m4", name: "Papaye", price: 800, unit: "la pièce", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop",
    description: "Papaye mûre au goût doux et parfumé, parfaite au petit-déjeuner ou en salade de fruits.", stock: 14,
  }),
  createMockProduct({
    id: "m5", name: "Pastèque", price: 2000, unit: "la pièce", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=400&fit=crop",
    description: "Pastèque fraîche et désaltérante, sélectionnée pour les grandes tablées et les jus maison.", stock: 10,
  }),
  createMockProduct({
    id: "m6", name: "Pomme Verte", price: 1000, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    description: "Pommes vertes croquantes avec une légère acidité, idéales pour snacks et tartes.", stock: 20,
  }),
  createMockProduct({
    id: "m7", name: "Ananas", price: 1200, unit: "la pièce", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop",
    description: "Ananas parfumé et bien sucré, prêt à être servi nature, grillé ou en jus frais.", stock: 12,
  }),
  createMockProduct({
    id: "m8", name: "Citron Vert", price: 300, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop",
    description: "Citron vert intense et aromatique pour marinades, sauces, bissap et boissons fraîches.", stock: 26,
  }),
  createMockProduct({
    id: "m9", name: "Noix de Coco", price: 400, unit: "la pièce", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1602635914174-2b05f8846e2b?w=400&h=400&fit=crop",
    description: "Noix de coco fraîche à boire ou à râper pour vos plats et desserts tropicaux.", stock: 15, sellerIdx: 1,
  }),
  createMockProduct({
    id: "m10", name: "Fruit de la Passion", price: 1800, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=400&h=400&fit=crop",
    description: "Fruit de la passion acidulé et parfumé, parfait pour les jus, cocktails et pâtisseries.", stock: 8, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m10b", name: "Banane Douce", price: 350, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&h=400&fit=crop",
    description: "Petites bananes douces et sucrées, idéales pour les enfants et les desserts rapides.", stock: 30, sellerIdx: 3,
  }),
  createMockProduct({
    id: "m10c", name: "Grenade", price: 2200, unit: "le kg", categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1615485925763-86786288908a?w=400&h=400&fit=crop",
    description: "Grenades rubis aux grains juteux, riches en antioxydants et vitamines.", stock: 7, sellerIdx: 1,
  }),

  // ═══ LÉGUMES ═══
  createMockProduct({
    id: "m11", name: "Oignons", price: 350, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop",
    description: "Oignons de cuisson polyvalents pour sauces, thiéboudiène, grillades et préparations mijotées.", stock: 40,
  }),
  createMockProduct({
    id: "m12", name: "Piment Rouge", price: 600, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop",
    description: "Piment rouge vif pour relever les sauces, braisés et marinades avec une belle intensité.", stock: 22,
  }),
  createMockProduct({
    id: "m13", name: "Aubergine", price: 450, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop",
    description: "Aubergines charnues pour yassa, ragoûts, cuisson au four et accompagnements grillés.", stock: 19,
  }),
  createMockProduct({
    id: "m14", name: "Gombo", price: 500, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop",
    description: "Gombo tendre pour sauces onctueuses, soupes et plats traditionnels sénégalais.", stock: 15,
  }),
  createMockProduct({
    id: "m15", name: "Poivron Vert", price: 550, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    description: "Poivrons verts croquants pour sauces, farces, salades et sautés rapides.", stock: 16,
  }),
  createMockProduct({
    id: "m16", name: "Concombre", price: 300, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
    description: "Concombre frais et croquant pour salades, sandwichs et eaux infusées.", stock: 17,
  }),
  createMockProduct({
    id: "m17", name: "Carotte", price: 400, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    description: "Carottes douces et fermes pour jus, salades râpées, sauces et cuissons lentes.", stock: 24,
  }),
  createMockProduct({
    id: "m18", name: "Tomate Fraîche", price: 400, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop",
    description: "Tomates fermes et juteuses pour salades, sauces et plats mijotés du quotidien.", stock: 35, sellerIdx: 1,
  }),
  createMockProduct({
    id: "m18b", name: "Laitue", price: 250, unit: "la pièce", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    description: "Laitue fraîche et croquante pour vos salades composées et sandwichs.", stock: 20, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m18c", name: "Chou Vert", price: 350, unit: "la pièce", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop",
    description: "Chou vert tendre pour potages, sautés et accompagnements nutritifs.", stock: 18, sellerIdx: 3,
  }),
  createMockProduct({
    id: "m18d", name: "Courgette", price: 500, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1563252722-6434563a985d?w=400&h=400&fit=crop",
    description: "Courgettes tendres pour grillades, poêlées et gratins légers.", stock: 14, sellerIdx: 0,
  }),
  createMockProduct({
    id: "m18e", name: "Ail Frais", price: 800, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?w=400&h=400&fit=crop",
    description: "Ail frais et parfumé, indispensable pour assaisonner sauces et plats mijotés.", stock: 25, sellerIdx: 1,
  }),
  createMockProduct({
    id: "m18f", name: "Haricots Verts", price: 650, unit: "le kg", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae10c4a?w=400&h=400&fit=crop",
    description: "Haricots verts fins et croquants pour accompagner viandes et poissons.", stock: 16, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m18g", name: "Persil", price: 150, unit: "la botte", categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1506073881649-4e23be3e9ed0?w=400&h=400&fit=crop",
    description: "Persil frais et aromatique pour garnir et assaisonner tous vos plats.", stock: 30, sellerIdx: 3,
  }),

  // ═══ CÉRÉALES ═══
  createMockProduct({
    id: "m20", name: "Riz Brisé", price: 500, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    description: "Riz brisé calibré pour les plats quotidiens, cuisson homogène et texture légère.", stock: 55,
  }),
  createMockProduct({
    id: "m21", name: "Mil", price: 400, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
    description: "Mil local pour bouillies, couscous et recettes nourrissantes du quotidien.", stock: 38,
  }),
  createMockProduct({
    id: "m22", name: "Maïs", price: 350, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
    description: "Maïs sec polyvalent pour grillades, farine maison et préparations traditionnelles.", stock: 35,
  }),
  createMockProduct({
    id: "m23", name: "Fonio", price: 900, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80&auto=format",
    description: "Fonio, céréale ancestrale africaine sans gluten, riche en acides aminés.", stock: 20, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m24", name: "Sorgho", price: 450, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    description: "Sorgho traditionnel pour bouillie, couscous et bière de mil artisanale.", stock: 28, sellerIdx: 3,
  }),
  createMockProduct({
    id: "m25", name: "Arachide", price: 600, unit: "le kg", categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1567892320421-2f68a76e5d78?w=400&h=400&fit=crop",
    description: "Arachides grillées ou crues pour mafé, sauces et snacks traditionnels.", stock: 40, sellerIdx: 1,
  }),

  // ═══ TUBERCULES ═══
  createMockProduct({
    id: "m31", name: "Igname", price: 600, unit: "le kg", categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=800&fit=crop",
    description: "Igname nourrissante pour purées, frites, sauces et grands repas familiaux.", stock: 21,
  }),
  createMockProduct({
    id: "m32", name: "Manioc", price: 350, unit: "le kg", categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1599690925058-90e1a0b56154?w=400&h=400&fit=crop",
    description: "Manioc frais pour attieké, foutou et accompagnements traditionnels.", stock: 25, sellerIdx: 1,
  }),
  createMockProduct({
    id: "m33", name: "Patate Douce", price: 450, unit: "le kg", categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1596097635121-14b63b7a5f14?w=400&h=400&fit=crop",
    description: "Patate douce orange et sucrée, idéale bouillie, en frites ou en purée.", stock: 19, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m34", name: "Pomme de Terre", price: 400, unit: "le kg", categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82bbe9e8?w=400&h=400&fit=crop",
    description: "Pommes de terre fermes pour frites, ragoûts et plats gratinés.", stock: 30, sellerIdx: 3,
  }),
  createMockProduct({
    id: "m35", name: "Taro", price: 550, unit: "le kg", categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
    description: "Taro doux et farineux pour purées, soupes et accompagnements savoureux.", stock: 12, sellerIdx: 0,
  }),

  // ═══ ÉPICES ═══
  createMockProduct({
    id: "m41", name: "Curcuma", price: 3000, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
    description: "Curcuma parfumé pour assaisonnements dorés, infusions et recettes bien-être.", stock: 9,
  }),
  createMockProduct({
    id: "m42", name: "Gingembre", price: 1500, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
    description: "Gingembre puissant et frais pour jus, marinades, pâtisserie et cuisine du quotidien.", stock: 13,
  }),
  createMockProduct({
    id: "m43", name: "Piment de Cayenne", price: 2500, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&h=400&fit=crop",
    description: "Piment de Cayenne séché, puissant et aromatique pour sauces piquantes.", stock: 11, sellerIdx: 1,
  }),
  createMockProduct({
    id: "m44", name: "Poivre Noir", price: 4000, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1599909533601-aa23a47b5fee?w=400&h=400&fit=crop",
    description: "Poivre noir en grains, fraîchement moulu pour un arôme intense et épicé.", stock: 8, sellerIdx: 2,
  }),
  createMockProduct({
    id: "m45", name: "Clou de Girofle", price: 5000, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1541855492-581f618f69a0?w=400&h=400&fit=crop",
    description: "Clous de girofle entiers pour infusions, marinades et pâtisseries parfumées.", stock: 6, sellerIdx: 3,
  }),
  createMockProduct({
    id: "m46", name: "Cannelle", price: 3500, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1608198399988-341dee9f9cda?w=400&h=400&fit=crop",
    description: "Bâtons de cannelle pour thé, café touba, desserts et plats sucrés-salés.", stock: 10, sellerIdx: 0,
  }),
  createMockProduct({
    id: "m47", name: "Noix de Muscade", price: 6000, unit: "le kg", categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
    description: "Noix de muscade entière à râper pour gratins, béchamel et boissons chaudes.", stock: 5, sellerIdx: 1,
  }),
];

// Patch mockImages after creation
MOCK_PRODUCTS.forEach((p) => {
  const extras = MOCK_EXTRA_IMAGES[p.id];
  if (extras) {
    p.mockImages = extras;
  } else if (p.image_url) {
    p.mockImages = [p.image_url];
  }
});

export const buildMarketCategories = (dbCategories: Category[]) => {
  const categoriesByKey = new Map<string, Category>();

  [...dbCategories, ...MOCK_CATEGORIES].forEach((category) => {
    const key = getCategoryKey(category.name) ?? category.id;
    if (!categoriesByKey.has(key)) {
      categoriesByKey.set(key, category);
    }
  });

  return Array.from(categoriesByKey.values());
};

export const findMockProduct = (id?: string | null) =>
  MOCK_PRODUCTS.find((product) => product.id === id) ?? null;

export const getMockRelatedProducts = (product: MockProduct, limit = 6) => {
  const categoryKey = getCategoryKey(product.categories?.name ?? product.category_id);

  return MOCK_PRODUCTS.filter((candidate) => {
    if (candidate.id === product.id) return false;
    return getCategoryKey(candidate.categories?.name ?? candidate.category_id) === categoryKey;
  }).slice(0, limit);
};

/** Group products by category for horizontal scroll sections */
export const groupByCategory = (products: MarketProduct[]) => {
  const groups = new Map<string, { label: string; icon: string | null; products: MarketProduct[] }>();

  products.forEach((p) => {
    const key = getCategoryKey(p.categories?.name ?? p.category_id) ?? "autres";
    if (!groups.has(key)) {
      groups.set(key, {
        label: p.categories?.name ?? "Autres",
        icon: p.categories?.icon ?? null,
        products: [],
      });
    }
    groups.get(key)!.products.push(p);
  });

  return Array.from(groups.values());
};
