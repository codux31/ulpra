
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
              <AdminLayout />
            </AdminRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/:id" element={<ServiceForm />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/categories" element={<ProjectCategories />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id" element={<ProjectForm />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="email" element={<EmailSettings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
