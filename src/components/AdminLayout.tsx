
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileEdit, 
  ShoppingBag, 
  Star, 
  Settings, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  submenu?: { name: string; href: string }[];
}

const navigation: NavigationItem[] = [
  { name: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { 
    name: "Projets", 
    href: "/admin/projects", 
    icon: FileEdit,
    submenu: [
      { name: "Tous les projets", href: "/admin/projects" },
      { name: "Ajouter un projet", href: "/admin/projects/add" },
      { name: "Catégories", href: "/admin/projects/categories" }
    ]
  },
  { 
    name: "Services", 
    href: "/admin/services", 
    icon: ShoppingBag,
    submenu: [
      { name: "Tous les services", href: "/admin/services" },
      { name: "Ajouter un service", href: "/admin/services/add" }
    ]
  },
  { name: "Témoignages", href: "/admin/testimonials", icon: Star },
  { name: "Paramètres d'emails", href: "/admin/email-settings", icon: Mail },
  { name: "Paramètres généraux", href: "/admin/settings", icon: Settings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('ulpra-admin-auth');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/admin/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar pour desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "hidden lg:block"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold">ULPRA<span className="text-ulpra-yellow">.</span></span>
              <span className="ml-2 text-xs text-muted-foreground">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => 
              item.submenu ? (
                <Collapsible 
                  key={item.name}
                  open={openSubmenu === item.name}
                  onOpenChange={() => toggleSubmenu(item.name)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center w-full px-4 py-2 mt-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                        isActive(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform duration-200",
                          openSubmenu === item.name ? "transform rotate-180" : ""
                        )} 
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-9 pr-2 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className={cn(
                            "block w-full px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                            isActive(subitem.href) && "bg-accent/50 text-accent-foreground"
                          )}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 mt-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    isActive(item.href) && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
              )
            )}
          </nav>
          
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full flex justify-start items-center text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Déconnexion</span>
            </Button>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Voir le site
              </Link>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Contenu principal */}
      <div className={cn(
        "flex-1 flex flex-col lg:ml-64 transition-all duration-300 ease-in-out",
        !isSidebarOpen && "lg:ml-0"
      )}>
        {/* Header */}
        <header className="h-16 border-b border-border bg-background z-30 sticky top-0">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden lg:flex items-center justify-center p-2 rounded-md hover:bg-accent"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-accent"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h1 className="ml-4 text-lg font-medium">
                {navigation.find(item => isActive(item.href))?.name || "Tableau de bord"}
              </h1>
            </div>
          </div>
          
          {/* Menu mobile */}
          <div className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-200",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <div className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out transform",
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                  <Link to="/admin/dashboard" className="flex items-center">
                    <span className="text-xl font-bold">ULPRA<span className="text-ulpra-yellow">.</span></span>
                    <span className="ml-2 text-xs text-muted-foreground">Admin</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-accent"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <nav className="flex-1 px-2 py-4 overflow-y-auto">
                  {navigation.map((item) => 
                    item.submenu ? (
                      <Collapsible 
                        key={item.name}
                        open={openSubmenu === item.name}
                        onOpenChange={() => toggleSubmenu(item.name)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={cn(
                              "flex items-center w-full px-4 py-2 mt-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                              isActive(item.href) && "bg-accent text-accent-foreground"
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-2" />
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={cn(
                                "ml-auto h-4 w-4 transition-transform duration-200",
                                openSubmenu === item.name ? "transform rotate-180" : ""
                              )} 
                            />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="pl-9 pr-2 mt-1 space-y-1">
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.name}
                                to={subitem.href}
                                className={cn(
                                  "block w-full px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                                  isActive(subitem.href) && "bg-accent/50 text-accent-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-2 mt-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                          isActive(item.href) && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  )}
                </nav>
                
                <div className="p-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    className="w-full flex justify-start items-center text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Déconnexion</span>
                  </Button>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    <Link 
                      to="/" 
                      className="hover:text-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Voir le site
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
