import React, { createContext, useContext, useState } from 'react';

interface ClassificationResult {
  label: string;
  confidence: number;
}

interface ImageResult {
  filename: string;
  preview: string; // base64 or object URL
  results: ClassificationResult[];
}

interface ResultsContextProps {
  images: ImageResult[];
  addImageResult: (image: ImageResult) => void;
  clearResults: () => void;
}

const ResultsContext = createContext<ResultsContextProps | undefined>(
  undefined
);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<ImageResult[]>([]);

  const addImageResult = (image: ImageResult) => {
    setImages((prev) => [...prev, image]);
  };

  const clearResults = () => {
    setImages([]);
  };

  return (
    <ResultsContext.Provider value={{ images, addImageResult, clearResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = (): ResultsContextProps => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
