import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageCard from '../../../src/components/ImageStorageComponents/ImageCard';

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/fake-url');
  global.URL.revokeObjectURL = jest.fn();
});

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      blob: () =>
        Promise.resolve(new Blob(['image data'], { type: 'image/png' })),
    })
  ) as jest.Mock;
  localStorage.setItem('token', 'mock-token');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ImageCard', () => {
  it('renders with filename and fetches preview image', async () => {
    render(<ImageCard imageId="123" filename="test.png" />);

    expect(screen.getByText('test.png')).toBeInTheDocument();

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/images/123',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token',
          }),
        })
      )
    );
  });

  it('calls onDelete when delete icon is clicked', async () => {
    const handleDelete = jest.fn();

    render(
      <ImageCard
        imageId="123"
        filename="deletable.png"
        onDelete={handleDelete}
      />
    );

    const deleteButton = await screen.findByRole('button'); // Only one button
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });

  it('handles fetch failure gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('fetch failed')
    );

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ImageCard imageId="error-test" />);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Failed to load image preview:'),
        'fetch failed'
      );
    });

    errorSpy.mockRestore();
  });
});
