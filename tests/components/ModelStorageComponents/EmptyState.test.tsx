import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../../../src/components/ModelStorageComponents/EmptyState';

describe('EmptyState', () => {
  it('renders heading and description', () => {
    render(<EmptyState />);

    expect(screen.getByText('No models uploaded')).toBeInTheDocument();
    expect(screen.getByText(/Start by uploading a model/i)).toBeInTheDocument();
  });

  it('renders upload icon', () => {
    render(<EmptyState />);
    expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
  });
});
