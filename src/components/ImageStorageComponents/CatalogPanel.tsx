// src/components/ImageStorageComponents/CatalogPanel.tsx
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { ExpandLess, ExpandMore, Delete } from '@mui/icons-material';
import { CatalogNode } from '../../types';

interface Props {
  tree: CatalogNode[];
  selectedPath: string[];
  onSelect: (path: string[]) => void;
  onDelete?: (path: string[]) => void;
  onAdd?: (parentPath: string[], folderName: string) => void;
}

const CatalogPanel: React.FC<Props> = ({
  tree,
  selectedPath,
  onSelect,
  onDelete,
  onAdd,
}) => {
  const [newFolderName, setNewFolderName] = useState('');

  const renderNode = (node: CatalogNode, path: string[] = []) => {
    const currentPath = [...path, node.name];
    const isSelected =
      JSON.stringify(currentPath) === JSON.stringify(selectedPath);
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded =
      selectedPath.length > path.length &&
      selectedPath.slice(0, path.length).join('/') === currentPath.join('/');

    return (
      <Box key={currentPath.join('/')} ml={path.length * 2}>
        <ListItemButton
          selected={isSelected}
          onClick={() => onSelect(currentPath)}
        >
          <ListItemText primary={node.name} />
          {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          {onDelete && (
            <IconButton
              edge="end"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(currentPath);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </ListItemButton>
        {hasChildren && isExpanded && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            {node.children!.map((child) => renderNode(child, currentPath))}
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <List dense disablePadding>
        <ListItemButton
          selected={selectedPath.length === 0}
          onClick={() => onSelect([])}
        >
          <ListItemText primary="Image Catalogs" />
        </ListItemButton>
        {tree.map((node) => renderNode(node))}
      </List>

      {/* Add Folder Interface */}
      {onAdd && (
        <Box mt={2} display="flex" gap={1}>
          <TextField
            size="small"
            fullWidth
            label="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => {
              if (newFolderName.trim()) {
                onAdd(selectedPath, newFolderName.trim());
                setNewFolderName('');
              }
            }}
          >
            Add
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CatalogPanel;
