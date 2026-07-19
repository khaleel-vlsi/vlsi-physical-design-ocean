import React, { lazy } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
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
const NotFound = lazy(() => import('../pages/NotFound'));

// Public pages added in learning feature migration
const PlatformFlow = lazy(() => import('../pages/PlatformFlow'));
const StudyMaterials = lazy(() => import('../pages/StudyMaterials'));
const PnrExecution = lazy(() => import('../pages/PnrExecution'));
const PnrWorkshop = lazy(() => import('../pages/PnrWorkshop'));
const UserGuides = lazy(() => import('../pages/UserGuides'));
const TestVideo = lazy(() => import('../pages/TestVideo'));
const TestVideoModulesList = lazy(() => import('../pages/TestVideoModulesList'));
const TestVideoPlaylist = lazy(() => import('../pages/TestVideoPlaylist'));

const PaidModulesList = lazy(() => import('../pages/PaidModulesList'));
const PaidModuleDetail = lazy(() => import('../pages/PaidModuleDetail'));
const ResumeBuilder = lazy(() => import('../pages/resume-builder/ResumeBuilder'));
const ResumeEditor = lazy(() => import('../pages/resume-builder/ResumeEditor'));
const PublicResume = lazy(() => import('../pages/resume-builder/PublicResume'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

// Dynamic helper to redirect legacy URL patterns to new React Router URLs,
// and render a custom 404 page for unmatched paths.
const FallbackRedirect = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Normalize path by removing trailing slash if not root
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

  // 1. Root index.html redirect
  if (normalizedPath === '/index.html' || normalizedPath === '/index.php') {
    return <Navigate to="/" replace />;
  }

  // 2. Simple static HTML redirects
  if (normalizedPath === '/about.html') {
    return <Navigate to="/about" replace />;
  }
  if (normalizedPath === '/contact.html') {
    return <Navigate to="/contact" replace />;
  }
  if (normalizedPath === '/privacy.html') {
    return <Navigate to="/privacy" replace />;
  }
  if (normalizedPath === '/modules.html') {
    return <Navigate to="/modules" replace />;
  }
  if (normalizedPath === '/login.html') {
    return <Navigate to="/login" replace />;
  }
  if (normalizedPath === '/register.html') {
    return <Navigate to="/register" replace />;
  }
  if (normalizedPath === '/payment.html') {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Module page redirects: e.g. /module12.html, /module/12.html, /module12
  const moduleRegex1 = /^\/module(\d+)(?:\.html)?$/;
  const match1 = normalizedPath.match(moduleRegex1);
  if (match1) {
    const id = parseInt(match1[1], 10);
    if (id >= 9 && id <= 57) {
      return <Navigate to={`/paid-modules/module/${id}`} replace />;
    }
    return <Navigate to={`/modules/${id}`} replace />;
  }

  const moduleRegex2 = /^\/module\/(\d+)(?:\.html)?$/;
  const match2 = normalizedPath.match(moduleRegex2);
  if (match2) {
    const id = parseInt(match2[1], 10);
    if (id >= 9 && id <= 57) {
      return <Navigate to="/modules" replace />;
    }
    return <Navigate to={`/modules/${id}`} replace />;
  }

  // 4. Legacy portal redirects
  if (normalizedPath.startsWith('/portal_private_2026')) {
    if (normalizedPath.includes('login.html')) {
      return <Navigate to="/login" replace />;
    }
    if (normalizedPath.includes('dashboard.html') || normalizedPath.includes('index.html')) {
      return <Navigate to="/dashboard" replace />;
    }
    if (normalizedPath.includes('reset.html')) {
      return <Navigate to="/reset-password" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // 5. Trailing slash normalization for standard public routes
  const basicPaths = ['/about', '/contact', '/privacy', '/modules', '/interview', '/login', '/register', '/dashboard', '/paid-modules'];
  if (path.endsWith('/') && basicPaths.includes(normalizedPath)) {
    return <Navigate to={normalizedPath} replace />;
  }

  // Fallback to custom 404 page
  return <LazyWrapper><NotFound /></LazyWrapper>;
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
        <Route path="/platform-flow" element={<LazyWrapper><PlatformFlow /></LazyWrapper>} />
        <Route path="/study-materials" element={<LazyWrapper><StudyMaterials /></LazyWrapper>} />
        <Route path="/pnr-execution" element={<LazyWrapper><PnrExecution /></LazyWrapper>} />
        <Route path="/pnr-workshop" element={<LazyWrapper><PnrWorkshop /></LazyWrapper>} />
        <Route path="/user-guides" element={<LazyWrapper><UserGuides /></LazyWrapper>} />
        <Route path="/resume/share/:token" element={<LazyWrapper><PublicResume /></LazyWrapper>} />
        
        {/* Legacy static redirects (fallback to wildcard for others) */}
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />
        <Route path="/modules.html" element={<Navigate to="/modules" replace />} />
        <Route path="/login.html" element={<Navigate to="/login" replace />} />
        <Route path="/register.html" element={<Navigate to="/register" replace />} />
        <Route path="/payment.html" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/login" element={<LazyWrapper><Login /></LazyWrapper>} />
        <Route path="/register" element={<LazyWrapper><Register /></LazyWrapper>} />
        <Route path="/forgot-password" element={<LazyWrapper><ForgotPassword /></LazyWrapper>} />
        <Route path="/reset-password" element={<LazyWrapper><ResetPassword /></LazyWrapper>} />
      </Route>

      <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<LazyWrapper><Dashboard /></LazyWrapper>} />
        <Route path="/paid-modules" element={<LazyWrapper><PaidModulesList /></LazyWrapper>} />
        <Route path="/paid-modules/module/:id" element={<LazyWrapper><PaidModuleDetail /></LazyWrapper>} />
        <Route path="/resume" element={<LazyWrapper><ResumeBuilder /></LazyWrapper>} />
        <Route path="/resume/edit/:resumeId" element={<LazyWrapper><ResumeEditor /></LazyWrapper>} />
        <Route path="/test-video" element={<LazyWrapper><TestVideo /></LazyWrapper>} />
        <Route path="/test-videos" element={<LazyWrapper><TestVideoModulesList /></LazyWrapper>} />
        <Route path="/test-video-playlist/:id" element={<LazyWrapper><TestVideoPlaylist /></LazyWrapper>} />
      </Route>

      {/* Wildcard fallback routing to handle legacy and unmatched paths */}
      <Route path="*" element={<FallbackRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
