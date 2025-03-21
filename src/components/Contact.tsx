
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// ReCAPTCHA simulation (en production, utilisez reCAPTCHA v3 ou hCaptcha)
const generateCaptchaToken = (): Promise<string> => {
  return new Promise((resolve) => {
    // Simuler un délai réseau
    setTimeout(() => {
      resolve("valid_recaptcha_token_" + Math.random().toString(36).substring(2));
    }, 500);
  });
};

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    rgpdConsent: false,
  });
  
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Handler pour changement d'input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Nettoyer l'erreur quand l'utilisateur corrige l'input
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Handler pour la case à cocher
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
    
    // Nettoyer l'erreur quand l'utilisateur corrige l'input
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'L\'email est invalide';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    }
    
    if (!formData.rgpdConsent) {
      errors.rgpdConsent = 'Vous devez accepter la politique de confidentialité';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handler pour soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Alerte d'erreur
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Mettre en état de chargement
    setFormState('loading');
    
    try {
      // Obtenir un token reCAPTCHA (simulation)
      const captchaToken = await generateCaptchaToken();
      
      // En production, utilisez un service comme EmailJS, Formspree, ou votre propre backend
      // Simuler un envoi d'email
      const emailData = {
        to: 'contact@ulpra.com',
        from: formData.email,
        subject: `Demande de contact de ${formData.name}`,
        body: formData.message,
        captchaToken,
        ...formData,
      };
      
      // Simuler un délai réseau et une réponse positive
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Email simulé:', emailData);
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        rgpdConsent: false,
      });
      
      // Afficher le succès
      setFormState('success');
      
      toast({
        title: "Message envoyé !",
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.",
      });
      
      // Réinitialiser le state après 3 secondes
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setFormState('error');
      
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
      
      // Réinitialiser le state après 3 secondes
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="relative inline-block">
              <AnimatedText text="Contactez-Nous" className="text-gradient" />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6 opacity-0 animate-fade-in [animation-delay:300ms]">
              Une question, un projet ou besoin d'un devis ? Contactez-nous en remplissant le formulaire ci-dessous ou en utilisant directement nos coordonnées.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom <span className="text-ulpra-yellow">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${
                        formErrors.name ? 'border-red-500' : 'border-white/10'
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ulpra-yellow focus:border-transparent transition-colors`}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-red-500 text-xs">{formErrors.name}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-ulpra-yellow">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${
                        formErrors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ulpra-yellow focus:border-transparent transition-colors`}
                      placeholder="votre@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>
                    )}
                  </div>
                  
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ulpra-yellow focus:border-transparent transition-colors"
                      placeholder="Votre téléphone"
                    />
                  </div>
                  
                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ulpra-yellow focus:border-transparent transition-colors"
                      placeholder="Votre entreprise"
                    />
                  </div>
                </div>
                
                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-ulpra-yellow">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${
                      formErrors.message ? 'border-red-500' : 'border-white/10'
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ulpra-yellow focus:border-transparent transition-colors min-h-[150px]`}
                    placeholder="Décrivez votre projet ou votre besoin"
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-red-500 text-xs">{formErrors.message}</p>
                  )}
                </div>
                
                {/* RGPD */}
                <div className="mb-8">
                  <div className="flex items-start">
                    <input
                      id="rgpdConsent"
                      name="rgpdConsent"
                      type="checkbox"
                      checked={formData.rgpdConsent}
                      onChange={handleCheckboxChange}
                      className="mt-1 mr-3"
                    />
                    <label htmlFor="rgpdConsent" className="text-sm text-muted-foreground">
                      J'accepte que mes données soient traitées par ULPRA dans le cadre de ma demande, conformément à la <a href="/privacy-policy" className="text-ulpra-yellow hover:underline">politique de confidentialité</a>. <span className="text-ulpra-yellow">*</span>
                    </label>
                  </div>
                  {formErrors.rgpdConsent && (
                    <p className="mt-1 text-red-500 text-xs">{formErrors.rgpdConsent}</p>
                  )}
                </div>
                
                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full bg-ulpra-yellow text-ulpra-black rounded-full py-4 font-medium transition-transform duration-300 hover:scale-105 flex items-center justify-center"
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <CheckCircle size={20} className="mr-2" />
                      Message envoyé !
                    </>
                  ) : formState === 'error' ? (
                    <>
                      <AlertCircle size={20} className="mr-2" />
                      Erreur, réessayer
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Les champs marqués d'un <span className="text-ulpra-yellow">*</span> sont obligatoires
                </p>
              </form>
            </div>
            
            {/* Informations de contact */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <h3 className="text-2xl font-display font-semibold mb-6">Discutons de votre projet</h3>
                
                <p className="text-muted-foreground mb-8">
                  Vous avez un projet ou besoin d'un devis ? N'hésitez pas à nous contacter. Notre équipe sera ravie d'échanger avec vous et de vous accompagner dans la réalisation de vos projets.
                </p>
                
                <div className="space-y-6">
                  <div className="glassmorphism p-5 rounded-xl flex">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ulpra-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a href="mailto:contact@ulpra.com" className="text-ulpra-yellow hover:underline">contact@ulpra.com</a>
                    </div>
                  </div>
                  
                  <div className="glassmorphism p-5 rounded-xl flex">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ulpra-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Téléphone</h4>
                      <a href="tel:+33612345678" className="text-ulpra-yellow hover:underline">+33 6 12 34 56 78</a>
                    </div>
                  </div>
                  
                  <div className="glassmorphism p-5 rounded-xl flex">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ulpra-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Adresse</h4>
                      <address className="not-italic text-muted-foreground">
                        42 Rue de l'Innovation<br />
                        75002 Paris, France
                      </address>
                    </div>
                  </div>
                </div>
                
                {/* Réseaux sociaux */}
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://twitter.com/ulprastudio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ulpra-yellow/20 transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ulpra-yellow">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/ulprastudio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ulpra-yellow/20 transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ulpra-yellow">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/ulprastudio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ulpra-yellow/20 transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ulpra-yellow">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a 
                      href="https://dribbble.com/ulprastudio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ulpra-yellow/20 transition-colors duration-300"
                      aria-label="Dribbble"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ulpra-yellow">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Éléments 3D */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-ulpra-yellow/5 blur-[100px] opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-ulpra-yellow/10 blur-[80px] opacity-20 -z-10"></div>
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 border border-ulpra-yellow/10 rounded-full opacity-30 -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-48 h-48 border border-white/5 rounded-full opacity-20 -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear", direction: "reverse" }}
      />
    </section>
  );
};

export default Contact;
