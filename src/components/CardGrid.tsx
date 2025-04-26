import Card from './Card';
import './CardGrid.scss';
import { ICard } from '../types';

interface ICardGridProps {
  cards: ICard[];
  onCardFlip: (cardId: number) => void;
}

const CardGrid = ({ cards, onCardFlip }: ICardGridProps) => {
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
