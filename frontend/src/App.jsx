import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SpellBuilder from './components/SpellBuilder';
import {
  AboutPage,
  ProfilePage,
  SavedSpellsPage,
  TemplatesPage,
  GlossaryPage,
  LoginPage
} from './components/pages';
import { authApi } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('editor');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response.authenticated) {
          setUser(response.user);
        }
      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // Handle page navigation
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    setCurrentPage('editor');
  };

  // Update body class for scrolling
  useEffect(() => {
    if (currentPage !== 'editor') {
      document.body.classList.add('page-view');
    } else {
      document.body.classList.remove('page-view');
    }
  }, [currentPage]);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'editor':
        return <SpellBuilder />;
      case 'saved':
        return <SavedSpellsPage user={user} />;
      case 'templates':
        return <TemplatesPage onLoadTemplate={(template) => {
          console.log('Load template:', template);
          setCurrentPage('editor');
        }} />;
      case 'glossary':
        return <GlossaryPage />;
      case 'profile':
        return (
          <ProfilePage 
            user={user} 
            onLogin={() => setCurrentPage('login')}
            onLogout={handleLogout}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <SpellBuilder />;
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Navigation */}
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main style={{ 
        flex: 1,
        position: 'relative',
        marginTop: '60px',
        height: 'calc(100vh - 60px)',
        overflow: currentPage === 'editor' ? 'hidden' : 'auto'
      }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
