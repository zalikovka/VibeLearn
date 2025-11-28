import React from 'react';
import Block from './Block';

/**
 * Projectile Form Block - Choose the spell projectile shape
 * Options: Sphere, Pellets
 */
const FORM_OPTIONS = [
  { id: 'sphere', label: 'Sphere', icon: '🔮' },
  { id: 'pellets', label: 'Pellets', icon: '✨' }
];

const ProjectileFormBlock = (props) => {
  return (
    <Block 
      {...props}
      data={{
        ...props.data,
        title: 'Projectile Form',
        icon: '💫',
        options: FORM_OPTIONS
      }}
    />
  );
};

// Export options for use elsewhere
ProjectileFormBlock.options = FORM_OPTIONS;

export default ProjectileFormBlock;

