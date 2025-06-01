import { useEffect } from 'react';
import { useResults } from '../context/ResultsContext';

const DummyResultsLoader = () => {
  const { addImageResult } = useResults();

  useEffect(() => {
    addImageResult({
      filename: '2.png',
      preview:
        'https://upload.wikimedia.org/wikipedia/commons/2/27/MnistExamples.png',
      models: {
        'Model A': [{ label: '1', confidence: 1.0 }],
        'Model B': [{ label: '2', confidence: 0.92 }],
      },
      description: 'The image likely shows a handwritten digit 1.',
    });
  }, []);

  return null;
};

export default DummyResultsLoader;
