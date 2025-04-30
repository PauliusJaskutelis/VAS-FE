import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../../src/components/Navigation';

describe('Navigation', () => {
  it('renders the title', () => {
    render(<Navigation />);
    expect(screen.getByText('VAS')).toBeInTheDocument();
  });

  it('calls onSettingsClick when settings button is clicked', () => {
    const mockClick = jest.fn();
    render(<Navigation onSettingsClick={mockClick} />);

    const button = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
