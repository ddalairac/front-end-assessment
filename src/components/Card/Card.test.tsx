import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const defaultProps = {
    id: 1,
    image: 'https://example.com/image.jpg',
    isFlipped: false,
    isMatched: false,
    onClick: vi.fn()
  };

  it('renders correctly with default props', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Card 1');
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultProps.image);
  });

  it('applies flipped class when isFlipped is true', () => {
    render(<Card {...defaultProps} isFlipped={true} />);
    expect(screen.getByTestId('card-1')).toHaveClass('flipped');
  });

  it('applies matched class when isMatched is true', () => {
    render(<Card {...defaultProps} isMatched={true} />);
    expect(screen.getByTestId('card-1')).toHaveClass('matched');
  });

  it('calls onClick when card is clicked', () => {
    render(<Card {...defaultProps} />);
    fireEvent.click(screen.getByTestId('card-1'));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
