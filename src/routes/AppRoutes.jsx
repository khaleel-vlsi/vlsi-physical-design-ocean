import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LazyWrapper from '../components/LazyWrapper';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';

// Public Pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Interview = lazy(() => import('../pages/Interview'));
const ModulesList = lazy(() => import('../pages/ModulesList'));
const ModuleDetail = lazy(() => import('../pages/ModuleDetail'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

const PaidModulesList = lazy(() => import('../pages/PaidModulesList'));
const PaidModuleDetail = lazy(() => import('../pages/PaidModuleDetail'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LazyWrapper><Home /></LazyWrapper>} />
        <Route path="/about" element={<LazyWrapper><About /></LazyWrapper>} />
        <Route path="/contact" element={<LazyWrapper><Contact /></LazyWrapper>} />
        <Route path="/privacy" element={<LazyWrapper><Privacy /></LazyWrapper>} />
        <Route path="/interview" element={<LazyWrapper><Interview /></LazyWrapper>} />
        <Route path="/modules" element={<LazyWrapper><ModulesList /></LazyWrapper>} />
        <Route path="/modules/:id" element={<LazyWrapper><ModuleDetail /></LazyWrapper>} />
        <Route path="/module/:id" element={<Navigate to="/modules/:id" replace />} />
        <Route path="/login" element={<LazyWrapper><Login /></LazyWrapper>} />
        <Route path="/register" element={<LazyWrapper><Register /></LazyWrapper>} />
        <Route path="/forgot-password" element={<LazyWrapper><ForgotPassword /></LazyWrapper>} />
        <Route path="/reset-password" element={<LazyWrapper><ResetPassword /></LazyWrapper>} />
      </Route>

      <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<LazyWrapper><Dashboard /></LazyWrapper>} />
        <Route path="/paid-modules" element={<LazyWrapper><PaidModulesList /></LazyWrapper>} />
        <Route path="/paid-modules/module/:id" element={<LazyWrapper><PaidModuleDetail /></LazyWrapper>} />
      </Route> 
    </Routes>
  );
};

export default AppRoutes;
