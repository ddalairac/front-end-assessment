import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';
import SuccessModal from './components/SuccessModal/SuccessModal';
import { useGameStore } from './store/gameStore';
import './App.scss';

function App() {
  const {
    cards,
    moves,
    openModal,
    setOpenModal,
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
        setOpenModal={setOpenModal}
      />
      <main>
        <CardGrid cards={cards} onCardFlip={flipCard} />
        {openModal && <SuccessModal />}
      </main>
    </div>
  );
}

export default App;
