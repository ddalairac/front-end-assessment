import './Header.scss';

interface IHeaderProps {
  moves: number;
  timeElapsed: string;
  onReset: () => void;
  setOpenModal: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
}

const Header = ({
  moves,
  timeElapsed,
  onReset,
  setOpenModal,
  isModalOpen, // To prevent buttons from being accessible to screen readers when the modal is open
}: IHeaderProps) => {
  return (
    <>
      <header className='header' data-testid='game-header'>
        <h1>Memory Card Game</h1>
        <div className='header-controls' aria-hidden={isModalOpen}>
          <button
            className='reset-button'
            data-testid='reset-game-button'
            onClick={onReset}
            disabled={timeElapsed === '0:00'}
            tabIndex={isModalOpen ? -1 : 0}
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
            tabIndex={isModalOpen ? -1 : 0}
          >
            Change level
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
