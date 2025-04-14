export interface ModelMetadata {
  id: string;
  filename: string;
  inputHeight: number;
  inputWidth: number;
  inputShape: string;
  colorMode: string;
  preprocessing: string;
  status: 'EXTRACTING' | 'VALIDATING' | 'ANALYZING' | 'READY' | 'ERROR';
  storagePath: string;
}
