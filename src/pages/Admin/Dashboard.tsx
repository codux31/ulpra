import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Activity, 
  FileEdit, 
  ShoppingBag, 
  Star, 
  Users,
  BarChart3,
  Layers, 
  Mail
} from 'lucide-react';
import { BarChart } from '@/components/ui/bar-chart';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  trend 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`text-xs mt-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: "Projets Totaux",
      value: "12",
      description: "Projets publiés sur le site",
      icon: <FileEdit className="h-4 w-4 text-primary" />,
      trend: { value: "+2 ce mois", isPositive: true }
    },
    {
      title: "Services",
      value: "6",
      description: "Services proposés",
      icon: <ShoppingBag className="h-4 w-4 text-primary" />
    },
    {
      title: "Messages",
      value: "24",
      description: "Messages reçus ce mois",
      icon: <Mail className="h-4 w-4 text-primary" />,
      trend: { value: "+5 cette semaine", isPositive: true }
    },
    {
      title: "Témoignages",
      value: "8",
      description: "Avis clients",
      icon: <Star className="h-4 w-4 text-primary" />,
      trend: { value: "+3 ce mois", isPositive: true }
    }
  ];

  const visitData = [
    { name: "Lun", value: 120 },
    { name: "Mar", value: 160 },
    { name: "Mer", value: 110 },
    { name: "Jeu", value: 145 },
    { name: "Ven", value: 172 },
    { name: "Sam", value: 90 },
    { name: "Dim", value: 75 }
  ];

  const conversionData = [
    { name: "Lun", value: 8 },
    { name: "Mar", value: 12 },
    { name: "Mer", value: 5 },
    { name: "Jeu", value: 9 },
    { name: "Ven", value: 14 },
    { name: "Sam", value: 6 },
    { name: "Dim", value: 4 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre panneau d'administration ULPRA.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Visites du site
            </CardTitle>
            <CardDescription>
              Nombre de visiteurs uniques par jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={visitData}
                index="name"
                categories={["value"]}
                valueFormatter={(value) => `${value} visiteurs`}
                colors={["#FFCB05"]}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Demandes de contact
            </CardTitle>
            <CardDescription>
              Nombre de demandes reçues par jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={conversionData}
                index="name"
                categories={["value"]}
                valueFormatter={(value) => `${value} demandes`}
                colors={["#FFCB05"]}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="mr-2 h-5 w-5" />
              Activité récente
            </CardTitle>
            <CardDescription>
              Dernières modifications et événements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <FileEdit className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Projet ajouté</p>
                  <p className="text-sm text-muted-foreground">Identité Visuelle Startup</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Star className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nouveau témoignage</p>
                  <p className="text-sm text-muted-foreground">EcoSolutions - 5 étoiles</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a 5 heures</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nouveau message</p>
                  <p className="text-sm text-muted-foreground">Demande de devis pour site e-commerce</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a 1 jour</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Service modifié</p>
                  <p className="text-sm text-muted-foreground">Mise à jour des tarifs SEO/SEA</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a 2 jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Visiteurs
            </CardTitle>
            <CardDescription>
              Statistiques des visiteurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Par appareil</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mobile</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "68%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ordinateur</span>
                  <span className="text-sm font-medium">26%</span>
                </div>
                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "26%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tablette</span>
                  <span className="text-sm font-medium">6%</span>
                </div>
                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "6%" }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sources de trafic</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Recherche</span>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Direct</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Social</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Référencement</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
