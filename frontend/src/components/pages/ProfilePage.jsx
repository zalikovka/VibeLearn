import React from 'react';

const ProfilePage = ({ user, onLogin, onLogout }) => {
  if (!user) {
    return (
      <div className="page-container">
        <div className="page-content profile-page">
          <div className="auth-card">
            <h2>👤 User Profile</h2>
            <p className="auth-message">Please log in to view your profile</p>
            <button className="primary-btn" onClick={onLogin}>
              Login / Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              <span>{user.username[0].toUpperCase()}</span>
            </div>
            <div className="profile-info">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{user.spellCount || 0}</span>
              <span className="stat-label">Spells Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.savedCount || 0}</span>
              <span className="stat-label">Saved Spells</span>
            </div>
          </div>

          <button className="secondary-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

