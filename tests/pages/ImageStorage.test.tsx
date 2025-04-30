import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageStoragePage from '../../src/pages/ImageStorage';
import * as api from '../../src/services/api';

// Mocks
jest.mock('../../src/components/Navigation', () => () => <div>MockNav</div>);
jest.mock(
  '../../src/components/ImageStorageComponents/CatalogPanel',
  () => (props: any) => (
    <div>
      <div>Catalog Tree</div>
      <button onClick={() => props.onSelect(['MockFolder'])}>
        Select Folder
      </button>
      <button onClick={() => props.onAdd(['MockFolder'], 'NewSubFolder')}>
        Add Folder
      </button>
      <button onClick={() => props.onDelete(['MockFolder'])}>
        Delete Folder
      </button>
    </div>
  )
);
jest.mock(
  '../../src/components/ImageStorageComponents/ImageCard',
  () => (props: any) => (
    <div>
      <div>{props.filename}</div>
      <button onClick={props.onDelete}>DeleteImage</button>
    </div>
  )
);
jest.mock('../../src/config', () => ({
  API_BASE_URL: 'http://localhost:8080',
}));

// Setup createObjectURL
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:preview');
});

// API mocks
beforeEach(() => {
  jest
    .spyOn(api, 'fetchRootCatalogs')
    .mockResolvedValue([
      { id: '1', name: 'MockFolder', parentId: null, children: [] },
    ]);
  jest.spyOn(api, 'fetchImagesByCatalog').mockResolvedValue([
    {
      id: 'img1',
      filename: 'test1.jpg',
      catalogId: '1',
      contentType: 'image/jpeg',
      format: 'JPEG',
      colorMode: 'RGB',
      width: 800,
      height: 600,
      uploadDate: '2024-04-01T12:00:00Z',
      ownerId: 'user1',
    },
  ]);
  jest.spyOn(api, 'fetchCatalogChildren').mockResolvedValue([]);
  jest.spyOn(api, 'createCatalog').mockResolvedValue({
    id: '2',
    name: 'NewSubFolder',
    parentId: '1',
  });
  jest.spyOn(api, 'deleteCatalog').mockResolvedValue(undefined);
  jest.spyOn(api, 'uploadImagesToCatalog').mockResolvedValue([
    {
      id: 'img2',
      filename: 'test2.jpg',
      catalogId: '1',
      contentType: 'image/jpeg',
      format: 'JPEG',
      colorMode: 'RGB',
      width: 640,
      height: 480,
      uploadDate: '2024-04-02T12:00:00Z',
      ownerId: 'user1',
    },
  ]);
  jest.spyOn(api, 'deleteImage').mockResolvedValue(undefined);
});

describe('ImageStoragePage', () => {
  it('renders page and loads catalogs', async () => {
    render(<ImageStoragePage />);
    expect(await screen.findByText('Image Storage')).toBeInTheDocument();
    expect(await screen.findByText('Catalog Tree')).toBeInTheDocument();
  });

  it('selects folder and shows images', async () => {
    render(<ImageStoragePage />);
    await waitFor(() => {
      expect(screen.getByText('Catalog Tree')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Select Folder'));
    expect(await screen.findByText('test1.jpg')).toBeInTheDocument();
  });

  it('adds a folder', async () => {
    render(<ImageStoragePage />);
    await waitFor(() => {
      expect(screen.getByText('Catalog Tree')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Add Folder'));
    await waitFor(() => {
      expect(api.createCatalog).toHaveBeenCalledWith('NewSubFolder', '1');
    });
  });

  it('deletes a folder', async () => {
    render(<ImageStoragePage />);
    await waitFor(() => {
      expect(screen.getByText('Catalog Tree')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Delete Folder'));
    await waitFor(() => {
      expect(api.deleteCatalog).toHaveBeenCalledWith('1');
    });
  });

  it('uploads images and displays new entry', async () => {
    render(<ImageStoragePage />);
    await waitFor(() => {
      expect(screen.getByText('Catalog Tree')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Select Folder'));

    const input = screen.getByLabelText('Upload Images');
    const file = new File(['image'], 'upload.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(api.uploadImagesToCatalog).toHaveBeenCalled();
      expect(screen.getByText('test2.jpg')).toBeInTheDocument();
    });
  });

  it('deletes an image', async () => {
    render(<ImageStoragePage />);
    await waitFor(() => {
      expect(screen.getByText('Catalog Tree')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Select Folder'));

    await waitFor(() => {
      expect(screen.getByText('test1.jpg')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('DeleteImage'));

    await waitFor(() => {
      expect(api.deleteImage).toHaveBeenCalledWith('img1');
    });
  });
});
