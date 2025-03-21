import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  category: z.string().min(2, "Veuillez sélectionner ou saisir une catégorie"),
  client: z.string().min(2, "Le nom du client est requis"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  image_url: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  date: z.string().optional(),
  link: z.string().url("Veuillez entrer une URL valide").optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(projectId ? true : false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const isEditing = !!projectId;
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      category: "",
      client: "",
      description: "",
      image_url: "",
      status: "draft" as "draft" | "published" | "archived",
      date: new Date().toISOString().split('T')[0],
      link: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (error) throw error;
      if (!data) throw new Error('Projet non trouvé');
      
      form.reset({
        title: data.title || "",
        category: data.category || "",
        client: data.client || "",
        description: data.description || "",
        image_url: data.image_url || "",
        status: data.status || "draft",
        date: data.date || new Date().toISOString().split('T')[0],
        link: data.link || "",
      });
      
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le projet",
        variant: "destructive",
      });
      navigate('/admin/projects');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.getValues().image_url || null;
    
    try {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, imageFile);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(data.path);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    
    try {
      let imageUrl = values.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      const projectData = {
        title: values.title,
        category: values.category,
        client: values.client,
        description: values.description,
        image_url: imageUrl,
        status: values.status,
        date: values.date,
        link: values.link,
        updated_at: new Date().toISOString(),
      };
      
      if (isEditing) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (error) throw error;
        
        toast({
          title: "Projet mis à jour",
          description: "Le projet a été mis à jour avec succès",
        });
      } else {
        const newProject = {
          ...projectData,
          title: values.title,
          created_at: new Date().toISOString(),
        };
        
        const { error } = await supabase
          .from('projects')
          .insert([newProject]);
          
        if (error) throw error;
        
        toast({
          title: "Projet créé",
          description: "Le projet a été créé avec succès",
        });
      }
      
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le projet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-ulpra-yellow" />
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Modifier le projet' : 'Ajouter un projet'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Mettez à jour les informations de votre projet' 
              : 'Créez un nouveau projet à afficher sur votre site'
            }
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre du projet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid gap-4 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Web, Design, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du client" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez le projet..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid gap-4 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statut</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="archived">Archivé</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemple.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL du site web du projet (si disponible)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-2"
                          />
                          {(imagePreview || field.value) && (
                            <div className="relative mt-2 rounded-md overflow-hidden h-40 bg-muted">
                              <img 
                                src={imagePreview || field.value}
                                alt="Aperçu" 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <Input 
                            type="hidden" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Choisissez une image principale pour votre projet
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? 'Mettre à jour le projet' : 'Créer le projet'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Conseils pour un bon projet</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Utilisez un titre clair et descriptif pour votre projet</li>
                <li>• Rédigez une description détaillée qui met en valeur les points forts</li>
                <li>�� Choisissez une catégorie pertinente pour faciliter la navigation</li>
                <li>• Ajoutez une image de qualité en respectant les proportions</li>
                <li>• Mentionnez le nom du client pour ajouter de la crédibilité</li>
                <li>• Si possible, incluez un lien vers le projet en ligne</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Statuts des projets</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span className="font-medium">Brouillon</span> - Visible uniquement dans l'administration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Publié</span> - Visible sur votre site web
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="font-medium">Archivé</span> - Masqué mais conservé dans la base de données
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
