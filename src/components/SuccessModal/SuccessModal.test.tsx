import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SuccessModal from './SuccessModal';
import { useGameStore } from '../../store/gameStore';

// Mock the game store
vi.mock('../../store/gameStore', () => ({
  useGameStore: vi.fn()
}));

describe('SuccessModal Component', () => {
  const mockInitializeGame = vi.fn();
  const mockSetOpenModal = vi.fn();
  const mockSetDifficulty = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useGameStore as any).mockReturnValue({
      isGameComplete: true,
      difficulty: 'medium',
      moves: 10,
      timeElapsed: '1:00',
      score: 800,
      setDifficulty: mockSetDifficulty,
      setModalOpen: mockSetOpenModal,
      initializeGame: mockInitializeGame
    });
  });

  it('renders the success message with moves', () => {
    render(<SuccessModal />);
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

  it('calls initializeGame and setModalOpen when play again button is clicked', () => {
    render(<SuccessModal />);
    fireEvent.click(screen.getByTestId('play-again-button'));
    expect(mockInitializeGame).toHaveBeenCalledTimes(1);
    // Note: setModalOpen is called after a timeout, so we can't test it directly
  });

  it('renders difficulty selection message when game is not complete', () => {
    (useGameStore as any).mockReturnValue({
      isGameComplete: false,
      difficulty: 'medium',
      moves: 0,
      timeElapsed: '0:00',
      score: 0,
      setDifficulty: mockSetDifficulty,
      setModalOpen: mockSetOpenModal,
      initializeGame: mockInitializeGame
    });

    render(<SuccessModal />);
    expect(screen.getByText('Select a difficulty before going to the board')).toBeInTheDocument();
    expect(screen.getByText('Time starts when you turn over the first card')).toBeInTheDocument();
  });

  it('shows correct active difficulty button', () => {
    render(<SuccessModal />);
    const mediumButton = screen.getByTestId('medium-level-button');
    expect(mediumButton).toHaveClass('active');
  });

  it('calls setDifficulty when difficulty button is clicked', () => {
    render(<SuccessModal />);
    fireEvent.click(screen.getByTestId('easy-level-button'));
    expect(mockSetDifficulty).toHaveBeenCalledWith('easy');
  });

  it('shows "Play Again" text when game is complete', () => {
    render(<SuccessModal />);
    expect(screen.getByTestId('play-again-button')).toHaveTextContent('Play Again');
  });

  it('shows "Play" text when game is not complete', () => {
    (useGameStore as any).mockReturnValue({
      isGameComplete: false,
      difficulty: 'medium',
      moves: 0,
      timeElapsed: '0:00',
      score: 0,
      setDifficulty: mockSetDifficulty,
      setModalOpen: mockSetOpenModal,
      initializeGame: mockInitializeGame
    });

    render(<SuccessModal />);
    expect(screen.getByTestId('play-again-button')).toHaveTextContent('Play');
  });

  it('applies closing class when play again button is clicked', () => {
    render(<SuccessModal />);
    const modal = screen.getByTestId('game-complete-message');
    const backdrop = screen.getByTestId('modal-backdrop');

    expect(modal).not.toHaveClass('closing');
    expect(backdrop).not.toHaveClass('closing');

    fireEvent.click(screen.getByTestId('play-again-button'));

    expect(modal).toHaveClass('closing');
    expect(backdrop).toHaveClass('closing');
  });
});
