import './Card.scss';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ id, image, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <div
      data-testid={`card-${id}`}
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-flipper">
        <div className="card-front">
          <img src={image} alt={`Card ${id}`} />
        </div>
        <div className="card-back">
          <div className="card-back-content">?</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
