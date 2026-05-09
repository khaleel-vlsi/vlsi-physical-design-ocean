import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';
import ModulesList from '../pages/ModulesList';
import ModuleDetail from '../pages/ModuleDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Private Pages
import Dashboard from '../pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/modules" element={<ModulesList />} />
        <Route path="/modules/:id" element={<ModuleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route> 
    </Routes>
  );
};

export default AppRoutes;
