
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from 'lucide-react';
import { checkAdminCredentials, seedAllData } from '@/lib/supabase';

const loginSchema = z.object({
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if we're already logged in
    const isLoggedIn = localStorage.getItem("ulpra-admin-auth") === "true";
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      console.log("Tentative de connexion avec:", data.email); // Debug log
      
      // Check against hardcoded demo credentials
      const isValidCredentials = checkAdminCredentials(data.email, data.password);
      
      if (isValidCredentials) {
        // Store authentication state and credentials in localStorage
        localStorage.setItem("ulpra-admin-auth", "true");
        localStorage.setItem("admin-email", data.email);
        localStorage.setItem("admin-password", data.password);
        
        // Seed the database with initial data
        await seedAllData();
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans le panneau d'administration",
          variant: "default",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      
      // Fallback: Check for demo credentials again
      if (data.email === "admin@ulpra.com" && data.password === "Admin123!") {
        localStorage.setItem("ulpra-admin-auth", "true");
        localStorage.setItem("admin-email", data.email);
        localStorage.setItem("admin-password", data.password);
        
        toast({
          title: "Connexion réussie (démo)",
          description: "Bienvenue dans le panneau d'administration en mode démo",
          variant: "default",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ulpra-black to-ulpra-black/90 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">ULPRA<span className="text-ulpra-yellow">.</span></h1>
          <p className="text-muted-foreground">Panneau d'administration</p>
        </div>
        
        <div className="bg-background/10 backdrop-blur-lg rounded-lg border border-white/10 p-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-white">Connexion</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="votre@email.com"
                          className="pl-10 bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-white/5 border-white/10 text-white"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-ulpra-yellow text-ulpra-black hover:bg-ulpra-yellow/90"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-2">
              Identifiants de démonstration:
            </p>
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-3 h-3" /> admin@ulpra.com
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole className="w-3 h-3" /> Admin123!
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-muted-foreground hover:text-white text-sm transition-colors">
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
