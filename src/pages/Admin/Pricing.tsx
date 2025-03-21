import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import { fetchPricing, supabase } from '@/lib/supabase';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Pricing } from '@/types/models';

type PricingPlan = Pricing;

const pricingSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  price: z.coerce.number().min(0, "Le prix doit être positif"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  features: z.string().min(5, "Les fonctionnalités sont requises"),
  popular: z.boolean().optional(),
});

type PricingFormValues = z.infer<typeof pricingSchema>;

const AdminPricing = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      features: "",
      popular: false,
    },
  });

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const loadPricingPlans = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPricing();
      setPricingPlans(data as PricingPlan[]);
    } catch (error) {
      console.error('Error loading pricing plans:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les forfaits",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    
    form.reset({
      name: plan.name,
      price: plan.price,
      description: plan.description,
      features: plan.features.join("\n"),
      popular: plan.popular || false,
    });
    
    setIsDialogOpen(true);
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    
    form.reset({
      name: "",
      price: 0,
      description: "",
      features: "",
      popular: false,
    });
    
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: PricingFormValues) => {
    try {
      const features = values.features
        .split("\n")
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);

      const planData = {
        name: values.name,
        price: values.price,
        description: values.description,
        features,
        popular: values.popular,
        updated_at: new Date().toISOString(),
      };
      
      if (editingPlan) {
        const { error } = await supabase
          .from('pricing')
          .update(planData)
          .eq('id', editingPlan.id);
          
        if (error) throw error;
        
        toast({
          title: "Forfait mis à jour",
          description: "Le forfait a été mis à jour avec succès",
        });
      } else {
        const { error } = await supabase
          .from('pricing')
          .insert([{
            ...planData,
            created_at: new Date().toISOString(),
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Forfait créé",
          description: "Le forfait a été créé avec succès",
        });
      }
      
      setIsDialogOpen(false);
      loadPricingPlans();
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le forfait",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!planToDelete) return;
    
    try {
      const { error } = await supabase
        .from('pricing')
        .delete()
        .eq('id', planToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Forfait supprimé",
        description: "Le forfait a été supprimé avec succès",
      });
      
      loadPricingPlans();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le forfait",
        variant: "destructive",
      });
    } finally {
      setPlanToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarifs</h1>
          <p className="text-muted-foreground">Gérez les forfaits et tarifs affichés sur votre site</p>
        </div>
        <Button onClick={handleAddPlan}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un forfait
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les forfaits</CardTitle>
          <CardDescription>
            Vous avez {pricingPlans.length} forfait{pricingPlans.length !== 1 ? 's' : ''} au total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin h-6 w-6 border-t-2 border-ulpra-yellow rounded-full"></span>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Populaire</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingPlans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Aucun forfait n'a été trouvé. Commencez par en ajouter un.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pricingPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{plan.price} €</TableCell>
                        <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                        <TableCell>
                          {plan.popular ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditPlan(plan)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setPlanToDelete(plan.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. Le forfait sera définitivement supprimé 
                                    de notre base de données.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setPlanToDelete(null)}>
                                    Annuler
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPlan ? 'Modifier le forfait' : 'Ajouter un forfait'}</DialogTitle>
            <DialogDescription>
              {editingPlan 
                ? 'Mettez à jour les informations du forfait' 
                : 'Remplissez les détails pour créer un nouveau forfait'
              }
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                placeholder="ex: Starter, Pro, Enterprise..." 
                {...form.register("name")} 
              />
              {form.formState.errors.name && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="0"
                {...form.register("price")} 
              />
              {form.formState.errors.price && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="Description courte du forfait" 
                {...form.register("description")} 
              />
              {form.formState.errors.description && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Fonctionnalités (une par ligne)</Label>
              <Textarea 
                id="features" 
                placeholder="Listez les fonctionnalités incluses, une par ligne"
                className="min-h-32"
                {...form.register("features")} 
              />
              {form.formState.errors.features && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.features.message}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="popular" 
                className="h-4 w-4 rounded border-gray-300 text-ulpra-yellow focus:ring-ulpra-yellow"
                {...form.register("popular")} 
              />
              <Label htmlFor="popular">Marquer comme forfait populaire</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {editingPlan ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPricing;
