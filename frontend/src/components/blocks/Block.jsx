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
 * - onDeleteSingle: callback to delete only this block (slash)
 * - onDeleteCascade: callback to delete this block and all below (cross)
 * - selectedValue: currently selected value
 * - isFirst: whether this is the first block (no left handle, no delete)
 * - isLast: whether this is the last block (no right handle)
 */
const Block = ({ 
  id,
  data,
  isConnectable 
}) => {
  const { 
    title, 
    icon, 
    options = [], 
    selectedValue, 
    onSelect,
    onDeleteSingle,
    onDeleteCascade,
    isFirst = false,
    showOptions = true,
    isDeleting = false
  } = data;

  const [isEditing, setIsEditing] = useState(!selectedValue);
  const [isHovered, setIsHovered] = useState(false);

  const handleOptionClick = (option) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsEditing(false);
  };

  const handleChangeClick = () => {
    setIsEditing(true);
  };

  const handleDeleteSingle = (e) => {
    e.stopPropagation();
    if (onDeleteSingle) {
      onDeleteSingle(id);
    }
  };

  const handleDeleteCascade = (e) => {
    e.stopPropagation();
    if (onDeleteCascade) {
      onDeleteCascade(id);
    }
  };

  return (
    <div 
      className={`spell-block ${selectedValue ? 'selected' : ''} ${isDeleting ? 'deleting' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete Buttons - appear on hover (not for first block) */}
      {!isFirst && isHovered && !isDeleting && (
        <div className="delete-buttons">
          <button 
            className="delete-btn delete-single" 
            onClick={handleDeleteSingle}
            title="Delete this block only (keep lower blocks)"
          >
            <span className="delete-icon">⊘</span>
          </button>
          <button 
            className="delete-btn delete-cascade" 
            onClick={handleDeleteCascade}
            title="Delete this block and all connected blocks below"
          >
            <span className="delete-icon">✕</span>
          </button>
        </div>
      )}

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
