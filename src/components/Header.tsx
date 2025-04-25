import './Header.scss';

interface IHeaderProps {
  onReset: () => void;
  moves: number;
}

const Header = ({ onReset, moves }: IHeaderProps) => {
  return (
    <header className="header" data-testid="game-header">
      <h1>Memory Card Game</h1>
      <div className="header-controls">
        <span className="moves" data-testid="moves-counter">Moves: {moves}</span>
        <button className="reset-button" data-testid="reset-button" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </header>
  );
};

export default Header;
