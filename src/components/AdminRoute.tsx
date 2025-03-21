
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('ulpra-admin-auth') === 'true';
  
  useEffect(() => {
    // Vérifier l'authentification à chaque rendu du composant
    if (!isAuthenticated && location.pathname !== '/admin/login') {
      // Rediriger vers la page de connexion si non authentifié
      localStorage.removeItem('ulpra-admin-auth');
    }
  }, [isAuthenticated, location.pathname]);
  
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec le chemin actuel comme état
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;
