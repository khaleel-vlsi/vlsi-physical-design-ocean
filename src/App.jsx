import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import HelpChat from './components/HelpChat';

function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <AppRoutes />
        <HelpChat />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
