
import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { toast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div id="contact" className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="mb-4 inline-block">
            <AnimatedText text="Contactez-nous" className="text-gradient" />
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Prenez contact avec notre équipe pour discuter de votre projet et découvrir comment nous pouvons vous aider.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-white"
                    placeholder="Votre numéro"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-2">
                    Service souhaité
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-white"
                  >
                    <option value="" disabled>Sélectionnez un service</option>
                    <option value="web">Site Web</option>
                    <option value="branding">Branding</option>
                    <option value="communication">Communication</option>
                    <option value="strategy">Stratégie</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-white"
                  placeholder="Décrivez brièvement votre projet..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-black font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>Envoi en cours...</>
                ) : (
                  <>
                    Envoyer le message
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:contact@ulpra.com" className="text-muted-foreground hover:text-white transition-colors">
                      contact@ulpra.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Téléphone</h4>
                    <a href="tel:+33123456789" className="text-muted-foreground hover:text-white transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Adresse</h4>
                    <p className="text-muted-foreground">
                      123 Avenue Créative<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism p-8 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Prêt à discuter de votre projet ?</h3>
              <p className="text-muted-foreground mb-6">
                Planifiez un appel de 30 minutes avec notre équipe pour discuter de vos besoins et objectifs.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 font-medium transition-all duration-300"
              >
                Réserver un appel
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gold/10 blur-[100px] opacity-20" />
    </div>
  );
};

export default Contact;
