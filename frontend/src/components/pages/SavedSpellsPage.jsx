import React from 'react';

const SavedSpellsPage = ({ user }) => {
  const savedSpells = []; // TODO: Load from API

  return (
    <div className="page-container">
      <div className="page-content saved-page">
        <div className="page-header">
          <h1>📖 Saved Spells</h1>
          <p>Your collection of crafted magical incantations</p>
        </div>

        {!user ? (
          <div className="empty-state">
            <span className="empty-icon">🔐</span>
            <p>Please log in to view your saved spells</p>
          </div>
        ) : savedSpells.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No saved spells yet</p>
            <p className="empty-hint">Create spells in the Editor and save them here</p>
          </div>
        ) : (
          <div className="spells-grid">
            {savedSpells.map(spell => (
              <div key={spell.id} className="spell-card">
                <h3>{spell.name}</h3>
                <p>{spell.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSpellsPage;

