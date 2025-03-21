
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";

import './App.css';

// Pages
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import AdminServices from './pages/Admin/Services';
import ServiceForm from './pages/Admin/ServiceForm';
import AdminProjects from './pages/Admin/Projects';
import ProjectForm from './pages/Admin/ProjectForm';
import ProjectCategories from './pages/Admin/ProjectCategories';
import AdminResources from './pages/Admin/Resources';
import AdminPricing from './pages/Admin/Pricing';
import EmailSettings from './pages/Admin/EmailSettings';

// Components
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

// Utils
import { initializeDatabase } from './utils/seedDatabase';

function App() {
  useEffect(() => {
    // Try to initialize the database
    const initialize = async () => {
      await initializeDatabase();
    };
    
    initialize();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          } />
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
          <Route path="/admin/projects" element={
            <AdminRoute>
              <AdminLayout>
                <AdminProjects />
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
          <Route path="/admin/resources" element={
            <AdminRoute>
              <AdminLayout>
                <AdminResources />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/pricing" element={
            <AdminRoute>
              <AdminLayout>
                <AdminPricing />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/email" element={
            <AdminRoute>
              <AdminLayout>
                <EmailSettings />
              </AdminLayout>
            </AdminRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
