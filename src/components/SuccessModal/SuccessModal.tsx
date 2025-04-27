import './SuccessModal.scss';

interface ISuccessModalProps {
  moves: number;
  timeElapsed: string;
  onPlayAgain: () => void;
}

const SuccessModal = ({ moves, timeElapsed, onPlayAgain }: ISuccessModalProps) => {
  return (
    <div className="success-modal" data-testid="game-complete-message">
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} moves.</p>
      <p>Time: {timeElapsed}</p>
      <button onClick={onPlayAgain} data-testid="play-again-button">
        Play Again
      </button>
    </div>
  );
};

export default SuccessModal;
