import { useGameStore } from '../../store/gameStore';
import { useState } from 'react';
import './SuccessModal.scss';

const SuccessModal = () => {
  const {
    isGameComplete,
    difficulty,
    moves,
    timeElapsed,
    score,
    setDifficulty,
    setOpenModal,
    initializeGame,
  } = useGameStore();

  const [isClosing, setIsClosing] = useState(false);

  const onNewGame = () => {
    setIsClosing(true);
    initializeGame();
    setTimeout(() => {
      setOpenModal(false);
    }, 300); // Match the animation duration
  };

  return (
    <>
      <div className={`backdrop ${isClosing ? 'closing' : ''}`}></div>
      <div
        className={`success-modal ${isClosing ? 'closing' : ''}`}
        data-testid='game-complete-message'
      >
        {!isGameComplete ? (
          <>
            <h2>
              Select a difficulty before going to the board
              <br />
              <small>Time starts when you turn over the first card</small>
            </h2>
          </>
        ) : (
          <>
            <h2>
              Congratulations!
              <br />
              <small>You completed the game.</small>
            </h2>
            <p>
              <span>
                Moves: <strong>{moves}</strong>
              </span>
              <span>
                Time: <strong>{timeElapsed}</strong>
              </span>
              <span>
                Score: <strong>{score}</strong>
              </span>
            </p>
          </>
        )}
        <div className='level-options'>
          <button
            className={difficulty === 'easy' ? 'active' : ''}
            onClick={() => setDifficulty('easy')}
            data-testid='easy-level-button'
          >
            Easy
          </button>
          <button
            className={difficulty === 'medium' ? 'active' : ''}
            onClick={() => setDifficulty('medium')}
            data-testid='medium-level-button'
          >
            Medium
          </button>
          <button
            className={difficulty === 'hard' ? 'active' : ''}
            onClick={() => setDifficulty('hard')}
            data-testid='hard-level-button'
          >
            Hard
          </button>
        </div>
        <button onClick={onNewGame} data-testid='play-again-button'>
          Play {isGameComplete && ' Again'}
        </button>
      </div>
    </>
  );
};

export default SuccessModal;
