import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { useNavigate } from 'react-router-dom';

// 🧪 Mocks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../src/components/Navigation', () => (props: any) => (
  <div>
    <div>Mock Navigation</div>
    <button onClick={props.onSettingsClick}>Open Settings</button>
  </div>
));

jest.mock(
  '../../src/components/Settings',
  () => (props: any) =>
    props.open ? (
      <div>
        <div>Settings Panel</div>
        <button onClick={props.onClose}>Close Settings</button>
      </div>
    ) : null
);

jest.mock('../../src/components/ImageUploader', () => (props: any) => (
  <div>
    <div>Uploader</div>
    <button
      onClick={() =>
        props.onUploadSuccess({
          results: ['label1', 'label2'],
          imageBase64: 'base64string',
        })
      }
    >
      Simulate Upload
    </button>
  </div>
));

describe('Home Page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders Navigation and Uploader', () => {
    render(<Home />);
    expect(screen.getByText('Mock Navigation')).toBeInTheDocument();
    expect(screen.getByText('Uploader')).toBeInTheDocument();
  });

  it('opens settings when nav button is clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Open Settings'));
    expect(screen.getByText('Settings Panel')).toBeInTheDocument();
  });

  it('closes settings when close is clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Open Settings'));
    fireEvent.click(screen.getByText('Close Settings'));
    expect(screen.queryByText('Settings Panel')).not.toBeInTheDocument();
  });

  it('navigates to results on upload success', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Simulate Upload'));
    expect(mockNavigate).toHaveBeenCalledWith('/results', {
      state: {
        results: ['label1', 'label2'],
        imagePreview: 'base64string',
      },
    });
  });
});
