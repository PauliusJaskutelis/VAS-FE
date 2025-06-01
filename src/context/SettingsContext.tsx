import React, { createContext, useContext, useState } from 'react';

interface Settings {
  predictionCount: number;
  confidenceThreshold: number;
  selectedModelIds: string[];
  describeWithLLM: boolean;
}

interface SettingsProviderProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  predictionCount: 5,
  confidenceThreshold: 0.5,
  selectedModelIds: [],
  describeWithLLM: true,
};

export const SettingsContext = createContext<SettingsProviderProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsProviderProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
