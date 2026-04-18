-- ============================================================
-- ADMIN POLICIES — full management for users with role 'admin'
-- ============================================================

-- PRODUCTS
CREATE POLICY "Admins can insert any product"
  ON public.products FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any product"
  ON public.products FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any product"
  ON public.products FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- PRODUCT IMAGES
CREATE POLICY "Admins can insert any product image"
  ON public.product_images FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any product image"
  ON public.product_images FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- CATEGORIES
CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- ORDERS
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any order"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- ORDER ITEMS
CREATE POLICY "Admins can view all order items"
  ON public.order_items FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- PROFILES (already viewable by everyone, add update for admin)
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- USER ROLES
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert any user role"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any user role"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- SHOPS
CREATE POLICY "Admins can update any shop"
  ON public.shops FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert any shop"
  ON public.shops FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- AGRUMEN UNIQUE SHOP — owned by first admin
-- ============================================================
DO $$
DECLARE
  first_admin_id uuid;
  agrumen_shop_id uuid;
BEGIN
  SELECT user_id INTO first_admin_id
  FROM public.user_roles
  WHERE role = 'admin'
  LIMIT 1;

  IF first_admin_id IS NOT NULL THEN
    SELECT id INTO agrumen_shop_id
    FROM public.shops
    WHERE name = 'Agrumen'
    LIMIT 1;

    IF agrumen_shop_id IS NULL THEN
      INSERT INTO public.shops (seller_id, name, description, city, is_active)
      VALUES (
        first_admin_id,
        'Agrumen',
        'Boutique officielle Agrumen — produits agricoles directement des producteurs sénégalais',
        'Dakar',
        true
      );
    END IF;
  END IF;
END $$;

-- ============================================================
-- STORAGE POLICIES — admins manage product-images bucket
-- ============================================================
CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND public.has_role(auth.uid(), 'admin')
  );