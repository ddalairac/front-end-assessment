import { useEffect } from 'react';
import Card from './Card';
import { useGameStore } from '../store/gameStore';
import './CardGrid.scss';

const CardGrid = () => {
  const { cards, flipCard, initializeCards } = useGameStore();

  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  return (
    <div className="card-grid" data-testid="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => flipCard(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
