
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { checkAdminCredentials } from '@/lib/supabase';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('ulpra-admin-auth') === 'true'
  );
  const { toast } = useToast();
  
  useEffect(() => {
    // Debug - verify authentication state
    console.log("Admin authentication state:", isAuthenticated);
    
    // If not authenticated, check if demo credentials exist
    if (!isAuthenticated) {
      // Check if demo credentials are provided
      const storedEmail = localStorage.getItem('admin-email');
      const storedPassword = localStorage.getItem('admin-password');
      
      console.log("Checking stored credentials:", storedEmail ? "Email present" : "No email");
      
      if (storedEmail && storedPassword) {
        // Validate the demo account
        const isDemoAccount = checkAdminCredentials(storedEmail, storedPassword);
        
        if (isDemoAccount) {
          console.log("Demo admin credentials validated, granting access");
          localStorage.setItem('ulpra-admin-auth', 'true');
          setIsAuthenticated(true);
        } else {
          console.warn("Stored credentials are invalid");
          // Clear invalid credentials
          localStorage.removeItem('admin-email');
          localStorage.removeItem('admin-password');
        }
      } else {
        console.log("No admin credentials found in storage");
      }
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    // Show authentication toast only when redirecting from a protected route
    if (location.pathname !== '/admin/login') {
      toast({
        title: "Accès restreint",
        description: "Vous devez être connecté pour accéder à cette page",
        variant: "destructive",
      });
    }
    
    // Redirect to login with current path as state
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;
