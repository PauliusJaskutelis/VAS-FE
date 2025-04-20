import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import ImageCard from '../components/ImageStorageComponents/ImageCard';
import { CatalogNode } from '../types';
import CatalogPanel from '../components/ImageStorageComponents/CatalogPanel';

const ImageStoragePage = () => {
    const [catalogTree, setCatalogTree] = useState<CatalogNode[]>([
      { name: 'Uncategorized' },
      { name: 'Animals' },
      { name: 'Documents' },
    ]);
  
    const [selectedPath, setSelectedPath] = useState<string[]>(['Uncategorized']);
  
    const [images, setImages] = useState<
      { file: File; preview: string; catalogPath: string[] }[]
    >([]);
  
    const getPathString = (path: string[]) => path.join('/');
  
    const handleAddCatalog = (parentPath: string[], folderName: string) => {
      const newNode = { name: folderName };
  
      const addNode = (nodes: CatalogNode[], path: string[]): CatalogNode[] =>
        nodes.map((node) => {
          if (node.name === path[0]) {
            if (path.length === 1) {
              return {
                ...node,
                children: [...(node.children || []), newNode],
              };
            } else {
              return {
                ...node,
                children: addNode(node.children || [], path.slice(1)),
              };
            }
          }
          return node;
        });
  
      setCatalogTree((prev) => addNode(prev, parentPath));
    };
  
    const handleRemoveCatalog = (targetPath: string[]) => {
      const removeNode = (nodes: CatalogNode[], path: string[]): CatalogNode[] =>
        nodes
          .map((node) => {
            if (node.name === path[0]) {
              if (path.length === 1) {
                return null;
              } else {
                return {
                  ...node,
                  children: node.children
                    ? removeNode(node.children, path.slice(1))
                    : [],
                };
              }
            }
            return node;
          })
          .filter(Boolean) as CatalogNode[];
  
      setCatalogTree((prev) => removeNode(prev, targetPath));
    };
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
  
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        catalogPath: selectedPath,
      }));
  
      setImages((prev) => [...prev, ...newImages]);
    };
  
    const selectedPathStr = getPathString(selectedPath);
  
    return (
      <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">Image Storage</Typography>
          <Button component="label" variant="contained">
            Upload Images
            <input hidden multiple type="file" accept="image/*" onChange={handleFileUpload} />
          </Button>
        </Box>
  
        <Divider sx={{ mb: 2 }} />
  
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={3}>
            <CatalogPanel
              tree={catalogTree}
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
              onAdd={handleAddCatalog}
              onDelete={handleRemoveCatalog}
            />
          </Grid>
  
          <Grid item xs={12} md={9}>
            <Paper sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedPathStr || 'Uncategorized'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {images
                  .filter((img) => getPathString(img.catalogPath) === selectedPathStr)
                  .map((img, index) => (
                    <ImageCard
                      key={index}
                      imageUrl={img.preview}
                      filename={img.file.name}
                      onDelete={() =>
                        setImages((prev) =>
                          prev.filter(
                            (_, i) =>
                              i !== index ||
                              getPathString(img.catalogPath) !== selectedPathStr
                          )
                        )
                      }
                    />
                  ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default ImageStoragePage;