import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGameStore } from './gameStore';
import { ICard } from '../types';
import { handleMatch, handleNoMatch, startTimer } from './gameAuxFuncions';

// Mock the browserLog function
vi.mock('./gameAuxFuncions', () => ({
  browserLog: vi.fn(),
  canFlipCard: vi.fn().mockReturnValue(true),
  handleMatch: vi.fn(),
  handleNoMatch: vi.fn(),
  startTimer: vi.fn(),
  stopTimer: vi.fn()
}));

describe('Game Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({
      cards: [],
      flippedCardsID: [],
      moves: 0,
      isGameComplete: false,
      isProcessing: false,
      timeElapsed: '0:00',
      isTimerRunning: false,
      score: 0,
      difficulty: 'medium',
      openModal: true
    });
  });

  describe('setDifficulty', () => {
    it('updates difficulty correctly', () => {
      const store = useGameStore.getState();
      store.setDifficulty('easy');
      expect(useGameStore.getState().difficulty).toBe('easy');
    });
  });

  describe('setOpenModal', () => {
    it('updates openModal state correctly', () => {
      const store = useGameStore.getState();
      store.setOpenModal(false);
      expect(useGameStore.getState().openModal).toBe(false);
    });
  });

  describe('initializeGame', () => {
    it('initializes game with correct number of cards for medium difficulty', () => {
      const store = useGameStore.getState();
      store.initializeGame();
      const state = useGameStore.getState();

      // Medium difficulty should have 5 pairs (10 cards)
      expect(state.cards).toHaveLength(10);
      expect(state.moves).toBe(0);
      expect(state.isGameComplete).toBe(false);
      expect(state.isProcessing).toBe(false);
      expect(state.timeElapsed).toBe('0:00');
      expect(state.isTimerRunning).toBe(false);
      expect(state.score).toBe(0);
    });

    it('initializes game with correct number of cards for easy difficulty', () => {
      const store = useGameStore.getState();
      store.setDifficulty('easy');
      store.initializeGame();
      const state = useGameStore.getState();

      // Easy difficulty should have 3 pairs (6 cards)
      expect(state.cards).toHaveLength(6);
    });

    it('initializes game with correct number of cards for hard difficulty', () => {
      const store = useGameStore.getState();
      store.setDifficulty('hard');
      store.initializeGame();
      const state = useGameStore.getState();

      // Hard difficulty should have 10 pairs (20 cards)
      expect(state.cards).toHaveLength(20);
    });

    it('creates pairs of cards with matching pairIds', () => {
      const store = useGameStore.getState();
      store.initializeGame();
      const state = useGameStore.getState();

      // Check that each card has a matching pair
      const pairIds = state.cards.map(card => card.pairId);
      const uniquePairIds = new Set(pairIds);

      // Each pairId should appear exactly twice
      uniquePairIds.forEach(pairId => {
        const count = pairIds.filter(id => id === pairId).length;
        expect(count).toBe(2);
      });
    });
  });

  describe('flipCard', () => {
    let store: ReturnType<typeof useGameStore.getState>;
    let firstCard: ICard;
    let secondCard: ICard;

    beforeEach(() => {
      store = useGameStore.getState();
      store.initializeGame();
      const state = useGameStore.getState();

      // Ensure we have cards before proceeding
      expect(state.cards.length).toBeGreaterThan(0);

      firstCard = state.cards[0];
      secondCard = state.cards.find(card => card.pairId !== firstCard.pairId)!;

      // Ensure we found a second card
      expect(secondCard).toBeDefined();
    });

    it('flips a card when clicked', () => {
      store.flipCard(firstCard.id);

      const state = useGameStore.getState();
      const flippedCard = state.cards.find(card => card.id === firstCard.id);
      expect(flippedCard?.isFlipped).toBe(true);
    });

    it('starts timer on first card flip', () => {
      store.flipCard(firstCard.id);
      expect(vi.mocked(startTimer)).toHaveBeenCalled();
    });

    it('increments moves when two cards are flipped', () => {
      store.flipCard(firstCard.id);
      store.flipCard(secondCard.id);

      expect(useGameStore.getState().moves).toBe(1);
    });

    it('handles match when two cards with same pairId are flipped', () => {
      // Get the current state after initialization
      const state = useGameStore.getState();

      // Find all cards with the same pairId as firstCard
      const matchingCards = state.cards.filter(card =>
        card.pairId === firstCard.pairId && card.id !== firstCard.id
      );

      // Debug information
      console.log('First card:', firstCard);
      console.log('All cards:', state.cards);
      console.log('Matching cards:', matchingCards);

      // Ensure we found at least one matching card
      expect(matchingCards.length).toBeGreaterThan(0);

      const matchingCard = matchingCards[0];
      store.flipCard(firstCard.id);
      store.flipCard(matchingCard.id);

      expect(vi.mocked(handleMatch)).toHaveBeenCalled();
    });

    it('handles no match when two cards with different pairIds are flipped', () => {
      store.flipCard(firstCard.id);
      store.flipCard(secondCard.id);

      expect(vi.mocked(handleNoMatch)).toHaveBeenCalled();
    });

  });
});
