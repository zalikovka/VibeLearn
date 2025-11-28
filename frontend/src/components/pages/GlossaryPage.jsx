import React, { useState } from 'react';

const glossaryData = {
  targets: [
    { id: 'enemy', name: 'Enemy Target', icon: '⚔️', description: 'Directs the spell at a hostile creature or enemy' },
    { id: 'spot', name: 'Ground Spot', icon: '🎯', description: 'Targets a specific location on the ground' },
    { id: 'caster', name: 'Self (Caster)', icon: '🧙', description: 'The spell affects the caster themselves' },
  ],
  schools: [
    { id: 'fire_school', name: 'Fire School', icon: '🔥', description: 'Harnesses the destructive power of flames and heat' },
    { id: 'water_school', name: 'Water School', icon: '💧', description: 'Controls water, ice, and healing energies' },
    { id: 'air_school', name: 'Air School', icon: '💨', description: 'Manipulates wind, lightning, and swift movements' },
  ],
  forms: [
    { id: 'sphere', name: 'Sphere', icon: '🔮', description: 'A concentrated ball of magical energy' },
    { id: 'pellets', name: 'Pellets', icon: '✨', description: 'Multiple small projectiles spread across an area' },
  ],
};

const GlossaryPage = () => {
  const [activeCategory, setActiveCategory] = useState('targets');

  const categories = [
    { id: 'targets', label: 'Target Types', icon: '🎯' },
    { id: 'schools', label: 'Magic Schools', icon: '📚' },
    { id: 'forms', label: 'Projectile Forms', icon: '💫' },
  ];

  return (
    <div className="page-container">
      <div className="page-content glossary-page">
        <div className="page-header">
          <h1>📚 Spell Glossary</h1>
          <p>Learn about spell components and their effects</p>
        </div>

        <div className="glossary-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="glossary-content">
          {glossaryData[activeCategory].map(item => (
            <div key={item.id} className="glossary-item">
              <div className="item-icon">{item.icon}</div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;

