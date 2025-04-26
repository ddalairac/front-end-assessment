import { ICard } from './index';

export interface IGameState {
  cards: ICard[];
  flippedCardsID: number[];
  moves: number;
  isGameComplete: boolean;
  isProcessing: boolean; // to prevent flipping while processing
  timeElapsed: number; // display time in seconds
  isTimerRunning: boolean; // to prevent starting multiple timers
  initializeCards: () => void;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}

