import { useState, useEffect } from 'react';
import Card from './Card';
import './CardGrid.scss';

interface CardData {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CardGrid = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  // Sample images - you can replace these with your own images
  const images = [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
  ];

  const initializeCards = () => {
    const cardPairs = [...images, ...images].map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (cardId: number) => {
    console.log(cardId);
    // TODO: Implement card click logic
  };

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.image}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
