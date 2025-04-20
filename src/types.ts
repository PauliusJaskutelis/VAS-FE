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
export interface Catalog {
  name: string;
  images: Image[];
}

export interface Image {
  id: string;
  filename: string;
  url: string;
  uploadDate: string;
}

export type CatalogNode = {
  name: string;
  children?: CatalogNode[]; // For future nesting
};