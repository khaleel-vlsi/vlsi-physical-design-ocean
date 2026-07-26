import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import HelpChat from './components/HelpChat';

function App() {
  React.useEffect(() => {
    // 1. Disable right-click context menu globally
    const handleContextMenu = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      e.preventDefault();
    };

    // 2. Disable copy & cut globally (and clear clipboard)
    const handleCopyCut = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
    };

    // 3. Disable text selection start
    const handleSelectStart = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      e.preventDefault();
    };

    // 4. Clear active selection ranges automatically
    const handleSelectionChange = () => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) return;
      if (window.getSelection && window.getSelection().rangeCount > 0) {
        window.getSelection().removeAllRanges();
      }
    };

    // 5. Disable drag start for text/images
    const handleDragStart = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      e.preventDefault();
    };

    // 6. Disable keyboard shortcuts (Ctrl/Cmd + C, A, X, P, S, U, Shift+I, F12)
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) return;
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key ? e.key.toLowerCase() : '';
      if (
        (isCmdOrCtrl && ['c', 'a', 'x', 'p', 's', 'u'].includes(key)) ||
        (isCmdOrCtrl && e.shiftKey && key === 'i') ||
        e.keyCode === 123
      ) {
        e.preventDefault();
      }
    };

    // 7. Continuous Selection Wiper Loop (kills any selection every 100ms)
    const selectionWiperInterval = setInterval(() => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) return;
      if (window.getSelection && window.getSelection().toString().length > 0) {
        window.getSelection().removeAllRanges();
      }
    }, 100);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(selectionWiperInterval);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
