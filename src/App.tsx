
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Resources from "./pages/Resources";

// Admin routes
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProjects from "./pages/Admin/Projects";
import ProjectForm from "./pages/Admin/ProjectForm";
import ProjectCategories from "./pages/Admin/ProjectCategories";
import EmailSettings from "./pages/Admin/EmailSettings";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

// New admin routes for Services, Resources and Pricing
import AdminServices from "./pages/Admin/Services";
import ServiceForm from "./pages/Admin/ServiceForm";
import AdminResources from "./pages/Admin/Resources";
import AdminPricing from "./pages/Admin/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Site public */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Routes Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Project Routes */}
          <Route path="/admin/projects" element={
            <AdminRoute>
              <AdminLayout>
                <AdminProjects />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/projects/add" element={
            <AdminRoute>
              <AdminLayout>
                <ProjectForm />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/projects/edit/:projectId" element={
            <AdminRoute>
              <AdminLayout>
                <ProjectForm />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/projects/categories" element={
            <AdminRoute>
              <AdminLayout>
                <ProjectCategories />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Service Routes */}
          <Route path="/admin/services" element={
            <AdminRoute>
              <AdminLayout>
                <AdminServices />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/services/add" element={
            <AdminRoute>
              <AdminLayout>
                <ServiceForm />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/services/edit/:serviceId" element={
            <AdminRoute>
              <AdminLayout>
                <ServiceForm />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Resources Routes */}
          <Route path="/admin/resources" element={
            <AdminRoute>
              <AdminLayout>
                <AdminResources />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Pricing Routes */}
          <Route path="/admin/pricing" element={
            <AdminRoute>
              <AdminLayout>
                <AdminPricing />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Email Settings */}
          <Route path="/admin/email-settings" element={
            <AdminRoute>
              <AdminLayout>
                <EmailSettings />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
