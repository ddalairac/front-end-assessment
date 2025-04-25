import Header from './components/Header';
import CardGrid from './components/CardGrid';
import { useGameStore } from './store/gameStore';
import './App.scss';

function App() {
  const { moves, resetGame, isGameComplete } = useGameStore();

  return (
    <div className="app">
      <Header onReset={resetGame} moves={moves} />
      <main>
        <CardGrid />
        {isGameComplete && (
          <div className="game-complete">
            <h2>¡Felicidades!</h2>
            <p>Has completado el juego en {moves} movimientos.</p>
            <button onClick={resetGame}>Jugar de nuevo</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
