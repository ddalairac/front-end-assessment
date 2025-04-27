import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CardGrid from './CardGrid';

describe('CardGrid Component', () => {
  const mockCards = [
    { id: 1, image: 'image1.jpg', isFlipped: false, isMatched: false, pairId: 0 },
    { id: 2, image: 'image2.jpg', isFlipped: true, isMatched: false, pairId: 1 },
    { id: 3, image: 'image1.jpg', isFlipped: false, isMatched: true, pairId: 0 },
    { id: 4, image: 'image2.jpg', isFlipped: false, isMatched: false, pairId: 1 }
  ];

  const mockOnCardFlip = vi.fn();

  it('renders all cards from props', () => {
    render(<CardGrid cards={mockCards} onCardFlip={mockOnCardFlip} />);
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
    // Should render 4 cards
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('calls onCardFlip when a card is clicked', () => {
    render(<CardGrid cards={mockCards} onCardFlip={mockOnCardFlip} />);

    // Select the first card specifically by its data-testid
    const firstCard = screen.getByTestId('card-1');

    // Click on the card
    fireEvent.click(firstCard);

    // Verify that onCardFlip was called with the correct ID
    expect(mockOnCardFlip).toHaveBeenCalledWith(1);
  });
});
