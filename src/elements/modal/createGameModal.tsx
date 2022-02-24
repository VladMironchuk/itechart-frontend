import { ChangeEventHandler, FormEventHandler, useState } from "react";
import useFetch from "use-http";
import Button from "../button/button";
import GameInfoForm from "./gameInfoForm";
import "./modal.scss";
import Modal from "./overlay/modal";

const CreateGameModal: React.FC<{ onClose: () => void }> = (props) => {
  const { onClose } = props;

  const { post } = useFetch();

  const [gameName, setGameName] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [gamePrice, setGamePrice] = useState("0");
  const [gameRating, setGameRating] = useState(0);
  const [gameImg, setGameImg] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameAgeLimit, setGameAgeLimit] = useState("all");
  const [gamePlatforms, setGamePlatforms] = useState<string[]>([]);

  const onChangeGameName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGameName(event.target.value);
  };

  const onChangeGameCategory: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGameCategory(event.target.value);
  };
  // TODO: add validation
  const onChangeGamePrice: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGamePrice(event.target.value);
  };

  const onChangeGameImg: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGameImg(event.target.value);
  };

  const onChangeGameDescription: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setGameDescription(event.target.value);
  };

  const onChangeGameAgeLimit: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setGameAgeLimit(event.target.value);
  };

  const onChangeGamePlatforms: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!gamePlatforms.includes(event.target.value)) {
      setGamePlatforms((prevState) => [...prevState, event.target.value]);
    } else {
      setGamePlatforms((prevState) => prevState.filter((platform) => platform !== event.target.value));
    }
  };

  const onChangeGameRating: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGameRating(+event.target.value);
  };

  const onSubmitHandler: FormEventHandler = (event) => {
    event.preventDefault();
    post("/api/products", {
      gameTitle: gameName,
      gameLogo: gameImg,
      gamePrice: +gamePrice,
      gamePlatforms,
      gameDescription,
      ageLimit: gameAgeLimit,
      rating: gameRating,
      genre: gameCategory,
      date: Date.now(),
    }).then((data) => {
      console.log(data);
      onClose();
    });
  };

  return (
    <Modal title="Create game" onClose={onClose}>
      <GameInfoForm
        onSubmit={onSubmitHandler}
        name={gameName}
        onChangeName={onChangeGameName}
        category={gameCategory}
        onChangeCategory={onChangeGameCategory}
        price={gamePrice.toString()}
        onChangePrice={onChangeGamePrice}
        imageUrl={gameImg}
        onChangeImageUrl={onChangeGameImg}
        ageLimit={gameAgeLimit}
        onChangeAgeLimit={onChangeGameAgeLimit}
        description={gameDescription}
        onChangeDescription={onChangeGameDescription}
        platforms={gamePlatforms}
        onChangePlatforms={onChangeGamePlatforms}
      >
        <label htmlFor="rating">
          Rating
          <input id="rating" value={gameRating} onChange={onChangeGameRating} type="number" min={1} max={5} />
        </label>
        <Button isSubmit title="Add game" />
      </GameInfoForm>
    </Modal>
  );
};

export default CreateGameModal;
