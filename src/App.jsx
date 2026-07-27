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

    // 2. Disable copy & cut globally (and clear clipboard and remove active selection)
    const handleCopyCut = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    };

    // 3. Disable text selection start
    const handleSelectStart = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
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
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
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
        if (e.stopPropagation) e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
      }
    };

    // 7. Continuous Selection Wiper Loop (kills any selection every 10ms)
    const selectionWiperInterval = setInterval(() => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA'].includes(activeEl.tagName)) return;
      if (window.getSelection && window.getSelection().toString().length > 0) {
        window.getSelection().removeAllRanges();
      }
    }, 10);

    // 8. Instant selection wipe on mouse interaction
    const handleMouseWipe = (e) => {
      const activeEl = e.target;
      if (activeEl && (['INPUT', 'TEXTAREA'].includes(activeEl.tagName) || (activeEl.closest && activeEl.closest('input, textarea')))) return;
      if (window.getSelection && window.getSelection().toString().length > 0) {
        window.getSelection().removeAllRanges();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('copy', handleCopyCut, true);
    document.addEventListener('cut', handleCopyCut, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('selectionchange', handleSelectionChange, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousedown', handleMouseWipe, true);
    document.addEventListener('mousemove', handleMouseWipe, true);
    document.addEventListener('mouseup', handleMouseWipe, true);

    return () => {
      clearInterval(selectionWiperInterval);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('copy', handleCopyCut, true);
      document.removeEventListener('cut', handleCopyCut, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('selectionchange', handleSelectionChange, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('mousedown', handleMouseWipe, true);
      document.removeEventListener('mousemove', handleMouseWipe, true);
      document.removeEventListener('mouseup', handleMouseWipe, true);
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
