import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SuccessModal from './SuccessModal';

describe('SuccessModal Component', () => {
  const mockOnPlayAgain = vi.fn();

  it('renders the success message with moves', () => {
    render(<SuccessModal moves={10} timeElapsed={60} onPlayAgain={mockOnPlayAgain} />);
    expect(screen.getByTestId('game-complete-message')).toBeInTheDocument();
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You completed the game in 10 moves.')).toBeInTheDocument();
    expect(screen.getByText('Time: 1:00')).toBeInTheDocument();
  });

  it('calls onPlayAgain when play again button is clicked', () => {
    render(<SuccessModal moves={10} timeElapsed={60} onPlayAgain={mockOnPlayAgain} />);
    fireEvent.click(screen.getByTestId('play-again-button'));
    expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
  });
});
