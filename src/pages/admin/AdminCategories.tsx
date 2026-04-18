import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { CategoryRow, ProductRow } from "./types";

interface Props {
  categories: CategoryRow[];
  products: ProductRow[];
  onChange: () => void;
}

const COMMON_ICONS = [
  "eco",
  "nutrition",
  "spa",
  "grass",
  "agriculture",
  "set_meal",
  "rice_bowl",
  "egg",
  "local_florist",
  "park",
];

export const AdminCategories = ({ categories, products, onChange }: Props) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("eco");

  const open = (cat: CategoryRow | null) => {
    setEditing(cat);
    setName(cat?.name ?? "");
    setIcon(cat?.icon ?? "eco");
    setDialogOpen(true);
  };

  const save = async () => {
    if (!name.trim()) return;
    if (editing) {
      const { error } = await supabase
        .from("categories")
        .update({ name: name.trim(), icon })
        .eq("id", editing.id);
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
        return;
      }
    } else {
      const { error } = await supabase
        .from("categories")
        .insert({ name: name.trim(), icon });
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
        return;
      }
    }
    setDialogOpen(false);
    onChange();
    toast({ title: editing ? "Catégorie mise à jour" : "Catégorie créée" });
  };

  const remove = async (cat: CategoryRow) => {
    const count = products.filter((p) => p.category_id === cat.id).length;
    if (count > 0) {
      toast({
        title: "Impossible",
        description: `${count} produit(s) utilisent cette catégorie`,
        variant: "destructive",
      });
      return;
    }
    if (!confirm(`Supprimer "${cat.name}" ?`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", cat.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    onChange();
    toast({ title: "Catégorie supprimée" });
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">Catégories ({categories.length})</CardTitle>
        <Button size="sm" onClick={() => open(null)}>
          <Plus className="h-4 w-4 mr-1" />
          Nouvelle
        </Button>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">Aucune catégorie</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category_id === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {cat.icon || "eco"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{count} produit{count > 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => open(cat)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => remove(cat)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Modifier la catégorie" : "Nouvelle catégorie"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nom</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                />
              </div>
              <div>
                <Label>Icône (Material Symbols)</Label>
                <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {COMMON_ICONS.map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIcon(i)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                        icon === i
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{i}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={save}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
