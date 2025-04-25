import './Header.scss';

interface HeaderProps {
  onReset: () => void;
  moves: number;
}

const Header = ({ onReset, moves }: HeaderProps) => {
  return (
    <header className="header">
      <h1>Memory Card Game</h1>
      <div className="header-controls">
        <span className="moves">Moves: {moves}</span>
        <button className="reset-button" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </header>
  );
};

export default Header;
