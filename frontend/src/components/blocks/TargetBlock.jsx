import React from 'react';
import Block from './Block';

/**
 * Target Block - Choose spell target type
 * Options: Enemy, Spot, Caster
 */
const TARGET_OPTIONS = [
  { id: 'enemy', label: 'Enemy Target', icon: '⚔️' },
  { id: 'spot', label: 'Ground Spot', icon: '🎯' },
  { id: 'caster', label: 'Self (Caster)', icon: '🧙' }
];

const TargetBlock = (props) => {
  return (
    <Block 
      {...props}
      data={{
        ...props.data,
        title: 'Target',
        icon: '🎯',
        options: TARGET_OPTIONS,
        isFirst: true
      }}
    />
  );
};

// Export options for use elsewhere
TargetBlock.options = TARGET_OPTIONS;

export default TargetBlock;

