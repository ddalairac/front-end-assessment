import './SuccessModal.scss';

interface ISuccessModalProps {
  moves: number;
  timeElapsed: number;
  onPlayAgain: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SuccessModal = ({
  moves,
  timeElapsed,
  onPlayAgain,
}: ISuccessModalProps) => {
  return (
    <div className='success-modal' data-testid='game-complete-message'>
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} moves.</p>
      <p>Time: {formatTime(timeElapsed)}</p>
      <button onClick={onPlayAgain} data-testid='play-again-button'>
        Play Again
      </button>
    </div>
  );
};

export default SuccessModal;
