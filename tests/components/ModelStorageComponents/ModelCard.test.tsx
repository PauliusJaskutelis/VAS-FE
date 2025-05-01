import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModelCard from '../../../src/components/ModelStorageComponents/ModelCard';
import { ModelMetadata } from '../../../src/types';

const mockModel: ModelMetadata = {
  id: '123',
  filename: 'example_model.h5',
  inputWidth: 224,
  inputHeight: 224,
  inputShape: '224,224,3',
  colorMode: 'RGB',
  preprocessing: 'NONE',
  status: 'READY',
  storagePath: '/models/example_model.h5',
};

describe('ModelCard', () => {
  it('renders model filename and shape', () => {
    render(<ModelCard model={mockModel} />);
    expect(screen.getByText('example_model.h5')).toBeInTheDocument();
    expect(screen.getByText('Shape: 224x224 RGB')).toBeInTheDocument();
    expect(screen.getByText('READY')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ModelCard model={mockModel} onClick={handleClick} />);
    fireEvent.click(screen.getByText('example_model.h5'));
    expect(handleClick).toHaveBeenCalled();
  });
});
