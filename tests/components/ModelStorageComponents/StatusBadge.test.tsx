import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../../src/components/ModelStorageComponents/StatusBadge';

describe('StatusBadge', () => {
  const statuses = [
    'EXTRACTING',
    'VALIDATING',
    'ANALYZING',
    'READY',
    'ERROR',
  ] as const;

  statuses.forEach((status) => {
    it(`renders ${status} badge correctly`, () => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });
});
