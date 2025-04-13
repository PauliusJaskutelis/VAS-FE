// components/StatusBadge.tsx
import React from 'react';
import { Chip } from '@mui/material';

interface Props {
  status:
    | 'uploading'
    | 'extracting'
    | 'validating'
    | 'analyzing'
    | 'ready'
    | 'error';
}

const statusColors: Record<
  string,
  'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'
> = {
  uploading: 'info',
  extracting: 'warning',
  validating: 'warning',
  analyzing: 'primary',
  ready: 'success',
  error: 'error',
};

const StatusBadge: React.FC<Props> = ({ status }) => (
  <Chip
    label={status.toUpperCase()}
    color={statusColors[status]}
    size="small"
  />
);

export default StatusBadge;
