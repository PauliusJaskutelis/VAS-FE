import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ResultsProvider, useResults } from '../../src/context/ResultsContext';

describe('ResultsContext', () => {
  it('adds and clears image results', () => {
    const wrapper = ({ children }: any) => (
      <ResultsProvider>{children}</ResultsProvider>
    );
    const { result } = renderHook(() => useResults(), { wrapper });

    const testImage = {
      filename: 'cat.jpg',
      preview: 'data:image/png;base64,123',
      results: [{ label: 'Cat', confidence: 0.9 }],
    };

    act(() => {
      result.current.addImageResult(testImage);
    });

    expect(result.current.images).toHaveLength(1);
    expect(result.current.images[0].filename).toBe('cat.jpg');

    act(() => {
      result.current.clearResults();
    });

    expect(result.current.images).toHaveLength(0);
  });

  it('handles multiple image results', () => {
    const wrapper = ({ children }: any) => (
      <ResultsProvider>{children}</ResultsProvider>
    );
    const { result } = renderHook(() => useResults(), { wrapper });

    const image1 = { filename: 'a.jpg', preview: 'url1', results: [] };
    const image2 = { filename: 'b.jpg', preview: 'url2', results: [] };

    act(() => {
      result.current.addImageResult(image1);
      result.current.addImageResult(image2);
    });

    expect(result.current.images).toHaveLength(2);
    expect(result.current.images[0].filename).toBe('a.jpg');
    expect(result.current.images[1].filename).toBe('b.jpg');
  });
});
