import { create } from 'zustand';
import img1 from '../assets/img-Asset 1.jpg';
import img2 from '../assets/img-Asset 2.jpg';
import img3 from '../assets/img-Asset 3.jpg';
import img4 from '../assets/img-Asset 4.jpg';
import img5 from '../assets/img-Asset 5.jpg';
import img6 from '../assets/img-Asset 6.jpg';
import img7 from '../assets/img-Asset 7.jpg';
import img8 from '../assets/img-Asset 8.jpg';
import img9 from '../assets/img-Asset 9.jpg';
import img10 from '../assets/img-Asset 10.jpg';
import { DifficultyType, ICard, IGameState } from '../types';
import { browserLog, canFlipCard, handleMatch, handleNoMatch, startTimer, stopTimer } from './gameAuxFuncions';

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
];


export const useGameStore = create<IGameState>((set, get) => {
  browserLog();

  // This is out of state to avoid triggering changes
  let timerInterval: number | undefined;
  let rawSeconds = 0;

  // To start/stop interval. Since it is not an object, the variable is passed as a value, not a pointer.
  const setTimerInterval = (interval: number | undefined) => {
    timerInterval = interval;
  };


  return {
    // State
    cards: [],
    flippedCardsID: [],
    moves: 0,
    isGameComplete: false,
    isProcessing: false,
    timeElapsed: '0:00',
    isTimerRunning: false,
    score: 0,
    difficulty: 'medium',
    isModalOpen: true,


    // Actions
    setDifficulty: (difficulty: DifficultyType) => {
      set({ difficulty });
    },

    setModalOpen: (isModalOpen: boolean) => {
      set({ isModalOpen });
    },

    initializeGame: () => {
      stopTimer(set, timerInterval, setTimerInterval);
      rawSeconds = 0;

      // Determine the number of pairs according to the difficulty
      let numPairs = 3;
      if (get().difficulty === 'medium') numPairs = 5;
      if (get().difficulty === 'hard') numPairs = 10;

      // Array with each image appearing exactly twice
      const cardPairs: ICard[] = [];

      // For each image, create two cards with the same pairId
      images.slice(0, numPairs).forEach((image, idx) => {
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
        isTimerRunning: false,
        score: 0
      });
    },

    flipCard: (cardId: number) => {
      const { cards, flippedCardsID, moves, isProcessing, isTimerRunning } = get();

      // Start timer on first card flip if not already running
      if (!isTimerRunning) {
        startTimer(get, set, setTimerInterval, rawSeconds);
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
          handleMatch(cards, firstCardId, secondCardId, set, get, rawSeconds, timerInterval, setTimerInterval);
        } else {
          handleNoMatch(cards, firstCardId, secondCardId, set);
        }
      }
    },
  };
});
