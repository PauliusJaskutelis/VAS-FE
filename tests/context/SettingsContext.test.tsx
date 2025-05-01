import React from 'react';
import { renderHook, act } from '@testing-library/react';
import {
  SettingsProvider,
  useSettings,
} from '../../src/context/SettingsContext';

describe('SettingsContext', () => {
  it('updates settings correctly', () => {
    const wrapper = ({ children }: any) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings.predictionCount).toBe(5);

    act(() => {
      result.current.updateSettings({ predictionCount: 10 });
    });

    expect(result.current.settings.predictionCount).toBe(10);
    expect(result.current.settings.confidenceThreshold).toBe(0.5);
  });

  it('partially updates settings without overwriting others', () => {
    const wrapper = ({ children }: any) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateSettings({ confidenceThreshold: 0.8 });
    });

    expect(result.current.settings.confidenceThreshold).toBe(0.8);
    expect(result.current.settings.predictionCount).toBe(5); // unchanged
  });

  it('initializes with default settings', () => {
    const wrapper = ({ children }: any) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual({
      predictionCount: 5,
      confidenceThreshold: 0.5,
    });
  });
});
