import { useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import SuccessModal from './components/SuccessModal';
import { useGameStore } from './store/gameStore';
import './App.scss';

function App() {
  const {
    cards,
    moves,
    resetGame,
    isGameComplete,
    flipCard,
    initializeGame,
    timeElapsed,
  } = useGameStore();

  useEffect(() => {
    // Initialize cards when component mounts
    initializeGame();
  }, [initializeGame]);

  return (
    <div className='app' data-testid='memory-game-app'>
      <Header onReset={resetGame} moves={moves} timeElapsed={timeElapsed} />
      <main>
        <CardGrid cards={cards} onCardFlip={flipCard} />
        {isGameComplete && (
          <SuccessModal
            moves={moves}
            timeElapsed={timeElapsed}
            onPlayAgain={resetGame}
          />
        )}
      </main>
    </div>
  );
}

export default App;
