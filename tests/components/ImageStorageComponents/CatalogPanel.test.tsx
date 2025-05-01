import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CatalogPanel from '../../../src/components/ImageStorageComponents/CatalogPanel';
import { CatalogNode } from '../../../src/types';

// Disable animation for testing since this makes the test hang
jest.mock(
  '@mui/material/Collapse',
  () => (props: any) => (props.in ? <div>{props.children}</div> : null)
);

const mockTree: CatalogNode[] = [
  {
    id: '1',
    name: 'Root',
    parentId: null,
    children: [
      {
        id: '2',
        name: 'Subfolder',
        parentId: '1',
        children: [],
      },
    ],
  },
];

describe('CatalogPanel', () => {
  it('renders root and subfolder', () => {
    render(
      <CatalogPanel
        tree={mockTree}
        selectedPath={['Root', 'Subfolder']}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Subfolder')).toBeInTheDocument();
  });

  it('calls onSelect with correct path', () => {
    const handleSelect = jest.fn();
    render(
      <CatalogPanel
        tree={mockTree}
        selectedPath={['Root', 'Subfolder']}
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByText('Subfolder'));
    expect(handleSelect).toHaveBeenCalledWith(['Root', 'Subfolder']);
  });

  it('calls onDelete with correct path', () => {
    const handleDelete = jest.fn();
    render(
      <CatalogPanel
        tree={mockTree}
        selectedPath={['Root', 'Subfolder']}
        onSelect={() => {}}
        onDelete={handleDelete}
      />
    );
    const subfolderDeleteButton = screen.getByLabelText('delete-Subfolder');
    fireEvent.click(subfolderDeleteButton);
    expect(handleDelete).toHaveBeenCalledWith(['Root', 'Subfolder']);
  });

  it('calls onAdd with correct path and folder name', () => {
    const handleAdd = jest.fn();
    render(
      <CatalogPanel
        tree={mockTree}
        selectedPath={['Root', 'Subfolder']}
        onSelect={() => {}}
        onAdd={handleAdd}
      />
    );

    const input = screen.getByLabelText(/New folder name/i);
    fireEvent.change(input, { target: { value: 'NewFolder' } });
    fireEvent.click(screen.getByText(/Add/i));

    expect(handleAdd).toHaveBeenCalledWith(['Root', 'Subfolder'], 'NewFolder');
  });
});
