export interface ICard {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface IGameState {
  cards: ICard[];
  flippedCardsID: number[];
  moves: number;
  isGameComplete: boolean;
  isProcessing: boolean;
  initializeCards: () => void;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
}

