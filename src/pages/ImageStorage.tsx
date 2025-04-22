import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Divider, Grid } from '@mui/material';
import ImageCard from '../components/ImageStorageComponents/ImageCard';
import { CatalogNode } from '../types';
import CatalogPanel from '../components/ImageStorageComponents/CatalogPanel';
import {
  createCatalog,
  fetchCatalogChildren,
  fetchRootCatalogs,
} from '../services/api';
import {
  buildCatalogTree,
  findNodeByPath,
  findParentIdFromPath,
} from '../utils/tree';

const ImageStoragePage = () => {
  const [catalogTree, setCatalogTree] = useState<CatalogNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>(['Uncategorized']);

  const [images, setImages] = useState<
    { file: File; preview: string; catalogPath: string[] }[]
  >([]);

  const getPathString = (path: string[]) => path.join('/');

  const handleAddCatalog = async (parentPath: string[], folderName: string) => {
    const parentId = findParentIdFromPath(catalogTree, parentPath);

    try {
      const created = await createCatalog(folderName, parentId);

      const newNode: CatalogNode = {
        id: created.id,
        name: created.name,
        parentId: created.parentId,
        children: [],
      };

      const addNode = (nodes: CatalogNode[], path: string[]): CatalogNode[] =>
        nodes.map((node) => {
          if (node.name === path[0]) {
            if (path.length === 1) {
              return { ...node, children: [...(node.children || []), newNode] };
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
    } catch (err) {
      console.error('❌ Failed to create folder', err);
    }
  };

  const handleSelectCatalog = async (path: string[]) => {
    setSelectedPath(path);

    const selectedId = findParentIdFromPath(catalogTree, path);
    if (!selectedId) return;

    const updateTreeWithChildren = async () => {
      const children = await fetchCatalogChildren(selectedId);

      const updateNode = (
        nodes: CatalogNode[],
        path: string[]
      ): CatalogNode[] =>
        nodes.map((node) => {
          if (node.name === path[0]) {
            if (path.length === 1) {
              return { ...node, children: children };
            } else {
              return {
                ...node,
                children: updateNode(node.children || [], path.slice(1)),
              };
            }
          }
          return node;
        });

      setCatalogTree((prev) => updateNode(prev, path));
    };

    // Only fetch children if they haven't been loaded yet
    const node = findNodeByPath(catalogTree, path);
    if (node && (!node.children || node.children.length === 0)) {
      await updateTreeWithChildren();
    }
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

  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const flat = await fetchRootCatalogs();
        const tree = buildCatalogTree(flat);
        setCatalogTree(tree);
      } catch (err) {
        console.error('Failed to load catalogs', err);
      }
    };

    loadCatalogs();
  }, []);

  return (
    <Box
      sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Image Storage</Typography>
        <Button component="label" variant="contained">
          Upload Images
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={3}>
          <CatalogPanel
            tree={catalogTree}
            selectedPath={selectedPath}
            onSelect={handleSelectCatalog}
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
                .filter(
                  (img) => getPathString(img.catalogPath) === selectedPathStr
                )
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
