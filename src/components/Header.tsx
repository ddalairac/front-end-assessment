import './Header.scss';

interface IHeaderProps {
  onReset: () => void;
  moves: number;
  timeElapsed: number;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Header = ({ onReset, moves, timeElapsed }: IHeaderProps) => {
  return (
    <header className='header' data-testid='game-header'>
      <h1>Memory Card Game</h1>
      <div className='header-controls'>
        <span className='moves' data-testid='moves-counter'>
          Moves: {moves}
        </span>
        <span className='moves' data-testid='time-counter'>
          Time: {formatTime(timeElapsed)}
        </span>
        <button
          className='reset-button'
          data-testid='reset-button'
          onClick={onReset}
        >
          Reset Game
        </button>
      </div>
    </header>
  );
};

export default Header;
