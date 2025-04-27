import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';
import SuccessModal from './components/SuccessModal/SuccessModal';
import { useGameStore } from './store/gameStore';
import './App.scss';

function App() {
  const {
    cards,
    moves,
    isModalOpen,
    setModalOpen,
    flipCard,
    initializeGame,
    timeElapsed,
  } = useGameStore();

  return (
    <div className='app' data-testid='memory-game-app'>
      <Header
        onReset={initializeGame}
        moves={moves}
        timeElapsed={timeElapsed}
        setModalOpen={setModalOpen}
      />
      <main>
        <CardGrid cards={cards} onCardFlip={flipCard} />
        {isModalOpen && <SuccessModal />}
      </main>
    </div>
  );
}

export default App;
