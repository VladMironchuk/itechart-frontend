import "./gameCard.scss";
import star from "../../assets/images/star.png";
import Button from "../button/button";

export type GameCardContent = {
  gameLogo: string;
  gameTitle: string;
  gamePrice: number;
  gamePlatforms: string[];
  gameDescription: string;
  ageLimit: number;
  rating: number;
};

const GameCard: React.FC<GameCardContent> = (props) => {
  const { gameLogo, gameTitle, gamePrice, gamePlatforms, gameDescription, ageLimit, rating } = props;

  return (
    <div className="game-container">
      <div className="game">
        <div className="game__front">
          <div className="game-platforms">
            {gamePlatforms.map((platform) => (
              <img key={Math.random()} className="game-platforms__logo" alt="platform" src={platform} />
            ))}
          </div>
          <img className="game__front__logo" src={gameLogo} alt="" />
          <p>
            {gameTitle}
            <span>{gamePrice}$</span>
          </p>
          <div className="rating__wrapper">
            {[...new Array(rating)].map(() => (
              <img alt="game" key={Math.random()} className="rating" src={star} />
            ))}
          </div>
        </div>
        <div className="game__back">
          <div className="game__back_wrapper">
            <p className="game__back_wrapper_text">{gameDescription}</p>
            <p className="game__back_wrapper_age">{ageLimit}+</p>
            <Button type="button" className="game__back_wrapper_button" title="Add to Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
