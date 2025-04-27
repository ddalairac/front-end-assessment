import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SuccessModal from './SuccessModal';

describe('SuccessModal Component', () => {
  const mockOnPlayAgain = vi.fn();

  it('renders the success message with moves', () => {
    render(
      <SuccessModal
        moves={10}
        timeElapsed="1:00"
        score={800}
        onPlayAgain={mockOnPlayAgain}
      />
    );
    expect(screen.getByTestId('game-complete-message')).toBeInTheDocument();
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('You completed the game.')).toBeInTheDocument();
    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('1:00')).toBeInTheDocument();
    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  it('calls onPlayAgain when play again button is clicked', () => {
    render(
      <SuccessModal
        moves={10}
        timeElapsed="1:00"
        score={800}
        onPlayAgain={mockOnPlayAgain}
      />
    );
    fireEvent.click(screen.getByTestId('play-again-button'));
    expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
  });
});
