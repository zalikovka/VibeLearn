import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TargetBlock, MagicSchoolBlock, ProjectileFormBlock } from './blocks';

// Block type definitions
const BLOCK_SEQUENCE = [
  { type: 'target', Component: TargetBlock },
  { type: 'magicSchool', Component: MagicSchoolBlock },
  { type: 'projectileForm', Component: ProjectileFormBlock }
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

const SpellBuilder = () => {
  // Track which blocks have been completed
  const [completedBlocks, setCompletedBlocks] = useState({});
  
  // Initialize with just the first block
  const initialNodes = [
    {
      id: 'target-1',
      type: 'target',
      position: { x: 50, y: 200 },
      data: {
        selectedValue: null,
        onSelect: (value) => handleBlockSelect('target-1', value),
        showOptions: true
      }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Handle block selection
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

    // Add next block if there is one
    if (currentBlockIndex < BLOCK_SEQUENCE.length - 1) {
      const nextBlock = BLOCK_SEQUENCE[currentBlockIndex + 1];
      const nextBlockId = `${nextBlock.type}-1`;
      
      // Check if next block already exists
      setNodes(nds => {
        const exists = nds.some(n => n.id === nextBlockId);
        if (exists) return nds;

        const lastNode = nds[nds.length - 1];
        const newNode = {
          id: nextBlockId,
          type: nextBlock.type,
          position: { 
            x: lastNode.position.x + 300, 
            y: lastNode.position.y 
          },
          data: {
            selectedValue: null,
            onSelect: (value) => handleBlockSelect(nextBlockId, value),
            showOptions: true
          }
        };

        return [...nds, newNode];
      });

      // Add edge connecting blocks
      const newEdge = {
        id: `edge-${blockId}-${nextBlockId}`,
        source: blockId,
        target: nextBlockId,
        ...edgeOptions
      };

      setEdges(eds => {
        const exists = eds.some(e => e.id === newEdge.id);
        if (exists) return eds;
        return [...eds, newEdge];
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
        onSelect: (value) => handleBlockSelect(node.id, value)
      }
    }));
  }, [nodes, completedBlocks, handleBlockSelect]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(218, 165, 32, 0.1)'
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

export default SpellBuilder;

