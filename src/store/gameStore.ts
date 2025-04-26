import { create } from 'zustand';
import { ICard, IGameState } from '../types';

const images = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3',
  'https://picsum.photos/200/200?random=4',
  'https://picsum.photos/200/200?random=5',
  'https://picsum.photos/200/200?random=6'
];

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// #region Auxiliary functions

/**
 * Check if card can be flipped
 * @param card - Card to check
 * @param flippedCardsID - Array of flipped cards IDs
 * @param isProcessing - Whether the game is processing a match
 * @returns True if card can be flipped, false otherwise
 */
const canFlipCard = (card: ICard, flippedCardsID: number[], isProcessing: boolean): boolean => {
  if (isProcessing) return false;
  if (card.isFlipped) return false;
  if (card.isMatched) return false;
  if (flippedCardsID.length >= 2) return false;
  return true;
};

/**
 * Handle a match
 * @param cards - Array of cards
 * @param firstCardId - ID of the first card
 * @param secondCardId - ID of the second card
 * @param set - STORE Set function
 * @param timerInterval - Timer interval
 */
const handleMatch = (cards: ICard[], firstCardId: number, secondCardId: number, set: any, timerInterval: number | undefined) => {
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
      isProcessing: false
    });

    // Check if game is complete
    const isComplete = updatedCards.every(card => card.isMatched);
    if (isComplete) {
      stopTimer(set, timerInterval);
      set({ isGameComplete: true });
    }
  }, 500);
};

/**
 * Handle a no match
 * @param cards - Array of cards
 * @param firstCardId - ID of the first card
 * @param secondCardId - ID of the second card
 * @param set - STORE Set function
 */
const handleNoMatch = (cards: ICard[], firstCardId: number, secondCardId: number, set: any) => {
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
      isProcessing: false
    });
  }, 1000);
};

// Timer helper functions
/**
 * Start the timer
 * @param get - STORE Get function
 * @param set - STORE Set function
 * @param timerInterval - Timer interval
 * @param rawSeconds - Raw seconds
 */
const startTimer = (get: () => IGameState, set: any, timerInterval: number | undefined, rawSeconds: number) => {
  if (!get().isTimerRunning) {
    set({ isTimerRunning: true });
    timerInterval = window.setInterval(() => {
      rawSeconds += 1;
      set({ timeElapsed: formatTime(rawSeconds) });
    }, 1000);
  }
};

/**
 * Stop the timer
 * @param set - STORE Set function
 * @param timerInterval - Timer interval
 */
const stopTimer = (set: any, timerInterval: number | undefined) => {
  if (timerInterval) {
    window.clearInterval(timerInterval);
    set({ isTimerRunning: false });
  }
};
// #endregion

export const useGameStore = create<IGameState>((set, get) => {
  // This is out of state to avoid triggering changes
  let timerInterval: number | undefined;
  let rawSeconds = 0;

  return {
    // State
    cards: [],
    flippedCardsID: [],
    moves: 0,
    isGameComplete: false,
    isProcessing: false,
    timeElapsed: '0:00',
    isTimerRunning: false,

    // Actions
    initializeGame: () => {
      stopTimer(set, timerInterval);
      rawSeconds = 0;

      // Array with each image appearing exactly twice
      const cardPairs: ICard[] = [];

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
        isProcessing: false,
        timeElapsed: '0:00',
        isTimerRunning: false
      });
    },


    resetGame: () => {
      get().initializeGame();
    },

    flipCard: (cardId: number) => {
      const { cards, flippedCardsID, moves, isProcessing, isTimerRunning } = get();

      // Start timer on first card flip if not already running
      if (!isTimerRunning) {
        startTimer(get, set, timerInterval, rawSeconds);
      }

      // Get the card being clicked
      const clickedCard = cards.find(card => card.id === cardId);
      if (!clickedCard) return;

      // Check if card can be flipped
      if (!canFlipCard(clickedCard, flippedCardsID, isProcessing)) return;

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
        set({ moves: moves + 1, isProcessing: true });

        const [firstCardId, secondCardId] = newFlippedCardsID;
        const firstCard = cards.find(card => card.id === firstCardId);
        const secondCard = cards.find(card => card.id === secondCardId);

        if (!firstCard || !secondCard) {
          set({ isProcessing: false });
          return;
        }

        if (firstCard.pairId === secondCard.pairId) {
          handleMatch(cards, firstCardId, secondCardId, set, timerInterval);
        } else {
          handleNoMatch(cards, firstCardId, secondCardId, set);
        }
      }
    },
  };
});
