import './Card.scss';

interface ICardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ id, image, isFlipped, isMatched, onClick }: ICardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      data-testid={`card-${id}`}
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isFlipped ? -1 : 0}
      aria-label={`Card ${id}`}
      aria-disabled={isMatched}
    >
      <div className="card-flipper">
        <div className="card-flipper_front">
          <img
            src={image}
            alt={`Card ${id}`}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="card-flipper_back">
          <div className="card-back-content"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
