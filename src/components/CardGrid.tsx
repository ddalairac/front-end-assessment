import Card from './Card';
import './CardGrid.scss';

interface CardType {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardGridProps {
  cards: CardType[];
  onCardFlip: (cardId: number) => void;
}

const CardGrid = ({ cards, onCardFlip }: CardGridProps) => {
  return (
    <div className="card-grid" data-testid="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardFlip(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
