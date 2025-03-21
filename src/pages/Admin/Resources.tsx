
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Plus, 
  FileText, 
  Download, 
  BookOpen 
} from 'lucide-react';
import { fetchResources, supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Resource as ResourceType } from '@/types/models';

interface Resource extends ResourceType {
  excerpt: string;
}

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResources();
      const resourcesWithExcerpt = data.map(resource => ({
        ...resource,
        excerpt: resource.excerpt || resource.description.substring(0, 120) + '...'
      }));
      setResources(resourcesWithExcerpt as Resource[]);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les ressources",
        variant: "destructive",
      });
      
      const dummyResources = [
        {
          id: "tendances-design-2023",
          title: "Tendances de Design Web pour 2023",
          description: "Découvrez les tendances émergentes qui façonneront le design web cette année.",
          excerpt: "Découvrez les tendances émergentes qui façonneront le design web cette année.",
          category: "Design",
          date: new Date().toISOString(),
          author: "Sophie Martin",
          readTime: "8 min",
          type: "article" as const,
          status: "published",
          created_at: new Date().toISOString()
        },
        {
          id: "guide-seo-debutants",
          title: "Guide SEO pour Débutants",
          description: "Tous les fondamentaux du référencement pour améliorer la visibilité de votre site.",
          excerpt: "Tous les fondamentaux du référencement pour améliorer la visibilité de votre site.",
          category: "Marketing",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          author: "Alexandre Durand",
          readTime: "15 min",
          type: "tutorial" as const,
          status: "published",
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setResources(dummyResources);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!resourceToDelete) return;
    
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Ressource supprimée",
        description: "La ressource a été supprimée avec succès",
      });
      
      loadResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la ressource",
        variant: "destructive",
      });
      
      setResources(prevResources => prevResources.filter(resource => resource.id !== resourceToDelete));
      
      toast({
        title: "Simulation de suppression",
        description: "La ressource a été supprimée (mode simulation)",
      });
    } finally {
      setResourceToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Publié</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archivé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4 text-blue-400" />;
      case 'tutorial':
        return <BookOpen className="h-4 w-4 text-green-400" />;
      case 'download':
        return <Download className="h-4 w-4 text-purple-400" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ressources & Blog</h1>
          <p className="text-muted-foreground">Gérez les articles, tutoriels et ressources téléchargeables</p>
        </div>
        <Button onClick={() => navigate('/admin/resources/add')}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une ressource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les ressources</CardTitle>
          <CardDescription>
            Vous avez {resources.length} ressource{resources.length !== 1 ? 's' : ''} au total.
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
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Aucune ressource n'a été trouvée. Commencez par en ajouter une.
                      </TableCell>
                    </TableRow>
                  ) : (
                    resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(resource.type)}
                            <span className="capitalize">{resource.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{resource.category}</TableCell>
                        <TableCell>{resource.author}</TableCell>
                        <TableCell>{getStatusBadge(resource.status || 'draft')}</TableCell>
                        <TableCell>{new Date(resource.date || resource.created_at).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/resources/${resource.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/admin/resources/edit/${resource.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setResourceToDelete(resource.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. La ressource sera définitivement supprimée 
                                    de notre base de données.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setResourceToDelete(null)}>
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
    </div>
  );
};

export default AdminResources;
