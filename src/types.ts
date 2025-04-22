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

export interface ImageMetadata {
  id: string;
  filename: string;
  contentType: string;
  format: string;
  colorMode: string;
  width: number;
  height: number;
  uploadDate: string;
  catalogId: string;
  ownerId: string;
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
  id: string;
  name: string;
  parentId: string | null;
  children?: CatalogNode[];
};
