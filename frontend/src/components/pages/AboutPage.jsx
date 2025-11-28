import React from 'react';
import aboutContent from '../../content/about.json';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-content about-page">
        <div className="about-card">
          <div className="about-header">
            <span className="about-icon">🔮</span>
            <h1>{aboutContent.title}</h1>
          </div>
          
          <div className="about-body">
            <p className="about-text">{aboutContent.content}</p>
          </div>
          
          <div className="about-footer">
            <div className="about-meta">
              <span className="meta-item">
                <span className="meta-icon">📌</span>
                Version {aboutContent.version}
              </span>
              <span className="meta-item">
                <span className="meta-icon">✨</span>
                Created by {aboutContent.author}
              </span>
            </div>
          </div>

          <div className="about-features">
            <h3>✨ Features</h3>
            <ul>
              <li>🎯 Visual spell block builder</li>
              <li>🔗 Connected block chains</li>
              <li>📚 Multiple magic schools</li>
              <li>💾 Save and load spells</li>
              <li>📜 Pre-built templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

