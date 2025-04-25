import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardGrid from './CardGrid';
import { useGameStore } from '../store/gameStore';

// Mock the Zustand store
vi.mock('../store/gameStore', () => ({
  useGameStore: vi.fn()
}));

describe('CardGrid Component', () => {
  const mockCards = [
    { id: 1, image: 'image1.jpg', isFlipped: false, isMatched: false, pairId: 0 },
    { id: 2, image: 'image2.jpg', isFlipped: true, isMatched: false, pairId: 1 },
    { id: 3, image: 'image1.jpg', isFlipped: false, isMatched: true, pairId: 0 },
    { id: 4, image: 'image2.jpg', isFlipped: false, isMatched: false, pairId: 1 }
  ];

  const mockFlipCard = vi.fn();
  const mockInitializeCards = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    // @ts-expect-error - we are mocking the hook
    useGameStore.mockReturnValue({
      cards: mockCards,
      flipCard: mockFlipCard,
      initializeCards: mockInitializeCards
    });
  });

  it('renders all cards from the store', () => {
    render(<CardGrid />);
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
    // Should render 4 cards
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('calls initializeCards on component mount', () => {
    render(<CardGrid />);
    expect(mockInitializeCards).toHaveBeenCalledTimes(1);
  });
});
