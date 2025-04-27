import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useGameStore } from './store/gameStore';

// Mock the Zustand store
vi.mock('./store/gameStore', () => ({
  useGameStore: vi.fn()
}));

describe('App Component', () => {
  const mockResetGame = vi.fn();
  const mockFlipCard = vi.fn();
  const mockInitializeCards = vi.fn();
  // Define the type of mockCards according to the Card interface
  const mockCards: { id: number; image: string; isFlipped: boolean; isMatched: boolean; pairId: number }[] = [];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders Header and CardGrid components', () => {
    // @ts-expect-error - we are mocking the hook
    useGameStore.mockReturnValue({
      cards: mockCards,
      moves: 0,
      resetGame: mockResetGame,
      isGameComplete: false,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeCards,
      flippedCardsID: []
    });

    render(<App />);

    expect(screen.getByTestId('memory-game-app')).toBeInTheDocument();
    expect(screen.getByTestId('game-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
    expect(mockInitializeCards).toHaveBeenCalledTimes(1);
  });

  it('displays game complete message when game is finished', () => {
    // @ts-expect-error - we are mocking the hook
    useGameStore.mockReturnValue({
      cards: mockCards,
      moves: 10,
      resetGame: mockResetGame,
      isGameComplete: true,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeCards,
      flippedCardsID: [],
      timeElapsed: '1:00',
      score: 800
    });

    render(<App />);

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

  it('calls resetGame when play again button is clicked', () => {
    // @ts-expect-error - we are mocking the hook
    useGameStore.mockReturnValue({
      cards: mockCards,
      moves: 10,
      resetGame: mockResetGame,
      isGameComplete: true,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeCards,
      flippedCardsID: []
    });

    render(<App />);

    fireEvent.click(screen.getByTestId('play-again-button'));
    expect(mockResetGame).toHaveBeenCalledTimes(1);
  });

  it('does not display game complete message when game is not finished', () => {
    // @ts-expect-error - we are mocking the hook
    useGameStore.mockReturnValue({
      cards: mockCards,
      moves: 5,
      resetGame: mockResetGame,
      isGameComplete: false,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeCards,
      flippedCardsID: []
    });

    render(<App />);

    expect(screen.queryByTestId('game-complete-message')).not.toBeInTheDocument();
  });
});
