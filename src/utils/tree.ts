import { CatalogNode } from '../types';

export const buildCatalogTree = (flatList: CatalogNode[]): CatalogNode[] => {
  const map = new Map<string, CatalogNode>();
  const roots: CatalogNode[] = [];

  flatList.forEach((node) => {
    map.set(node.id, { ...node, children: [] });
  });

  flatList.forEach((node) => {
    const parent = node.parentId ? map.get(node.parentId) : null;
    if (parent) {
      parent.children?.push(map.get(node.id)!);
    } else {
      roots.push(map.get(node.id)!);
    }
  });

  return roots;
};

export const findParentIdFromPath = (
  nodes: CatalogNode[],
  path: string[]
): string | null => {
  let current: CatalogNode | undefined;
  let currentChildren = nodes;

  for (const segment of path) {
    current = currentChildren.find((node) => node.name === segment);
    if (!current) return null;
    currentChildren = current.children || [];
  }

  return current?.id || null;
};

export const findNodeByPath = (
  nodes: CatalogNode[],
  path: string[]
): CatalogNode | null => {
  let current: CatalogNode | undefined;
  let currentChildren = nodes;

  for (const segment of path) {
    current = currentChildren.find((node) => node.name === segment);
    if (!current) return null;
    currentChildren = current.children || [];
  }

  return current || null;
};

export const removeNodeById = (
  nodes: CatalogNode[],
  targetId: string
): CatalogNode[] => {
  return nodes
    .map((node) => {
      if (node.id === targetId) {
        return null; // Remove this node
      }

      if (node.children) {
        return { ...node, children: removeNodeById(node.children, targetId) };
      }

      return node;
    })
    .filter(Boolean) as CatalogNode[];
};
