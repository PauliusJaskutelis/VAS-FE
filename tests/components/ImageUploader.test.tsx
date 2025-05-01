import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUploader from '../../src/components/ImageUploader';
import { classifyImage, fetchModels } from '../../src/services/api';
import { useSettings } from '../../src/context/SettingsContext';
import { useResults } from '../../src/context/ResultsContext';

// 🧪 Mocks
jest.mock('../../src/services/api');
jest.mock('../../src/context/SettingsContext');
jest.mock('../../src/context/ResultsContext');

jest.mock('../../src/config', () => ({
  API_BASE_URL: 'http://localhost:8080',
}));

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mock-preview-url');
});

// Dummy file
const dummyFile = new File(['test'], 'test-image.jpg', { type: 'image/jpeg' });

describe('ImageUploader', () => {
  beforeEach(() => {
    // Default mocks
    (useSettings as jest.Mock).mockReturnValue({
      settings: { predictionCount: 3, confidenceThreshold: 0.7 },
    });

    (useResults as jest.Mock).mockReturnValue({
      addImageResult: jest.fn(),
    });

    (fetchModels as jest.Mock).mockResolvedValue([
      { id: 'model-1', filename: 'model1.h5' },
    ]);
  });

  it('renders upload interface', async () => {
    render(<ImageUploader />);
    expect(await screen.findByText(/Upload Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose a File/i)).toBeInTheDocument();
  });

  it('allows file selection and displays it', async () => {
    render(<ImageUploader />);

    const fileInput = screen.getByLabelText(/Choose a File/i);
    fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    await waitFor(() => {
      expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    });
  });

  it('calls classifyImage on upload and shows success', async () => {
    const onUploadSuccess = jest.fn();
    (classifyImage as jest.Mock).mockResolvedValue({
      data: [{ filename: 'test-image.jpg', results: ['Label A'] }],
    });

    render(<ImageUploader onUploadSuccess={onUploadSuccess} />);

    // Simulate file selection
    const fileInput = screen.getByLabelText(/Choose a File/i);
    fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    // Wait for upload button to appear
    const uploadButton = await screen.findByRole('button', { name: /Upload/i });

    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(classifyImage).toHaveBeenCalledTimes(1);
      console.log(onUploadSuccess.mock.calls[0][0]);
      expect(onUploadSuccess).toHaveBeenCalledWith([
        { filename: 'test-image.jpg', results: ['Label A'] },
      ]);
      expect(screen.getByText(/Successful Upload/i)).toBeInTheDocument();
    });
  });

  it('handles upload error and displays message', async () => {
    (classifyImage as jest.Mock).mockRejectedValue(new Error('Upload failed'));

    render(<ImageUploader />);

    const fileInput = screen.getByLabelText(/Choose a File/i);
    fireEvent.change(fileInput, { target: { files: [dummyFile] } });

    const uploadButton = await screen.findByRole('button', { name: /Upload/i });

    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(classifyImage).toHaveBeenCalled();
      expect(screen.getByText(/Error while uploading/i)).toBeInTheDocument();
    });
  });
});
