import { useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import './App.scss';

function App() {
  const [moves, setMoves] = useState(0);

  const handleReset = () => {
    setMoves(0);
    // TODO: Implement reset logic
  };

  return (
    <div className="app">
      <Header onReset={handleReset} moves={moves} />
      <main>
        <CardGrid />
      </main>
    </div>
  );
}

export default App;
