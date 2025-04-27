import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  const defaultProps = {
    onReset: vi.fn(),
    moves: 5,
    timeElapsed: '1:00',
    setOpenModal: vi.fn()
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
    fireEvent.click(screen.getByTestId('reset-game-button'));
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  it('updates when moves prop changes', () => {
    const { rerender } = render(<Header {...defaultProps} />);
    expect(screen.getByTestId('moves-counter')).toHaveTextContent('Moves: 5');

    rerender(<Header {...defaultProps} moves={10} />);
    expect(screen.getByTestId('moves-counter')).toHaveTextContent('Moves: 10');
  });

  it('disables reset button when timeElapsed is 0:00', () => {
    render(<Header {...defaultProps} timeElapsed="0:00" />);
    const resetButton = screen.getByTestId('reset-game-button');
    expect(resetButton).toBeDisabled();
  });

  it('enables reset button when timeElapsed is not 0:00', () => {
    render(<Header {...defaultProps} timeElapsed="1:00" />);
    const resetButton = screen.getByTestId('reset-game-button');
    expect(resetButton).not.toBeDisabled();
  });

  it('calls both onReset and setOpenModal when change level button is clicked', () => {
    render(<Header {...defaultProps} />);
    fireEvent.click(screen.getByTestId('change-level-button'));
    expect(defaultProps.onReset).toHaveBeenCalledTimes(2);
    expect(defaultProps.setOpenModal).toHaveBeenCalledWith(true);
  });

  it('displays the correct time elapsed', () => {
    render(<Header {...defaultProps} timeElapsed="1:30" />);
    expect(screen.getByTestId('time-counter')).toHaveTextContent('Time: 1:30');
  });
});
