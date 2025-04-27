import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatTime, canFlipCard, handleMatch, handleNoMatch, startTimer, stopTimer } from './gameAuxFuncions';
import { ICard } from '../types';

describe('Game Auxiliary Functions', () => {
  describe('formatTime', () => {
    it('formats time correctly for minutes and seconds', () => {
      expect(formatTime(65)).toBe('1:05');
      expect(formatTime(130)).toBe('2:10');
      expect(formatTime(0)).toBe('0:00');
    });

    it('pads seconds with leading zero when needed', () => {
      expect(formatTime(61)).toBe('1:01');
      expect(formatTime(9)).toBe('0:09');
    });
  });

  describe('canFlipCard', () => {
    const mockCard: ICard = {
      id: 1,
      image: 'test.jpg',
      isFlipped: false,
      isMatched: false,
      pairId: 1
    };

    it('allows flipping when all conditions are met', () => {
      expect(canFlipCard(mockCard, [], false)).toBe(true);
    });

    it('prevents flipping when game is processing', () => {
      expect(canFlipCard(mockCard, [], true)).toBe(false);
    });

    it('prevents flipping when card is already flipped', () => {
      const flippedCard = { ...mockCard, isFlipped: true };
      expect(canFlipCard(flippedCard, [], false)).toBe(false);
    });

    it('prevents flipping when card is already matched', () => {
      const matchedCard = { ...mockCard, isMatched: true };
      expect(canFlipCard(matchedCard, [], false)).toBe(false);
    });

    it('prevents flipping when two cards are already flipped', () => {
      expect(canFlipCard(mockCard, [2, 3], false)).toBe(false);
    });
  });

  describe('handleMatch', () => {
    const mockCards: ICard[] = [
      { id: 1, image: 'test1.jpg', isFlipped: true, isMatched: false, pairId: 1 },
      { id: 2, image: 'test2.jpg', isFlipped: true, isMatched: false, pairId: 1 },
      { id: 3, image: 'test3.jpg', isFlipped: false, isMatched: false, pairId: 2 },
      { id: 4, image: 'test4.jpg', isFlipped: false, isMatched: false, pairId: 2 }
    ];

    const mockSet = vi.fn();
    const mockGet = vi.fn();
    const mockSetTimerInterval = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    it('marks matched cards as matched and flipped', () => {
      handleMatch(mockCards, 1, 2, mockSet, mockGet, 0, undefined, mockSetTimerInterval);
      vi.advanceTimersByTime(500);

      expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
        cards: expect.arrayContaining([
          expect.objectContaining({ id: 1, isMatched: true, isFlipped: true }),
          expect.objectContaining({ id: 2, isMatched: true, isFlipped: true })
        ]),
        flippedCardsID: [],
        isProcessing: false
      }));
    });

    it('completes game when all cards are matched', () => {
      const allMatchedCards = mockCards.map(card => ({ ...card, isMatched: true }));
      mockGet.mockReturnValue({ moves: 10 });

      handleMatch(allMatchedCards, 1, 2, mockSet, mockGet, 30, 123, mockSetTimerInterval);
      vi.advanceTimersByTime(500);

      expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
        isGameComplete: true,
        openModal: true,
        score: expect.any(Number)
      }));
    });

    it('calculates score correctly', () => {
      const allMatchedCards = mockCards.map(card => ({ ...card, isMatched: true }));
      mockGet.mockReturnValue({ moves: 10 });

      handleMatch(allMatchedCards, 1, 2, mockSet, mockGet, 30, 123, mockSetTimerInterval);
      vi.advanceTimersByTime(500);

      // Base score (1000) - move penalty (10 * 10) - time penalty (30 * 2)
      const expectedScore = 1000 - 100 - 60;
      expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
        score: Math.round(expectedScore)
      }));
    });

    it('adds bonus score for minimum moves', () => {
      const allMatchedCards = mockCards.map(card => ({ ...card, isMatched: true }));
      mockGet.mockReturnValue({ moves: 2 }); // Minimum moves for 4 cards

      handleMatch(allMatchedCards, 1, 2, mockSet, mockGet, 30, 123, mockSetTimerInterval);
      vi.advanceTimersByTime(500);

      // Base score (1000) - move penalty (2 * 10) - time penalty (30 * 2) + bonus (500)
      const expectedScore = 1000 - 20 - 60 + 500;
      expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
        score: Math.round(expectedScore)
      }));
    });
  });

  describe('handleNoMatch', () => {
    const mockCards: ICard[] = [
      { id: 1, image: 'test1.jpg', isFlipped: true, isMatched: false, pairId: 1 },
      { id: 2, image: 'test2.jpg', isFlipped: true, isMatched: false, pairId: 2 }
    ];

    const mockSet = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    it('flips unmatched cards back', () => {
      handleNoMatch(mockCards, 1, 2, mockSet);
      vi.advanceTimersByTime(1000);

      expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
        cards: expect.arrayContaining([
          expect.objectContaining({ id: 1, isFlipped: false }),
          expect.objectContaining({ id: 2, isFlipped: false })
        ]),
        flippedCardsID: [],
        isProcessing: false
      }));
    });
  });

  describe('Timer Functions', () => {
    const mockSet = vi.fn();
    const mockGet = vi.fn();
    const mockSetTimerInterval = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    describe('startTimer', () => {
      it('starts timer when not running', () => {
        mockGet.mockReturnValue({ isTimerRunning: false });
        startTimer(mockGet, mockSet, mockSetTimerInterval, 0);

        expect(mockSet).toHaveBeenCalledWith({ isTimerRunning: true });
        expect(mockSetTimerInterval).toHaveBeenCalled();
        // Verify that the interval is set
        expect(mockSetTimerInterval.mock.calls[0][0]).toBeDefined();
      });

      it('does not start timer when already running', () => {
        mockGet.mockReturnValue({ isTimerRunning: true });
        startTimer(mockGet, mockSet, mockSetTimerInterval, 0);

        expect(mockSet).not.toHaveBeenCalled();
        expect(mockSetTimerInterval).not.toHaveBeenCalled();
      });

      it('updates time elapsed correctly', () => {
        mockGet.mockReturnValue({ isTimerRunning: false });
        startTimer(mockGet, mockSet, mockSetTimerInterval, 0);

        vi.advanceTimersByTime(1000);
        expect(mockSet).toHaveBeenCalledWith({ timeElapsed: '0:01' });
      });
    });

    describe('stopTimer', () => {
      it('stops timer when running', () => {
        const mockInterval = 123;
        stopTimer(mockSet, mockInterval, mockSetTimerInterval);

        expect(mockSetTimerInterval).toHaveBeenCalledWith(undefined);
        expect(mockSet).toHaveBeenCalledWith({ isTimerRunning: false });
      });

      it('does nothing when timer is not running', () => {
        stopTimer(mockSet, undefined, mockSetTimerInterval);

        expect(mockSetTimerInterval).not.toHaveBeenCalled();
        expect(mockSet).not.toHaveBeenCalled();
      });
    });
  });
});
