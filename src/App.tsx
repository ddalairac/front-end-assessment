import Header from './components/Header';
import CardGrid from './components/CardGrid';
import SuccessModal from './components/SuccessModal';
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
          <SuccessModal moves={moves} onPlayAgain={resetGame} />
        )}
      </main>
    </div>
  );
}

export default App;
