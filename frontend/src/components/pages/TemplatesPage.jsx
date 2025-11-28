import React from 'react';

const templates = [
  {
    id: 1,
    name: 'Fireball',
    description: 'Classic offensive fire spell',
    target: 'enemy',
    school: 'fire_school',
    form: 'sphere',
    icon: '🔥'
  },
  {
    id: 2,
    name: 'Healing Rain',
    description: 'Area healing water magic',
    target: 'spot',
    school: 'water_school',
    form: 'pellets',
    icon: '💧'
  },
  {
    id: 3,
    name: 'Wind Shield',
    description: 'Self-protective air barrier',
    target: 'caster',
    school: 'air_school',
    form: 'sphere',
    icon: '💨'
  },
];

const TemplatesPage = ({ onLoadTemplate }) => {
  return (
    <div className="page-container">
      <div className="page-content templates-page">
        <div className="page-header">
          <h1>📜 Spell Templates</h1>
          <p>Pre-built spell configurations to get you started</p>
        </div>

        <div className="templates-grid">
          {templates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-icon">{template.icon}</div>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <div className="template-tags">
                <span className="tag">{template.target}</span>
                <span className="tag">{template.school.replace('_school', '')}</span>
                <span className="tag">{template.form}</span>
              </div>
              <button 
                className="load-btn"
                onClick={() => onLoadTemplate && onLoadTemplate(template)}
              >
                Load Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;

