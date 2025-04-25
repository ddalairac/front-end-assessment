import { create } from 'zustand';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  isGameComplete: boolean;
  initializeCards: () => void;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
}

const images = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3',
  'https://picsum.photos/200/200?random=4',
  'https://picsum.photos/200/200?random=5',
  'https://picsum.photos/200/200?random=6',
];

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedCards: [],
  moves: 0,
  isGameComplete: false,

  initializeCards: () => {
    const cardPairs = [...images, ...images].map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }));

    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    set({ cards: shuffledCards, flippedCards: [], moves: 0, isGameComplete: false });
  },

  flipCard: (cardId: number) => {
    const { cards, flippedCards, moves } = get();

    // Prevent flipping if:
    if (flippedCards.length === 2) return; // Already have 2 cards flipped
    if (cards[cardId].isMatched) return; // Card is already matched
    if (flippedCards.includes(cardId)) return; // Card is already flipped

    const newFlippedCards = [...flippedCards, cardId];
    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    set({ cards: newCards, flippedCards: newFlippedCards });

    if (newFlippedCards.length === 2) {
      set({ moves: moves + 1 });
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].image === cards[secondCard].image) {
        // Match found
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isMatched: true }
              : card
          );
          set({ cards: updatedCards, flippedCards: [] });

          // Check if game is complete
          const isComplete = updatedCards.every(card => card.isMatched);
          if (isComplete) {
            set({ isGameComplete: true });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isFlipped: false }
              : card
          );
          set({ cards: updatedCards, flippedCards: [] });
        }, 1000);
      }
    }
  },

  resetGame: () => {
    get().initializeCards();
  },
}));
