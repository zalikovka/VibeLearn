import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TargetBlock, MagicSchoolBlock, ProjectileFormBlock } from './blocks';

// Block type definitions with sequence order
const BLOCK_SEQUENCE = [
  { type: 'target', Component: TargetBlock, order: 0 },
  { type: 'magicSchool', Component: MagicSchoolBlock, order: 1 },
  { type: 'projectileForm', Component: ProjectileFormBlock, order: 2 }
];

// Custom node types for React Flow
const nodeTypes = {
  target: TargetBlock,
  magicSchool: MagicSchoolBlock,
  projectileForm: ProjectileFormBlock
};

// Edge style configuration
const edgeOptions = {
  animated: true,
  style: { 
    stroke: '#DAA520', 
    strokeWidth: 3 
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#DAA520'
  }
};

// Get block order from id
const getBlockOrder = (blockId) => {
  const block = BLOCK_SEQUENCE.find(b => blockId.startsWith(b.type));
  return block ? block.order : -1;
};

const SpellBuilder = () => {
  // Track which blocks have been completed
  const [completedBlocks, setCompletedBlocks] = useState({});
  // Track blocks being deleted (for animation)
  const [deletingBlocks, setDeletingBlocks] = useState(new Set());
  
  // Initialize with just the first block
  const initialNodes = [
    {
      id: 'target-1',
      type: 'target',
      position: { x: 50, y: 200 },
      data: {
        selectedValue: null,
        showOptions: true,
        isFirst: true
      }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Delete a single block (keep lower blocks, just disconnect)
  const handleDeleteSingle = useCallback((blockId) => {
    const blockOrder = getBlockOrder(blockId);
    
    // Start deletion animation
    setDeletingBlocks(prev => new Set([...prev, blockId]));
    
    setTimeout(() => {
      // Remove from completed blocks
      setCompletedBlocks(prev => {
        const newCompleted = { ...prev };
        delete newCompleted[blockId];
        return newCompleted;
      });

      // Remove edges connected to this block
      setEdges(eds => eds.filter(e => e.source !== blockId && e.target !== blockId));

      // Remove the node
      setNodes(nds => nds.filter(n => n.id !== blockId));

      // Reconnect: find the previous block and next block
      setNodes(nds => {
        // Find nodes that were connected after this block
        const remainingNodes = nds.filter(n => n.id !== blockId);
        
        // Re-establish edges between remaining sequential blocks
        const sortedNodes = [...remainingNodes].sort((a, b) => 
          getBlockOrder(a.id) - getBlockOrder(b.id)
        );
        
        return sortedNodes;
      });

      // Rebuild edges for remaining sequential blocks
      setEdges(eds => {
        setNodes(nds => {
          const newEdges = [];
          const sortedNodes = [...nds].sort((a, b) => 
            getBlockOrder(a.id) - getBlockOrder(b.id)
          );
          
          for (let i = 0; i < sortedNodes.length - 1; i++) {
            const sourceOrder = getBlockOrder(sortedNodes[i].id);
            const targetOrder = getBlockOrder(sortedNodes[i + 1].id);
            
            // Only connect if they are sequential in the original order
            if (targetOrder === sourceOrder + 1) {
              newEdges.push({
                id: `edge-${sortedNodes[i].id}-${sortedNodes[i + 1].id}`,
                source: sortedNodes[i].id,
                target: sortedNodes[i + 1].id,
                ...edgeOptions
              });
            }
          }
          
          setEdges(newEdges);
          return nds;
        });
        return eds;
      });

      setDeletingBlocks(prev => {
        const newSet = new Set(prev);
        newSet.delete(blockId);
        return newSet;
      });
    }, 400); // Animation duration
  }, [setNodes, setEdges]);

  // Delete block and all blocks below (cascade)
  const handleDeleteCascade = useCallback((blockId) => {
    const blockOrder = getBlockOrder(blockId);
    
    // Find all blocks at or after this order
    const blocksToDelete = nodes
      .filter(n => getBlockOrder(n.id) >= blockOrder)
      .map(n => n.id);
    
    // Start deletion animation for all
    setDeletingBlocks(prev => new Set([...prev, ...blocksToDelete]));
    
    // Stagger the deletions for visual effect
    blocksToDelete.forEach((id, index) => {
      setTimeout(() => {
        setCompletedBlocks(prev => {
          const newCompleted = { ...prev };
          delete newCompleted[id];
          return newCompleted;
        });
      }, index * 100);
    });

    setTimeout(() => {
      // Remove all edges connected to deleted blocks
      setEdges(eds => eds.filter(e => 
        !blocksToDelete.includes(e.source) && !blocksToDelete.includes(e.target)
      ));

      // Remove all the nodes
      setNodes(nds => nds.filter(n => !blocksToDelete.includes(n.id)));

      setDeletingBlocks(new Set());
    }, blocksToDelete.length * 100 + 400);
  }, [nodes, setNodes, setEdges]);

  // Handle block selection - FIXED: doesn't remove lower blocks when changing
  const handleBlockSelect = useCallback((blockId, selectedValue) => {
    // Update the completed blocks state
    setCompletedBlocks(prev => ({
      ...prev,
      [blockId]: selectedValue
    }));

    // Update the node with selected value
    setNodes(nds => 
      nds.map(node => {
        if (node.id === blockId) {
          return {
            ...node,
            data: {
              ...node.data,
              selectedValue
            }
          };
        }
        return node;
      })
    );

    // Determine current block index
    const currentBlockIndex = BLOCK_SEQUENCE.findIndex(
      block => blockId.startsWith(block.type)
    );

    // Add next block if there is one AND it doesn't already exist
    if (currentBlockIndex < BLOCK_SEQUENCE.length - 1) {
      const nextBlock = BLOCK_SEQUENCE[currentBlockIndex + 1];
      const nextBlockId = `${nextBlock.type}-1`;
      
      setNodes(nds => {
        // Check if next block already exists
        const exists = nds.some(n => n.id === nextBlockId);
        if (exists) return nds;

        // Find the current block to get its position
        const currentNode = nds.find(n => n.id === blockId);
        if (!currentNode) return nds;

        const newNode = {
          id: nextBlockId,
          type: nextBlock.type,
          position: { 
            x: currentNode.position.x + 300, 
            y: currentNode.position.y 
          },
          data: {
            selectedValue: null,
            showOptions: true
          }
        };

        return [...nds, newNode];
      });

      // Add edge connecting blocks if it doesn't exist
      setEdges(eds => {
        const edgeId = `edge-${blockId}-${nextBlockId}`;
        const exists = eds.some(e => e.id === edgeId);
        if (exists) return eds;
        
        return [...eds, {
          id: edgeId,
          source: blockId,
          target: nextBlockId,
          ...edgeOptions
        }];
      });
    }
  }, [setNodes, setEdges]);

  // Update node data with latest handlers
  const nodesWithHandlers = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        selectedValue: completedBlocks[node.id] || node.data.selectedValue,
        onSelect: (value) => handleBlockSelect(node.id, value),
        onDeleteSingle: handleDeleteSingle,
        onDeleteCascade: handleDeleteCascade,
        isFirst: node.id === 'target-1',
        isDeleting: deletingBlocks.has(node.id)
      }
    }));
  }, [nodes, completedBlocks, handleBlockSelect, handleDeleteSingle, handleDeleteCascade, deletingBlocks]);

  return (
    <div style={{ width: '100%', height: '100%', paddingTop: '60px' }}>
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        defaultEdgeOptions={edgeOptions}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Controls 
          style={{
            background: 'linear-gradient(135deg, #5C4033, #3D2914)',
            border: '1px solid #DAA520',
            borderRadius: '8px'
          }}
        />
        <Background 
          variant="dots" 
          gap={20} 
          size={1} 
          color="rgba(218, 165, 32, 0.15)" 
        />
      </ReactFlow>
      
      {/* Spell Summary Panel */}
      <SpellSummary completedBlocks={completedBlocks} />
      
      {/* Instructions Panel */}
      <InstructionsPanel />
    </div>
  );
};

