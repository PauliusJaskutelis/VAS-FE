import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Divider, Grid } from '@mui/material';
import ImageCard from '../components/ImageStorageComponents/ImageCard';
import { CatalogNode, ImageMetadata } from '../types';
import CatalogPanel from '../components/ImageStorageComponents/CatalogPanel';
import {
  createCatalog,
  deleteCatalog,
  deleteImage,
  fetchCatalogChildren,
  fetchImagesByCatalog,
  fetchRootCatalogs,
  uploadImagesToCatalog,
} from '../services/api';
import {
  buildCatalogTree,
  findNodeByPath,
  findParentIdFromPath,
} from '../utils/tree';
import Navigation from '../components/Navigation';

const ImageStoragePage = () => {
  const [catalogTree, setCatalogTree] = useState<CatalogNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>(['Uncategorized']);
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    null
  );

  const [images, setImages] = useState<ImageMetadata[]>([]);

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
    const selectedId = findParentIdFromPath(catalogTree, path);

    setSelectedPath(path);
    setSelectedCatalogId(selectedId || null);

    if (selectedId) {
      try {
        const imgs = await fetchImagesByCatalog(selectedId);
        setImages(imgs);
      } catch (err) {
        console.error('❌ Failed to fetch images for catalog', err);
      }

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

        const node = findNodeByPath(catalogTree, path);
        if (node && (!node.children || node.children.length === 0)) {
          setCatalogTree((prev) => updateNode(prev, path));
        }
      };

      await updateTreeWithChildren();
    } else {
      // Root: clear images + refresh entire root catalog tree
      setImages([]);

      try {
        const rootCatalogs = await fetchRootCatalogs();
        const rebuiltTree = buildCatalogTree(rootCatalogs);
        setCatalogTree(rebuiltTree);
      } catch (err) {
        console.error('❌ Failed to refresh root catalogs', err);
      }
    }
  };

  const handleRemoveCatalog = async (targetPath: string[]) => {
    const catalogId = findParentIdFromPath(catalogTree, targetPath);
    if (!catalogId) {
      alert('Could not resolve catalog ID.');
      return;
    }

    try {
      await deleteCatalog(catalogId);

      const removeNode = (
        nodes: CatalogNode[],
        path: string[]
      ): CatalogNode[] =>
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
    } catch (err) {
      console.error('❌ Failed to delete catalog:', err);
      alert('Failed to delete folder.');
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImage(imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error('❌ Failed to delete image:', err);
      alert('Failed to delete image.');
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const catalogId = findParentIdFromPath(catalogTree, selectedPath);
    if (!catalogId) {
      alert('Please select a folder to upload images.');
      return;
    }

    try {
      const uploadedImages = await uploadImagesToCatalog(
        catalogId,
        Array.from(files)
      );
      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (err) {
      console.error('❌ Failed to upload images:', err);
    }
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
    <>
      <Navigation />
      <Box
        sx={{
          p: 3,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
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
                  .filter((img) => img.catalogId === selectedCatalogId)
                  .map((img) => (
                    <ImageCard
                      key={img.id}
                      imageId={img.id}
                      filename={img.filename}
                      onDelete={() => {
                        handleDeleteImage(img.id);
                      }}
                    />
                  ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ImageStoragePage;
