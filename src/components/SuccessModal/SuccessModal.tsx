import './SuccessModal.scss';

interface ISuccessModalProps {
  moves: number;
  timeElapsed: string;
  score: number;
  onPlayAgain: () => void;
}

const SuccessModal = ({
  moves,
  timeElapsed,
  score,
  onPlayAgain,
}: ISuccessModalProps) => {
  return (
    <div className='success-modal' data-testid='game-complete-message'>
      <h2>
        Congratulations!<br/>
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
      <button onClick={onPlayAgain} data-testid='play-again-button'>
        Play Again
      </button>
    </div>
  );
};

export default SuccessModal;
