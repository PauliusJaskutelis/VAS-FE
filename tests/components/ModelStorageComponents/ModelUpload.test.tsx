import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModelUpload from '../../../src/components/ModelStorageComponents/ModelUpload';
import { uploadModel } from '../../../src/services/api';
import { ModelMetadata } from '../../../src/types';

// Mock uploadModel API
jest.mock('../../../src/services/api', () => ({
  uploadModel: jest.fn(),
}));

const mockOnClose = jest.fn();
const mockOnModelUpload = jest.fn();

describe('ModelUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows error if fields are empty on upload', async () => {
    render(
      <ModelUpload
        open={true}
        onClose={mockOnClose}
        onModelUpload={mockOnModelUpload}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/please fill in all fields/i)
      ).toBeInTheDocument();
    });
  });

  it('uploads a model successfully and triggers callbacks', async () => {
    const mockFile = new File(['dummy content'], 'model.h5', {
      type: 'application/octet-stream',
    });

    const mockResponse: ModelMetadata = {
      id: '123',
      filename: 'MyModel',
      inputWidth: 224,
      inputHeight: 224,
      inputShape: '224,224,3',
      colorMode: 'RGB',
      preprocessing: 'normalize',
      status: 'READY',
      storagePath: '/models/model.h5',
    };

    (uploadModel as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ModelUpload
        open={true}
        onClose={mockOnClose}
        onModelUpload={mockOnModelUpload}
      />
    );

    fireEvent.change(screen.getByLabelText(/model name/i), {
      target: { value: 'MyModel' },
    });

    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    await waitFor(() => {
      expect(mockOnModelUpload).toHaveBeenCalledTimes(2); // optimistic + actual
      expect(mockOnClose).toHaveBeenCalled();
      expect(uploadModel).toHaveBeenCalledWith(
        mockFile,
        'MyModel',
        expect.any(String)
      );
    });
  });
});
