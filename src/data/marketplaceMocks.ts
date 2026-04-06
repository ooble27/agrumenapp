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
  { id: "cat-epices", name: "Épices", icon: "local_fire_department", created_at: "" },
];

const MOCK_SELLER_PROFILE: MockSellerProfile = {
  full_name: "Awa Ndiaye",
  avatar_url: null,
  city: "Dakar",
  phone: "+221 77 000 00 00",
};

const MOCK_SHOP: MockShopInfo = {
  name: "Ferme Bio Dakar",
  seller_id: "mock-seller",
  city: "Dakar",
  phone: "+221 77 000 00 00",
  location: "Marché central, Dakar",
};

type CreateMockProductParams = {
  id: string;
  name: string;
  price: number;
  unit: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  stock?: number;
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
}: CreateMockProductParams): MockProduct => {
  const category = MOCK_CATEGORIES.find((item) => item.id === categoryId);

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
    shops: { name: MOCK_SHOP.name, seller_id: MOCK_SHOP.seller_id },
    categories: category ? { name: category.name, icon: category.icon } : null,
    mockImages: [],
    mockSellerProfile: MOCK_SELLER_PROFILE,
    mockShop: MOCK_SHOP,
  };
};

const MOCK_EXTRA_IMAGES: Record<string, string[]> = {
  m1: [
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&h=800&fit=crop",
  ],
  m2: [
    "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=800&fit=crop",
  ],
  m3: [
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&h=800&fit=crop",
  ],
  m4: [
    "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1623841675712-45cf2e5d79a1?w=800&h=800&fit=crop",
  ],
  m5: [
    "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=800&fit=crop",
  ],
  m6: [
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=800&h=800&fit=crop",
  ],
  m7: [
    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587883012610-e3df17d1c63e?w=800&h=800&fit=crop",
  ],
  m8: [
    "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1582287014824-5765f48beb44?w=800&h=800&fit=crop",
  ],
  m11: [
    "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1587049693270-e6518bb2e71f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1508747703725-719586425921?w=800&h=800&fit=crop",
  ],
  m12: [
    "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=800&h=800&fit=crop",
  ],
  m13: [
    "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1613478881427-1c3607cea46f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1528826007177-f38517ce9a8c?w=800&h=800&fit=crop",
  ],
  m14: [
    "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=800&fit=crop",
  ],
  m15: [
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1592441379333-cb8bbce7e2c1?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1506365069540-904bcc762636?w=800&h=800&fit=crop",
  ],
  m16: [
    "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&h=800&fit=crop",
  ],
  m17: [
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=800&h=800&fit=crop",
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
    "https://images.unsplash.com/photo-1613478881427-1c3607cea46f?w=800&h=800&fit=crop",
  ],
  m42: [
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1573414404571-a42cf6441617?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&h=800&fit=crop",
  ],
};

