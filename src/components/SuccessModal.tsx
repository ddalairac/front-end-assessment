import './SuccessModal.scss';

interface ISuccessModalProps {
  moves: number;
  onPlayAgain: () => void;
}

const SuccessModal = ({ moves, onPlayAgain }: ISuccessModalProps) => {
  return (
    <div className="success-modal" data-testid="game-complete-message">
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} moves.</p>
      <button onClick={onPlayAgain} data-testid="play-again-button">
        Play Again
      </button>
    </div>
  );
};

export default SuccessModal;
