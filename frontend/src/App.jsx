import React from 'react';
import SpellBuilder from './components/SpellBuilder';

function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative'
    }}>
      {/* Header */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: 'linear-gradient(180deg, rgba(26, 15, 5, 0.95) 0%, rgba(26, 15, 5, 0) 100%)',
        padding: '20px 30px',
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '28px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #FFE4B5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          letterSpacing: '3px',
          margin: 0
        }}>
          ⚡ SPELL BUILDER
        </h1>
        <p style={{
          fontFamily: 'Spectral, serif',
          color: '#B8860B',
          fontSize: '14px',
          marginTop: '4px',
          fontStyle: 'italic'
        }}>
          Craft your magical incantations by connecting spell blocks
        </p>
      </header>

      {/* Main Spell Builder Canvas */}
      <SpellBuilder />

      {/* Instructions Panel */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '20px',
        background: 'linear-gradient(135deg, rgba(61, 41, 20, 0.9), rgba(26, 15, 5, 0.9))',
        border: '1px solid rgba(218, 165, 32, 0.4)',
        borderRadius: '10px',
        padding: '14px 18px',
        maxWidth: '220px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
      }}>
        <h4 style={{
          fontFamily: 'Cinzel, serif',
          color: '#DAA520',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '10px'
        }}>
          📜 How to Build
        </h4>
        <ol style={{
          margin: 0,
          paddingLeft: '18px',
          color: '#D4C4A0',
          fontSize: '12px',
          lineHeight: '1.6'
        }}>
          <li>Select a target type</li>
          <li>Choose magic school</li>
          <li>Pick projectile form</li>
          <li>Watch your spell form!</li>
        </ol>
      </div>
    </div>
  );
}

export default App;

