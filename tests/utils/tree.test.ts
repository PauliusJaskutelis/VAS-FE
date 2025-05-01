import {
  buildCatalogTree,
  findParentIdFromPath,
  findNodeByPath,
  removeNodeById,
} from '../../src/utils/tree';
import { CatalogNode } from '../../src/types';

const flatList: CatalogNode[] = [
  { id: '1', name: 'Root', parentId: null },
  { id: '2', name: 'Sub1', parentId: '1' },
  { id: '3', name: 'Sub2', parentId: '1' },
  { id: '4', name: 'Nested', parentId: '2' },
];

describe('tree utils', () => {
  let tree: CatalogNode[];

  beforeEach(() => {
    tree = buildCatalogTree(flatList);
  });

  it('buildCatalogTree creates correct nested structure', () => {
    expect(tree).toHaveLength(1);
    expect(tree[0].name).toBe('Root');
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children?.[0].name).toBe('Sub1');
    expect(tree[0].children?.[0].children?.[0].name).toBe('Nested');
  });

  it('findParentIdFromPath returns correct parent ID', () => {
    const id = findParentIdFromPath(tree, ['Root', 'Sub1', 'Nested']);
    expect(id).toBe('4');
  });

  it('findNodeByPath returns correct node', () => {
    const node = findNodeByPath(tree, ['Root', 'Sub1']);
    expect(node?.id).toBe('2');
    expect(node?.name).toBe('Sub1');
  });

  it('removeNodeById removes the correct node', () => {
    const newTree = removeNodeById(tree, '2'); // Remove 'Sub1'
    expect(findNodeByPath(newTree, ['Root', 'Sub1'])).toBeNull();
    expect(findNodeByPath(newTree, ['Root', 'Sub2'])).not.toBeNull();
  });
});
