
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
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { fetchProjects, supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Project as ProjectType } from '@/types/models';

// Local interface for Admin/Projects page that includes all required fields
interface Project extends ProjectType {
  category: string; // Required for this component
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProjects();
      // Ensure all projects have the required category field
      const projectsWithCategory = data.map(project => ({
        ...project,
        category: project.category || 'Non catégorisé'
      }));
      setProjects(projectsWithCategory as Project[]);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès",
      });
      
      // Refresh projects list
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet",
        variant: "destructive",
      });
    } finally {
      setProjectToDelete(null);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground">Gérez les projets affichés sur votre site</p>
        </div>
        <Button onClick={() => navigate('/admin/projects/add')}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un projet
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les projets</CardTitle>
          <CardDescription>
            Vous avez {projects.length} projet{projects.length !== 1 ? 's' : ''} au total.
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
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date de création</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Aucun projet n'a été trouvé. Commencez par en ajouter un.
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.category}</TableCell>
                        <TableCell>{getStatusBadge(project.status || 'draft')}</TableCell>
                        <TableCell>{new Date(project.created_at).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/projects/${project.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => setProjectToDelete(project.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. Le projet sera définitivement supprimé 
                                    de notre base de données.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setProjectToDelete(null)}>
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

export default AdminProjects;
