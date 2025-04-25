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
            <h2>¡Felicidades!</h2>
            <p>Has completado el juego en {moves} movimientos.</p>
            <button onClick={resetGame} data-testid="play-again-button">Jugar de nuevo</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
