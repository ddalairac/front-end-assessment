// Auxiliary functions
import { ICard, IGameState } from '../types';


/**
 * Format time
 * @param seconds - Seconds
 * @returns Formatted time
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Check if card can be flipped
 * @param card - Card to check
 * @param flippedCardsID - Array of flipped cards IDs
 * @param isProcessing - Whether the game is processing a match
 * @returns True if card can be flipped, false otherwise
 */
export const canFlipCard = (card: ICard, flippedCardsID: number[], isProcessing: boolean): boolean => {
  // If the game is processing a match/no-match, no cards can be flipped
  if (isProcessing) return false;

  // If the card is already flipped or matched, it can't be flipped
  if (card.isFlipped || card.isMatched) return false;

  // If we already have 2 cards flipped, no more cards can be flipped
  if (flippedCardsID.length >= 2) return false;

  // If none of the above conditions are met, the card can be flipped
  return true;
};

/**
 * Handle a match
 * @param cards - Array of cards
 * @param firstCardId - ID of the first card
 * @param secondCardId - ID of the second card
 * @param set - STORE Set function
 * @param get - STORE Get function
 * @param rawSeconds - Raw seconds
 * @param timerInterval - Timer interval
 * @param setTimerInterval - Function to update timerInterval
 */
export const handleMatch = (
  cards: ICard[],
  firstCardId: number,
  secondCardId: number,
  set: any,
  get: () => IGameState,
  rawSeconds: number,
  timerInterval: number | undefined,
  setTimerInterval: (interval: number | undefined) => void
) => {
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
      stopTimer(set, timerInterval, setTimerInterval);

      // Calculate score
      const baseScore = 1000;
      const movePenalty = get().moves * 10;
      const timePenalty = rawSeconds * 2;
      let finalScore = baseScore - movePenalty - timePenalty;
      finalScore = Math.max(0, finalScore);

      // Add bonus for completing the game in the minimum number of moves
      if (get().moves === cards.length / 2) {
        finalScore += 500;
      }

      set({
        isGameComplete: true,
        openModal: true,
        score: Math.round(finalScore)
      });
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
export const handleNoMatch = (cards: ICard[], firstCardId: number, secondCardId: number, set: any) => {
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
 * @param setTimerInterval - Function to update timerInterval
 * @param rawSeconds - Raw seconds
 */
export const startTimer = (get: () => IGameState, set: any, setTimerInterval: (interval: number | undefined) => void, rawSeconds: number) => {
  if (!get().isTimerRunning) {
    set({ isTimerRunning: true });
    const interval = window.setInterval(() => {
      rawSeconds += 1;
      set({ timeElapsed: formatTime(rawSeconds) });
    }, 1000);
    setTimerInterval(interval);
  }
};

/**
 * Stop the timer
 * @param set - STORE Set function
 * @param timerInterval - Timer interval
 * @param setTimerInterval - Function to update timerInterval
 */
export const stopTimer = (set: any, timerInterval: number | undefined, setTimerInterval: (interval: number | undefined) => void) => {
  if (timerInterval) {
    window.clearInterval(timerInterval);
    setTimerInterval(undefined);
    set({ isTimerRunning: false });
  }
};

/** Presentational log for browser console */
export const browserLog = () => {
  const style = `background: #222; color: #2196f3; font-size: 14px; padding: 0;`;
  const ascii_title = `                                         .
  __  __                                 .
 |  \\/  | ___ _ __ ___   ___  _ __ _   _ .
 | |\\/| |/ _ \\ '_ \` _ \\ / _ \\| '__| | | |.
 | |  | |  __/ | | | | | (_) | |  | |_| |.
 |_|  |_|\\___|_| |_| |_|\\___/|_|   \\__  /.
   ____                            |___/ .
  / ___| __ _ _ __ ___   ___             .
 | |  _ / _\` | '_ \` _ \\ / _ \\            .
 | |_| | (_| | | | | | |  __/            .
  \\____|\\__,_|_| |_| |_|\\___|            .
                                         .
  by: Dalairac Diego                     .
                                         .`;

  console.log(`%c${ascii_title}`,
    style, 'https://github.com/ddalairac/front-end-assessment');
};
