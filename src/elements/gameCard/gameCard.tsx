import "./gameCard.scss";
import { useDispatch } from "react-redux";
import star from "../../assets/images/star.png";
import Button from "../button/button";
import { cartActions } from "@/redux/slices/cart";

export type Props = {
  gameLogo: string;
  gameTitle: string;
  gamePrice: number;
  gamePlatformsImg: string[];
  gamePlatforms: string[];
  gameDescription: string;
  ageLimit: number;
  rating: number;
};

const GameCard: React.FC<Props> = (props) => {
  const { gameLogo, gameTitle, gamePrice, gamePlatformsImg, gameDescription, ageLimit, rating, gamePlatforms } = props;

  const dispatch = useDispatch();

  const addGameToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        item: {
          gameTitle,
          gamePrice,
          gamePlatforms,
        },
      })
    );
  };

  return (
    <div className="game-container">
      <div className="game">
        <div className="game__front">
          <div className="game-platforms">
            {gamePlatformsImg.map((platform) => (
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
            <Button onClick={addGameToCart} className="game__back_wrapper_button" title="Add to Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
