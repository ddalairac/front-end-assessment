import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useGameStore } from './store/gameStore';

// Mock the Zustand store
vi.mock('./store/gameStore', () => ({
  useGameStore: vi.fn()
}));

describe('App Component', () => {
  const mockFlipCard = vi.fn();
  const mockInitializeGame = vi.fn();
  const mockSetOpenModal = vi.fn();
  const mockCards: { id: number; image: string; isFlipped: boolean; isMatched: boolean; pairId: number }[] = [];

  beforeEach(() => {
    vi.resetAllMocks();
    (useGameStore as any).mockReturnValue({
      cards: mockCards,
      moves: 0,
      openModal: false,
      setOpenModal: mockSetOpenModal,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeGame,
      timeElapsed: '0:00'
    });
  });

  it('renders Header and CardGrid components', () => {
    render(<App />);

    expect(screen.getByTestId('memory-game-app')).toBeInTheDocument();
    expect(screen.getByTestId('game-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
  });

  it('displays game complete message when game is finished', () => {
    (useGameStore as any).mockReturnValue({
      cards: mockCards,
      moves: 10,
      openModal: true,
      setOpenModal: mockSetOpenModal,
      flipCard: mockFlipCard,
      initializeGame: mockInitializeGame,
      timeElapsed: '1:00',
      isGameComplete: true,
      score: 800
    });

    render(<App />);

    expect(screen.getByTestId('game-complete-message')).toBeInTheDocument();
  });
});
