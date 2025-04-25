import Header from './components/Header';
import CardGrid from './components/CardGrid';
import { useGameStore } from './store/gameStore';
import './App.scss';

function App() {
  const { moves, resetGame, isGameComplete } = useGameStore();

  return (
    <div className="app" data-testid="memory-game-app">
      <Header onReset={resetGame} moves={moves} />
      <main>
        <CardGrid />
        {isGameComplete && (
          <div className="game-complete" data-testid="game-complete-message">
            <h2>Congratulations!</h2>
            <p>You completed the game in {moves} moves.</p>
            <button onClick={resetGame} data-testid="play-again-button">Play Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
