
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';

const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

type Category = {
  id: string;
  name: string;
  project_count?: number;
};

const ProjectCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      // Get distinct categories from projects table
      const { data, error } = await supabase
        .from('projects')
        .select('category')
        .order('category');
        
      if (error) throw error;
      
      // Count number of projects per category
      const categoryCounts: Record<string, number> = {};
      data.forEach(item => {
        if (item.category) {
          categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
        }
      });
      
      // Create categories array
      const uniqueCategories = Array.from(new Set(data.map(item => item.category)))
        .filter(Boolean)
        .map((category, index) => ({
          id: index.toString(),
          name: category || '',
          project_count: categoryCounts[category || ''] || 0
        }));
      
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    setIsSubmitting(true);
    try {
      // Check if category already exists
      if (categories.some(cat => cat.name.toLowerCase() === values.name.toLowerCase())) {
        toast({
          title: "Catégorie existante",
          description: "Cette catégorie existe déjà",
          variant: "destructive",
        });
        return;
      }
      
      // Add new category to list
      const newCategory = {
        id: Date.now().toString(),
        name: values.name,
        project_count: 0,
      };
      
      setCategories(prev => [...prev, newCategory]);
      
      toast({
        title: "Catégorie ajoutée",
        description: "La catégorie a été ajoutée avec succès",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    try {
      const categoryName = categories.find(cat => cat.id === categoryToDelete)?.name;
      
      if (!categoryName) {
        setCategoryToDelete(null);
        return;
      }
      
      // Update projects with this category to have no category
      const { error } = await supabase
        .from('projects')
        .update({ category: null })
        .eq('category', categoryName);
        
      if (error) throw error;
      
      // Remove from local state
      setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete));
      
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/projects')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux projets
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Catégories de projets</h1>
          <p className="text-muted-foreground">
            Gérez les catégories utilisées pour organiser vos projets
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une catégorie</CardTitle>
            <CardDescription>
              Créez une nouvelle catégorie pour classer vos projets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la catégorie</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input placeholder="ex: Web design" {...field} />
                        </FormControl>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                          Ajouter
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Catégories existantes</CardTitle>
            <CardDescription>
              {categories.length} catégorie{categories.length !== 1 ? 's' : ''} au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-6 w-6 animate-spin text-ulpra-yellow" />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune catégorie n'a été trouvée. Commencez par en ajouter une.
              </div>
            ) : (
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li 
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-md border"
                  >
                    <div className="flex items-center gap-2">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.project_count} projet{category.project_count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setCategoryToDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action supprimera la catégorie "{category.name}" et retirera cette catégorie 
                            de tous les projets associés.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteCategory}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCategories;
