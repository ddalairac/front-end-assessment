import { create } from 'zustand';

interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  cards: Card[]; // The cards in the game
  flippedCardsID: number[]; // The cards IDs flipped
  moves: number; // The number of moves made
  isGameComplete: boolean; // Whether the game is complete
  isProcessing: boolean; // Flag to prevent clicks while processing matches
  initializeCards: () => void; // Initialize the cards
  flipCard: (cardId: number) => void; // Flip a card
  resetGame: () => void; // Reset the game
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
  // State
  cards: [],
  flippedCardsID: [],
  moves: 0,
  isGameComplete: false,
  isProcessing: false,

  // Actions
  initializeCards: () => {
    // Create an array with each image appearing exactly twice
    const cardPairs: Card[] = [];

    // For each image, create two cards with the same pairId
    images.forEach((image, idx) => {
      // First card of the pair
      cardPairs.push({
        id: cardPairs.length,
        pairId: idx,
        image,
        isFlipped: false,
        isMatched: false
      });

      // Second card of the pair with the same pairId
      cardPairs.push({
        id: cardPairs.length,
        pairId: idx,
        image,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);

    // Set the state
    set({
      cards: shuffledCards,
      flippedCardsID: [],
      moves: 0,
      isGameComplete: false,
      isProcessing: false
    });
  },

  flipCard: (cardId: number) => {
    const { cards, flippedCardsID, moves, isProcessing } = get();

    // Prevent any card flipping if currently processing a match
    if (isProcessing) return;

    // Get the card being clicked
    const clickedCard = cards.find(card => card.id === cardId);
    if (!clickedCard) return; // Safety check

    // Only these conditions should prevent flipping:
    if (clickedCard.isFlipped) return; // Card is already flipped
    if (clickedCard.isMatched) return; // Card is already matched
    if (flippedCardsID.length >= 2) return; // Already have 2 cards flipped

    // Flip the clicked card
    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    // Add card ID to flipped cards array
    const newFlippedCardsID = [...flippedCardsID, cardId];

    // Update state
    set({ cards: newCards, flippedCardsID: newFlippedCardsID });

    // Check for potential match only if we have 2 cards flipped
    if (newFlippedCardsID.length === 2) {
      // Set processing flag to prevent further clicks
      set({ moves: moves + 1, isProcessing: true });

      // Get the actual card objects, not just their IDs
      const firstCardId = newFlippedCardsID[0];
      const secondCardId = newFlippedCardsID[1];

      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (!firstCard || !secondCard) {
        // If cards not found, reset processing state
        set({ isProcessing: false });
        return;
      }

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setTimeout(() => {
          const updatedCards = cards.map(card => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, isMatched: true, isFlipped: true };
            }
            return card;
          });

          set({
            cards: updatedCards,
            flippedCardsID: [],
            isProcessing: false // Allow clicks again
          });

          // Check if game is complete
          const isComplete = updatedCards.every(card => card.isMatched);
          if (isComplete) {
            set({ isGameComplete: true });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = cards.map(card => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, isFlipped: false };
            }
            return card;
          });

          set({
            cards: updatedCards,
            flippedCardsID: [],
            isProcessing: false // Allow clicks again
          });
        }, 1000);
      }
    }
  },

  resetGame: () => {
    get().initializeCards();
  },
}));
