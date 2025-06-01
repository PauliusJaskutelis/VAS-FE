import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../../src/components/Navigation';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  it('renders the title', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText('VAS')).toBeInTheDocument();
  });

  it('calls onSettingsClick when settings button is clicked', () => {
    const mockClick = jest.fn();
    render(
      <MemoryRouter>
        <Navigation onSettingsClick={mockClick} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /settings/i });
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