export const MOCK_PRODUCTS: MockProduct[] = [
  createMockProduct({
    id: "m1",
    name: "Banane Plantain",
    price: 500,
    unit: "le kg",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    description: "Banane plantain ferme et généreuse, parfaite pour l'alloco, les grillades ou une cuisson au four.",
    stock: 32,
  }),
  createMockProduct({
    id: "m2",
    name: "Oranges",
    price: 700,
    unit: "le kg",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop",
    description: "Oranges juteuses récoltées à maturité pour le jus frais, les desserts et les paniers du quotidien.",
    stock: 28,
  }),
  createMockProduct({
    id: "m3",
    name: "Mangues Kent",
    price: 1500,
    unit: "le kg",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    description: "Mangues Kent sucrées, à chair fondante, idéales pour les smoothies, desserts et salades fraîches.",
    stock: 18,
  }),
  createMockProduct({
    id: "m4",
    name: "Papaye",
    price: 800,
    unit: "la pièce",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop",
    description: "Papaye mûre au goût doux et parfumé, parfaite au petit-déjeuner ou en salade de fruits.",
    stock: 14,
  }),
  createMockProduct({
    id: "m5",
    name: "Pastèque",
    price: 2000,
    unit: "la pièce",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=400&fit=crop",
    description: "Pastèque fraîche et désaltérante, sélectionnée pour les grandes tablées et les jus maison.",
    stock: 10,
  }),
  createMockProduct({
    id: "m6",
    name: "Pomme Verte",
    price: 1000,
    unit: "le kg",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    description: "Pommes vertes croquantes avec une légère acidité, idéales pour snacks et tartes.",
    stock: 20,
  }),
  createMockProduct({
    id: "m7",
    name: "Ananas",
    price: 1200,
    unit: "la pièce",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop",
    description: "Ananas parfumé et bien sucré, prêt à être servi nature, grillé ou en jus frais.",
    stock: 12,
  }),
  createMockProduct({
    id: "m8",
    name: "Citron Vert",
    price: 300,
    unit: "le kg",
    categoryId: "cat-fruits",
    imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop",
    description: "Citron vert intense et aromatique pour marinades, sauces, bissap et boissons fraîches.",
    stock: 26,
  }),
  createMockProduct({
    id: "m11",
    name: "Oignons",
    price: 350,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop",
    description: "Oignons de cuisson polyvalents pour sauces, thiéboudiène, grillades et préparations mijotées.",
    stock: 40,
  }),
  createMockProduct({
    id: "m12",
    name: "Piment Rouge",
    price: 600,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop",
    description: "Piment rouge vif pour relever les sauces, braisés et marinades avec une belle intensité.",
    stock: 22,
  }),
  createMockProduct({
    id: "m13",
    name: "Aubergine",
    price: 450,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop",
    description: "Aubergines charnues pour yassa, ragoûts, cuisson au four et accompagnements grillés.",
    stock: 19,
  }),
  createMockProduct({
    id: "m14",
    name: "Gombo",
    price: 500,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&h=400&fit=crop",
    description: "Gombo tendre pour sauces onctueuses, soupes et plats traditionnels sénégalais.",
    stock: 15,
  }),
  createMockProduct({
    id: "m15",
    name: "Poivron Vert",
    price: 550,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    description: "Poivrons verts croquants pour sauces, farces, salades et sautés rapides.",
    stock: 16,
  }),
  createMockProduct({
    id: "m16",
    name: "Concombre",
    price: 300,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
    description: "Concombre frais et croquant pour salades, sandwichs et eaux infusées.",
    stock: 17,
  }),
  createMockProduct({
    id: "m17",
    name: "Carotte",
    price: 400,
    unit: "le kg",
    categoryId: "cat-legumes",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    description: "Carottes douces et fermes pour jus, salades râpées, sauces et cuissons lentes.",
    stock: 24,
  }),
  createMockProduct({
    id: "m20",
    name: "Riz Brisé",
    price: 500,
    unit: "le kg",
    categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    description: "Riz brisé calibré pour les plats quotidiens, cuisson homogène et texture légère.",
    stock: 55,
  }),
  createMockProduct({
    id: "m21",
    name: "Mil",
    price: 400,
    unit: "le kg",
    categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
    description: "Mil local pour bouillies, couscous et recettes nourrissantes du quotidien.",
    stock: 38,
  }),
  createMockProduct({
    id: "m22",
    name: "Maïs",
    price: 350,
    unit: "le kg",
    categoryId: "cat-cereales",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
    description: "Maïs sec polyvalent pour grillades, farine maison et préparations traditionnelles.",
    stock: 35,
  }),
  createMockProduct({
    id: "m31",
    name: "Igname",
    price: 600,
    unit: "le kg",
    categoryId: "cat-tubercules",
    imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=800&fit=crop",
    description: "Igname nourrissante pour purées, frites, sauces et grands repas familiaux.",
    stock: 21,
  }),
  createMockProduct({
    id: "m41",
    name: "Curcuma",
    price: 3000,
    unit: "le kg",
    categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
    description: "Curcuma parfumé pour assaisonnements dorés, infusions et recettes bien-être.",
    stock: 9,
  }),
  createMockProduct({
    id: "m42",
    name: "Gingembre",
    price: 1500,
    unit: "le kg",
    categoryId: "cat-epices",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
    description: "Gingembre puissant et frais pour jus, marinades, pâtisserie et cuisine du quotidien.",
    stock: 13,
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