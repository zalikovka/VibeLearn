import React from 'react';
import Block from './Block';

/**
 * Magic School Block - Choose the magical school/element
 * Options: Fire, Water, Air
 */
const SCHOOL_OPTIONS = [
  { id: 'fire_school', label: 'Fire School', icon: '🔥' },
  { id: 'water_school', label: 'Water School', icon: '💧' },
  { id: 'air_school', label: 'Air School', icon: '💨' }
];

const MagicSchoolBlock = (props) => {
  return (
    <Block 
      {...props}
      data={{
        ...props.data,
        title: 'Magic School',
        icon: '📚',
        options: SCHOOL_OPTIONS
      }}
    />
  );
};

// Export options for use elsewhere
MagicSchoolBlock.options = SCHOOL_OPTIONS;

export default MagicSchoolBlock;

