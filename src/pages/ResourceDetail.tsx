
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight, Clock, Download, Eye, FileText, Share2, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Resource } from '@/types/models';

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [relatedResources, setRelatedResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getResourceDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch the resource details
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          console.log("Resource details:", data);
          setResource(data);
          
          // Fetch related resources (same category, excluding current one)
          const { data: relatedData, error: relatedError } = await supabase
            .from('resources')
            .select('*')
            .neq('id', id)
            .eq('category', data.category)
            .eq('status', 'published')
            .limit(3);
          
          if (relatedError) throw relatedError;
          
          if (relatedData && relatedData.length > 0) {
            console.log("Related resources:", relatedData);
            setRelatedResources(relatedData);
          } else {
            // If no related resources in same category, get any 3 other published resources
            const { data: anyResources, error: anyError } = await supabase
              .from('resources')
              .select('*')
              .neq('id', id)
              .eq('status', 'published')
              .limit(3);
            
            if (anyError) throw anyError;
            
            if (anyResources) {
              console.log("Any resources as related:", anyResources);
              setRelatedResources(anyResources);
            }
          }
        } else {
          toast({
            title: "Ressource introuvable",
            description: "Impossible de trouver la ressource demandée",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching resource details:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de la ressource",
          variant: "destructive",
        });
        
        // Create a default resource for error cases
        const defaultResource: Resource = {
          id: id || "default",
          title: "Guide d'optimisation SEO",
          description: "Un guide complet pour améliorer le référencement de votre site web dans les moteurs de recherche.",
          content: "<p>Le SEO (Search Engine Optimization) est un ensemble de techniques visant à améliorer la visibilité d'un site web dans les résultats des moteurs de recherche.</p><p>Ce guide couvre les fondamentaux du SEO, y compris le choix des mots-clés, l'optimisation on-page, la création de liens, et l'analyse des performances.</p><h2>1. Recherche de mots-clés</h2><p>La recherche de mots-clés est une étape cruciale de toute stratégie SEO réussie. Elle consiste à identifier les termes et expressions que votre public cible utilise pour rechercher des produits ou services similaires aux vôtres.</p><h2>2. Optimisation on-page</h2><p>L'optimisation on-page comprend tous les éléments que vous pouvez contrôler directement sur votre site web pour améliorer son référencement.</p><h2>3. Création de liens</h2><p>La création de liens, ou link building, est le processus d'acquisition de liens provenant d'autres sites web vers le vôtre.</p>",
          image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          category: "Marketing",
          type: "article",
          author: "Sophie Martin",
          date: new Date().toISOString(),
          readtime: "10 min",
          status: "published",
          created_at: new Date().toISOString()
        };
        
        setResource(defaultResource);
        
        const defaultRelated: Resource[] = [
          {
            id: "content-marketing",
            title: "Stratégies de Content Marketing",
            description: "Découvrez comment créer et distribuer du contenu pertinent pour attirer votre audience cible.",
            category: "Marketing",
            type: "article",
            author: "Alexandre Durand",
            date: new Date().toISOString(),
            readtime: "8 min",
            status: "published",
            created_at: new Date().toISOString()
          },
          {
            id: "social-media-tips",
            title: "Astuces pour les Réseaux Sociaux",
            description: "Maximisez votre présence sur les réseaux sociaux avec ces conseils d'experts.",
            category: "Marketing",
            type: "tutorial",
            author: "Émilie Bernard",
            date: new Date().toISOString(),
            readtime: "5 min",
            status: "published",
            created_at: new Date().toISOString()
          }
        ];
        
        setRelatedResources(defaultRelated);
      } finally {
        setIsLoading(false);
      }
    };

    getResourceDetails();
    window.scrollTo(0, 0);
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-32 flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-ulpra-yellow rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Ressource introuvable</h1>
          <p className="text-muted-foreground mb-8">La ressource que vous recherchez n'existe pas ou a été déplacée.</p>
          <Link 
            to="/resources"
            className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium transform hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux ressources
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Function to render content based on type
  const renderContent = () => {
    if (resource.type === 'download' && resource.download_url) {
      return (
        <div className="p-8 glassmorphism rounded-xl text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-ulpra-yellow" />
          <h3 className="text-2xl font-bold mb-2">Télécharger cette ressource</h3>
          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour télécharger cette ressource au format PDF.
          </p>
          <a 
            href={resource.download_url}
            download
            className="inline-flex items-center px-6 py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium"
          >
            <Download className="mr-2 h-5 w-5" />
            Télécharger maintenant
          </a>
        </div>
      );
    }
    
    // For articles, tutorials, or any other type with content
    return (
      <div className="prose prose-invert prose-lg max-w-none">
        {resource.content ? (
          <div dangerouslySetInnerHTML={{ __html: resource.content }} />
        ) : (
          <>
            <p>
              {resource.description}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at imperdiet neque, nec iaculis libero. 
              Ut sed sem quam. Aliquam tempor lorem id fringilla ultricies. Suspendisse potenti. Donec semper augue 
              vel ante placerat, et luctus eros rutrum.
            </p>
            <h2>Pourquoi est-ce important?</h2>
            <p>
              Nulla facilisi. Vestibulum quis tellus at libero faucibus bibendum. Suspendisse potenti. Nulla facilisi. 
              Nullam ultricies commodo quam, at egestas mauris dapibus non. Proin rhoncus velit eros, ut volutpat 
              lacus vulputate id. 
            </p>
            <p>
              Quisque placerat odio vitae risus dignissim, quis dictum ipsum finibus. Ut maximus rutrum ipsum a 
              facilisis. Phasellus interdum metus vel augue tincidunt faucibus.
            </p>
            <h2>Comment l'appliquer à votre entreprise</h2>
            <p>
              Sed dictum malesuada nisi, vel varius purus fringilla non. Praesent fringilla odio ut mattis venenatis. 
              Nulla quis velit vitae sem mattis condimentum. In sit amet urna venenatis enim faucibus rutrum.
            </p>
            <ul>
              <li>Analyser votre situation actuelle</li>
              <li>Identifier les opportunités d'amélioration</li>
              <li>Mettre en place un plan d'action concret</li>
              <li>Mesurer les résultats et ajuster votre stratégie</li>
            </ul>
          </>
        )}
      </div>
    );
  };

  // Get the correct icon based on resource type
  const getResourceTypeIcon = () => {
    switch(resource.type) {
      case 'download':
        return <Download className="h-5 w-5 mr-2" />;
      case 'tutorial':
        return <Eye className="h-5 w-5 mr-2" />;
      case 'article':
      default:
        return <FileText className="h-5 w-5 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link 
              to="/resources" 
              className="inline-flex items-center text-ulpra-yellow hover:text-ulpra-yellow/80 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour aux ressources
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="mb-8">
                {resource.category && (
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-ulpra-yellow font-medium mb-4">
                    {resource.category}
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <AnimatedText text={resource.title} />
                </h1>
                
                <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-3">
                  {resource.author && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{resource.author}</span>
                    </div>
                  )}
                  
                  {resource.date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(resource.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  
                  {resource.readtime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{resource.readtime} de lecture</span>
                    </div>
                  )}
                  
                  {resource.type && (
                    <div className="flex items-center">
                      {getResourceTypeIcon()}
                      <span className="capitalize">{resource.type}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {resource.image_url && (
                <div className="glassmorphism p-4 rounded-xl overflow-hidden mb-10">
                  <img 
                    src={resource.image_url} 
                    alt={resource.title} 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              {renderContent()}
            </div>
            
            <div className="lg:col-span-4">
              <div className="glassmorphism p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">À propos de cette ressource</h3>
                
                {resource.description && (
                  <div className="mb-6">
                    <p className="text-muted-foreground">{resource.description}</p>
                  </div>
                )}
                
                <div className="space-y-4 mb-8">
                  {resource.category && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Catégorie</h4>
                      <p className="font-medium">{resource.category}</p>
                    </div>
                  )}
                  
                  {resource.type && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Type</h4>
                      <p className="font-medium capitalize">{resource.type}</p>
                    </div>
                  )}
                  
                  {resource.date && (
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Date de publication</h4>
                      <p className="font-medium">{new Date(resource.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                  )}
                </div>
                
                {resource.type === 'download' && resource.download_url && (
                  <a 
                    href={resource.download_url}
                    download
                    className="w-full py-3 bg-ulpra-yellow text-ulpra-black rounded-full font-medium inline-flex items-center justify-center hover:bg-ulpra-yellow/90 transition-colors mb-4"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </a>
                )}
                
                <div className="flex justify-between items-center mt-6">
                  <h4 className="font-semibold">Partager:</h4>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {relatedResources.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-bold mb-12">Ressources associées</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedResources.map(relatedResource => (
                  <Link
                    key={relatedResource.id}
                    to={`/resources/${relatedResource.id}`}
                    className="glassmorphism overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-10px] group"
                  >
                    {relatedResource.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={relatedResource.image_url} 
                          alt={relatedResource.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {relatedResource.category && (
                        <div className="text-sm text-ulpra-yellow mb-2">{relatedResource.category}</div>
                      )}
                      <h3 className="text-xl font-bold mb-3">{relatedResource.title}</h3>
                      {relatedResource.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedResource.description}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground">
                          {getResourceTypeIcon()}
                          <span className="capitalize">{relatedResource.type || 'article'}</span>
                        </div>
                        <div className="inline-flex items-center text-ulpra-yellow group-hover:translate-x-1 transition-transform">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResourceDetail;
