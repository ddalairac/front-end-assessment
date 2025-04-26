import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  const defaultProps = {
    onReset: vi.fn(),
    moves: 5,
    timeElapsed: '0:00'
  };

  it('renders the title correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId('game-header')).toBeInTheDocument();
    expect(screen.getByText('Memory Card Game')).toBeInTheDocument();
  });

  it('displays the correct number of moves', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId('moves-counter')).toHaveTextContent('Moves: 5');
  });

  it('calls onReset when reset button is clicked', () => {
    render(<Header {...defaultProps} />);
    fireEvent.click(screen.getByTestId('reset-button'));
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it('updates when moves prop changes', () => {
    const { rerender } = render(<Header {...defaultProps} />);
    expect(screen.getByTestId('moves-counter')).toHaveTextContent('Moves: 5');

    rerender(<Header {...defaultProps} moves={10} />);
    expect(screen.getByTestId('moves-counter')).toHaveTextContent('Moves: 10');
  });
});
