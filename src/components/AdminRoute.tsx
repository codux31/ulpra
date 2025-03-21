
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

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
    // Cela n'est utilisé que pour la démo et devrait être remplacé par une véritable authentification
    if (!isAuthenticated) {
      const demoAccounts = [
        { email: "admin@ulpra.com", password: "Admin123!" }
      ];
      
      // Vérifier si les identifiants de démonstration sont saisis
      const storedEmail = localStorage.getItem('admin-email');
      const storedPassword = localStorage.getItem('admin-password');
      
      if (storedEmail && storedPassword) {
        const isDemoAccount = demoAccounts.some(
          account => account.email === storedEmail && account.password === storedPassword
        );
        
        if (isDemoAccount) {
          localStorage.setItem('ulpra-admin-auth', 'true');
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
