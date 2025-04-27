import './Header.scss';

interface IHeaderProps {
  moves: number;
  timeElapsed: string;
  onReset: () => void;
  setOpenModal: (isModalOpen: boolean) => void;
}

const Header = ({
  moves,
  timeElapsed,
  onReset,
  setOpenModal,
}: IHeaderProps) => {
  return (
    <>
      <header className='header' data-testid='game-header'>
        <h1>Memory Card Game</h1>
        <div className='header-controls'>
          <button
            className='reset-button'
            data-testid='reset-game-button'
            onClick={onReset}
            disabled={timeElapsed === '0:00'}
          >
            Reset Game
          </button>
          <span className='moves' data-testid='moves-counter'>
            Moves: {moves}
          </span>
          <span className='time' data-testid='time-counter'>
            Time: {timeElapsed}
          </span>
          <button
            className='reset-button'
            data-testid='change-level-button'
            onClick={() => {
              onReset();
              setOpenModal(true);
            }}
          >
            Change level
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
