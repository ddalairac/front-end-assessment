import { ICard } from './index';

export type DifficultyType = 'easy' | 'medium' | 'hard';

export interface IGameState {
  // State
  cards: ICard[];
  flippedCardsID: number[];
  moves: number;
  isGameComplete: boolean;
  isProcessing: boolean; // to prevent flipping while processing
  timeElapsed: string; // display time in seconds
  isTimerRunning: boolean; // to prevent starting multiple timers
  score: number;
  difficulty: DifficultyType;

  // Actions
  initializeGame: () => void;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: DifficultyType) => void;
}

