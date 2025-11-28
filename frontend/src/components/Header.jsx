import React from 'react';
import '../styles/header.css';

const Header = ({ currentPage, onNavigate, user, onLogout }) => {
  const mainNavItems = [
    { id: 'editor', label: 'Editor', icon: '⚡' },
    { id: 'saved', label: 'Saved Spells', icon: '📖' },
    { id: 'templates', label: 'Templates', icon: '📜' },
    { id: 'glossary', label: 'Glossary', icon: '📚' },
  ];

  const userNavItems = [
    { id: 'profile', label: 'User Profile', icon: '👤' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <header className="site-header">
      <div className="header-content">
        {/* Logo */}
        <div className="header-logo" onClick={() => onNavigate('editor')}>
          <span className="logo-icon">🔮</span>
          <span className="logo-text">VibeLearn</span>
        </div>

        {/* Main Navigation */}
        <nav className="main-nav">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Navigation */}
        <nav className="user-nav">
          {userNavItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          
          {/* Auth Button */}
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.username}</span>
              <button className="auth-btn logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="auth-btn login"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

