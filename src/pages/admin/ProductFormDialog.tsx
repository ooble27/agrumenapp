import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";
import { AGRUMEN_SHOP_ID, type ProductRow, type CategoryRow } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductRow | null;
  categories: CategoryRow[];
  onSaved: () => void;
}

interface ImageEntry {
  id?: string;
  url: string;
  isNew?: boolean;
  file?: File;
}

export const ProductFormDialog = ({
  open,
  onOpenChange,
  product,
  categories,
  onSaved,
}: Props) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("le kg");
  const [stock, setStock] = useState("0");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<ImageEntry[]>([]);

  useEffect(() => {
    if (!open) return;
    if (product) {
      setName(product.name);
      setDescription(product.description ?? "");
      setPrice(String(product.price));
      setUnit(product.unit);
      setStock(String(product.stock));
      setCategoryId(product.category_id ?? "");
      setIsActive(product.is_active);
      // Load product images
      supabase
        .from("product_images")
        .select("id, image_url")
        .eq("product_id", product.id)
        .order("display_order")
        .then(({ data }) => {
          const existing: ImageEntry[] = (data ?? []).map((img) => ({
            id: img.id,
            url: img.image_url,
          }));
          if (product.image_url && !existing.some((e) => e.url === product.image_url)) {
            existing.unshift({ url: product.image_url });
          }
          setImages(existing);
        });
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setUnit("le kg");
      setStock("0");
      setCategoryId("");
      setIsActive(true);
      setImages([]);
    }
  }, [open, product]);

  const handleAddImages = (files: FileList | null) => {
    if (!files) return;
    const newOnes: ImageEntry[] = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      isNew: true,
      file,
    }));
    setImages((prev) => [...prev, ...newOnes]);
  };

  const handleRemoveImage = async (idx: number) => {
    const img = images[idx];
    if (img.id) {
      await supabase.from("product_images").delete().eq("id", img.id);
    }
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim() || !price) {
      toast({ title: "Champs requis", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const priceNum = parseInt(price, 10);
      const stockNum = parseInt(stock, 10) || 0;

      let productId = product?.id;
      const firstImageUrl = images.find((i) => !i.isNew)?.url ?? null;

      if (product) {
        const { error } = await supabase
          .from("products")
          .update({
            name: name.trim(),
            description: description.trim() || null,
            price: priceNum,
            unit,
            stock: stockNum,
            category_id: categoryId || null,
            is_active: isActive,
            image_url: firstImageUrl,
          })
          .eq("id", product.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert({
            shop_id: AGRUMEN_SHOP_ID,
            name: name.trim(),
            description: description.trim() || null,
            price: priceNum,
            unit,
            stock: stockNum,
            category_id: categoryId || null,
            is_active: isActive,
          })
          .select("id")
          .single();
        if (error) throw error;
        productId = data.id;
      }

      // Upload new images
      const newImages = images.filter((i) => i.isNew && i.file);
      let primaryImageUrl = firstImageUrl;
      for (let i = 0; i < newImages.length; i++) {
        const img = newImages[i];
        const ext = img.file!.name.split(".").pop() || "jpg";
        const path = `${productId}/${Date.now()}-${i}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("product-images")
          .upload(path, img.file!);
        if (uploadErr) {
          console.error("Upload error", uploadErr);
          continue;
        }
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);
        const publicUrl = urlData.publicUrl;
        await supabase.from("product_images").insert({
          product_id: productId!,
          image_url: publicUrl,
          display_order: images.length - newImages.length + i,
        });
        if (!primaryImageUrl) primaryImageUrl = publicUrl;
      }

      // Set primary image_url if it was empty
      if (!firstImageUrl && primaryImageUrl) {
        await supabase
          .from("products")
          .update({ image_url: primaryImageUrl })
          .eq("id", productId!);
      }

      toast({
        title: product ? "Produit mis à jour" : "Produit créé",
      });
      onOpenChange(false);
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      toast({ title: "Erreur", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Modifier le produit" : "Nouveau produit"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nom *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Prix (FCFA) *</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0}
                required
              />
            </div>
            <div>
              <Label>Unité</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="le kg">le kg</SelectItem>
                  <SelectItem value="le sac">le sac</SelectItem>
                  <SelectItem value="le panier">le panier</SelectItem>
                  <SelectItem value="la pièce">la pièce</SelectItem>
                  <SelectItem value="le litre">le litre</SelectItem>
                  <SelectItem value="le bouquet">le bouquet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min={0}
              />
            </div>
            <div>
              <Label>Catégorie</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="active"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="active" className="cursor-pointer">
              Produit actif (visible sur le marché)
            </Label>
          </div>

          <div>
            <Label>Images</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted group"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary text-xs gap-1">
                <Upload className="h-5 w-5" />
                Ajouter
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleAddImages(e.target.files)}
                />
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {product ? "Enregistrer" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
