
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

const serviceSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  icon: z.string().min(1, "L'icône est requise"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  longDescription: z.string().min(20, "La description longue doit contenir au moins 20 caractères"),
  image_url: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

const ServiceForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(serviceId ? true : false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const isEditing = !!serviceId;
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      icon: "",
      description: "",
      longDescription: "",
      image_url: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (isEditing) {
      loadService();
    }
  }, [serviceId]);

  const loadService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', serviceId)
        .single();
        
      if (error) throw error;
      if (!data) throw new Error('Service non trouvé');
      
      // Set form values
      form.reset({
        title: data.title || "",
        icon: data.icon || "",
        description: data.description || "",
        longDescription: data.longDescription || "",
        image_url: data.imageUrl || "",
        status: data.status || "active",
      });
      
      // Set image preview if available
      if (data.imageUrl) {
        setImagePreview(data.imageUrl);
      }
    } catch (error) {
      console.error('Error loading service:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le service",
        variant: "destructive",
      });
      navigate('/admin/services');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
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
        .from('service-images')
        .upload(fileName, imageFile);
        
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('service-images')
        .getPublicUrl(data.path);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const onSubmit = async (values: ServiceFormValues) => {
    setIsLoading(true);
    
    try {
      // Upload image if selected
      let imageUrl = values.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      const serviceData = {
        title: values.title,
        icon: values.icon,
        description: values.description,
        longDescription: values.longDescription,
        imageUrl: imageUrl,
        status: values.status,
        updated_at: new Date().toISOString(),
      };
      
      if (isEditing) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', serviceId);
          
        if (error) throw error;
        
        toast({
          title: "Service mis à jour",
          description: "Le service a été mis à jour avec succès",
        });
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([{
            ...serviceData,
            created_at: new Date().toISOString(),
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Service créé",
          description: "Le service a été créé avec succès",
        });
      }
      
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le service",
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
            onClick={() => navigate('/admin/services')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux services
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Modifier le service' : 'Ajouter un service'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Mettez à jour les informations de votre service' 
              : 'Créez un nouveau service à afficher sur votre site'
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
                        <Input placeholder="Titre du service" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icône</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 01, 02, etc." {...field} />
                      </FormControl>
                      <FormDescription>
                        Numéro ou identifiant de l'icône
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description courte</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez brièvement le service..." 
                          className="min-h-20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description longue</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez en détail le service..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
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
                        Choisissez une image principale pour votre service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? 'Mettre à jour le service' : 'Créer le service'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Conseils pour un bon service</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Utilisez un titre clair et descriptif pour votre service</li>
                <li>• Rédigez une description détaillée qui met en valeur les points forts</li>
                <li>• Utilisez un numéro ou un identifiant cohérent pour l'icône</li>
                <li>• Ajoutez une image de qualité qui illustre bien le service</li>
                <li>• La description courte doit être concise et accrocheuse</li>
                <li>• La description longue peut entrer dans les détails de l'offre</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Statuts des services</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Actif</span> - Visible sur votre site web
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span className="font-medium">Brouillon</span> - Visible uniquement dans l'administration
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

export default ServiceForm;
