import React from 'react';
import { render, screen } from '@testing-library/react';
import ModelDetails from '../../../src/components/ModelStorageComponents/ModelDetails';
import { ModelMetadata } from '../../../src/types';

const mockModel: ModelMetadata = {
  id: 'abc123',
  filename: 'TestModel',
  inputWidth: 224,
  inputHeight: 224,
  inputShape: '224,224,3',
  colorMode: 'RGB',
  preprocessing: 'standardization',
  status: 'VALIDATING',
  storagePath: '/models/testmodel.h5',
};

describe('ModelDetails', () => {
  it('renders placeholder when model is null', () => {
    render(<ModelDetails model={null} />);
    expect(screen.getByText('Model Details')).toBeInTheDocument();
    expect(screen.getByText(/select a model/i)).toBeInTheDocument();
  });

  it('renders full model details when a model is provided', () => {
    render(<ModelDetails model={mockModel} />);
    expect(screen.getByText('TestModel')).toBeInTheDocument();
    expect(screen.getByText('VALIDATING')).toBeInTheDocument();

    expect(screen.getByText(/Model ID:/)).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'Input Shape: 224 x 224')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'Color Mode: RGB')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, el) => el?.textContent === 'Preprocessing: standardization'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, el) => el?.textContent === 'Storage Path: /models/testmodel.h5'
      )
    ).toBeInTheDocument();
  });
});
