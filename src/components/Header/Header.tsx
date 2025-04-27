import './Header.scss';

interface IHeaderProps {
  onReset: () => void;
  moves: number;
  timeElapsed: string;
}

const Header = ({ onReset, moves, timeElapsed }: IHeaderProps) => {
  return (
    <>
      <header className='header' data-testid='game-header'>
        <h1>Memory Card Game</h1>
        <div className='header-controls'>
          <span className='moves' data-testid='moves-counter'>
            Moves: {moves}
          </span>
          <span className='moves' data-testid='time-counter'>
            Time: {timeElapsed}
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
    </>
  );
};

export default Header;
