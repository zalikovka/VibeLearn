import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../../styles/blocks.css';

/**
 * Abstract Block Component - Base class for all spell blocks
 * 
 * Props:
 * - id: unique block identifier
 * - title: block display name
 * - icon: emoji/icon for the block
 * - options: array of { id, label, icon } for choices
 * - onSelect: callback when option is selected
 * - selectedValue: currently selected value
 * - isFirst: whether this is the first block (no left handle)
 * - isLast: whether this is the last block (no right handle)
 */
const Block = ({ 
  data,
  isConnectable 
}) => {
  const { 
    title, 
    icon, 
    options = [], 
    selectedValue, 
    onSelect,
    isFirst = false,
    showOptions = true
  } = data;

  const [isEditing, setIsEditing] = useState(!selectedValue);

  const handleOptionClick = (option) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsEditing(false);
  };

  const handleChangeClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={`spell-block ${selectedValue ? 'selected' : ''}`}>
      {/* Input Handle - connects from previous block */}
      {!isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}

      {/* Block Header */}
      <div className="block-header">
        <div className="block-icon">{icon}</div>
        <div className="block-title">{title}</div>
      </div>

      {/* Block Content */}
      <div className="block-content">
        {showOptions && isEditing ? (
          <div className="choice-options">
            {options.map((option) => (
              <button
                key={option.id}
                className={`choice-option ${selectedValue?.id === option.id ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-text">{option.label}</span>
              </button>
            ))}
          </div>
        ) : selectedValue ? (
          <div className="selected-value">
            <span className="value-text">
              <span>{selectedValue.icon}</span>
              <span>{selectedValue.label}</span>
            </span>
            <button className="change-btn" onClick={handleChangeClick}>
              Change
            </button>
          </div>
        ) : (
          <div className="empty-block">
            Select an option...
          </div>
        )}
      </div>

      {/* Output Handle - connects to next block */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default Block;

