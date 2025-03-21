
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Save, Mail, Copy, Check, AlertTriangle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailSettingsSchema = z.object({
  contactEmail: z.string().email("Adresse email invalide").min(1, "L'adresse email est requise"),
  senderName: z.string().min(1, "Le nom d'expéditeur est requis"),
  replyToEmail: z.string().email("Adresse email invalide").min(1, "L'adresse email de réponse est requise"),
  notificationEmail: z.string().email("Adresse email invalide").min(1, "L'adresse email de notification est requise"),
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

const EmailSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Dans un vrai projet, ces valeurs seraient chargées depuis une API
  const defaultValues: EmailSettingsFormValues = {
    contactEmail: "contact@ulpra.com",
    senderName: "ULPRA Studio",
    replyToEmail: "contact@ulpra.com",
    notificationEmail: "notifications@ulpra.com",
  };
  
  const form = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues,
  });
  
  const onSubmit = async (data: EmailSettingsFormValues) => {
    setIsSaving(true);
    
    // Simuler une requête API
    setTimeout(() => {
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres d'email ont été mis à jour avec succès.",
      });
      setIsSaving(false);
      
      // Mise à jour du localStorage pour la démonstration
      localStorage.setItem("ulpra-admin-email-settings", JSON.stringify(data));
    }, 1000);
  };
  
  const copyFormDataAsJson = () => {
    const data = form.getValues();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    toast({
      title: "Copié !",
      description: "Les paramètres ont été copiés dans le presse-papier.",
    });
  };
  
  const webhookUrl = "https://ulpra.com/api/form-submissions";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres d'email</h1>
        <p className="text-muted-foreground">
          Configurez les adresses email utilisées pour les formulaires de contact et les notifications.
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Configuration des emails
            </CardTitle>
            <CardDescription>
              Paramétrez les adresses email pour les formulaires de contact et les notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse email de contact</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@ulpra.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Les messages du formulaire de contact seront envoyés à cette adresse.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom d'expéditeur</FormLabel>
                        <FormControl>
                          <Input placeholder="ULPRA Studio" {...field} />
                        </FormControl>
                        <FormDescription>
                          Nom affiché comme expéditeur des emails automatiques.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="replyToEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse de réponse</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@ulpra.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Adresse utilisée pour les réponses aux emails automatiques.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notificationEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse de notification</FormLabel>
                        <FormControl>
                          <Input placeholder="notifications@ulpra.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Adresse recevant les notifications du système.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Alert className="bg-primary/5 border-primary/20">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Ces paramètres sont utilisés pour configurer l'envoi des emails depuis les formulaires du site. 
                    Assurez-vous que les adresses email sont correctes et accessibles.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={copyFormDataAsJson}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copié !" : "Copier les données"}
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Webhook pour les formulaires</CardTitle>
            <CardDescription>
              Point d'accès pour les soumissions de formulaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
              {webhookUrl}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Ce webhook reçoit toutes les soumissions de formulaire et les envoie aux adresses email configurées ci-dessus.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                navigator.clipboard.writeText(webhookUrl);
                toast({
                  title: "URL copiée",
                  description: "L'URL du webhook a été copiée dans le presse-papier.",
                });
              }}
            >
              <Copy className="h-4 w-4" />
              Copier l'URL
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EmailSettings;
