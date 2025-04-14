// components/StatusBadge.tsx
import React from 'react';
import { Chip } from '@mui/material';

interface Props {
  status: 'EXTRACTING' | 'VALIDATING' | 'ANALYZING' | 'READY' | 'ERROR';
}

const statusColors: Record<
  Props['status'],
  'info' | 'warning' | 'success' | 'error' | 'default'
> = {
  EXTRACTING: 'info',
  VALIDATING: 'warning',
  ANALYZING: 'info',
  READY: 'success',
  ERROR: 'error',
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  return <Chip label={status} color={statusColors[status]} size="small" />;
};

export default StatusBadge;