// Summary panel showing current spell configuration
const SpellSummary = ({ completedBlocks }) => {
  const blockCount = Object.keys(completedBlocks).length;
  
  if (blockCount === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, rgba(61, 41, 20, 0.95), rgba(26, 15, 5, 0.95))',
      border: '2px solid #B8860B',
      borderRadius: '12px',
      padding: '16px 20px',
      minWidth: '200px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(218, 165, 32, 0.1)',
      zIndex: 10
    }}>
      <h3 style={{
        fontFamily: 'Cinzel, serif',
        color: '#FFD700',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '12px',
        borderBottom: '1px solid rgba(218, 165, 32, 0.3)',
        paddingBottom: '8px'
      }}>
        ✨ Spell Configuration
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.entries(completedBlocks).map(([blockId, value]) => (
          <div key={blockId} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#F4E4BC',
            fontSize: '13px'
          }}>
            <span>{value.icon}</span>
            <span>{value.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Instructions panel
const InstructionsPanel = () => (
  <div style={{
    position: 'absolute',
    top: '80px',
    left: '20px',
    background: 'linear-gradient(135deg, rgba(61, 41, 20, 0.9), rgba(26, 15, 5, 0.9))',
    border: '1px solid rgba(218, 165, 32, 0.4)',
    borderRadius: '10px',
    padding: '14px 18px',
    maxWidth: '220px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    zIndex: 10
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
      <li>Hover to delete blocks</li>
    </ol>
    <div style={{
      marginTop: '12px',
      paddingTop: '10px',
      borderTop: '1px solid rgba(218, 165, 32, 0.2)',
      fontSize: '11px',
      color: '#8B7355'
    }}>
      <div>⊘ Delete block only</div>
      <div>✕ Delete block + all below</div>
    </div>
  </div>
);

export default SpellBuilder;
