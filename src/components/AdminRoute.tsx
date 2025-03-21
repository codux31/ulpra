
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { checkAdminCredentials } from '@/lib/supabase';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('ulpra-admin-auth') === 'true';
  const { toast } = useToast();
  
  useEffect(() => {
    // Debug - vérifier l'état d'authentification
    console.log("Admin authentication state:", isAuthenticated);
    
    // Si les identifiants de démo sont utilisés, garantir l'accès
    if (!isAuthenticated) {
      // Vérifier si les identifiants de démonstration sont saisis
      const storedEmail = localStorage.getItem('admin-email');
      const storedPassword = localStorage.getItem('admin-password');
      
      if (storedEmail && storedPassword) {
        const isDemoAccount = checkAdminCredentials(storedEmail, storedPassword);
        
        if (isDemoAccount) {
          console.log("Demo admin credentials validated, granting access");
          localStorage.setItem('ulpra-admin-auth', 'true');
          
          // Recharger la page pour appliquer l'authentification
          window.location.reload();
        }
      }
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    toast({
      title: "Accès restreint",
      description: "Vous devez être connecté pour accéder à cette page",
      variant: "destructive",
    });
    
    // Rediriger vers la page de connexion avec le chemin actuel comme état
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;
