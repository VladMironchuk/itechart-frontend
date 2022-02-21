import { ChangeEventHandler, FormEventHandler, useState } from "react";
import useFetch from "use-http";
import Button from "../button/button";
import FormInput from "../formInput/formInput";
import "./modal.scss";
import Modal from "./overlay/modal";

const CreateGameModal: React.FC<{ onClose: () => void }> = (props) => {
  const { onClose } = props;

  const { post } = useFetch();

  const [gameName, setGameName] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [gamePrice, setGamePrice] = useState(0);
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

  const onChangeGamePrice: ChangeEventHandler<HTMLInputElement> = (event) => {
    setGamePrice(+event.target.value);
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
    setGameRating(+(+event.target.value).toPrecision(4));
  };

  const onSubmitHandler: FormEventHandler = (event) => {
    event.preventDefault();
    post("/api/products", {
      gameTitle: gameName,
      gameLogo: gameImg,
      gamePrice,
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
      <form onSubmit={onSubmitHandler}>
        <FormInput label="Name" inputValue={gameName} onChange={onChangeGameName} errorMessage="" />
        <FormInput label="Category" inputValue={gameCategory} onChange={onChangeGameCategory} errorMessage="" />
        <FormInput label="Price" inputValue={gamePrice.toString()} onChange={onChangeGamePrice} errorMessage="" />
        <FormInput label="Image" inputValue={gameImg} onChange={onChangeGameImg} errorMessage="" />
        <label htmlFor="rating">
          Rating
          <input id="rating" value={gameRating} onChange={onChangeGameRating} type="number" min={1} max={5} />
        </label>
        <label htmlFor="description">
          Description
          <textarea cols={30} rows={10} value={gameDescription} onChange={onChangeGameDescription} id="description" />
        </label>
        <label htmlFor="age">
          Age
          <select value={gameAgeLimit} onChange={onChangeGameAgeLimit} id="age">
            <option value="all">All</option>
            <option value="3">3+</option>
            <option value="6">6+</option>
            <option value="12">12+</option>
            <option value="18">18+</option>
          </select>
        </label>
        <p>Platform</p>
        <label htmlFor="pc">
          PC
          <input
            onChange={onChangeGamePlatforms}
            checked={gamePlatforms.includes("pc")}
            id="pc"
            type="checkbox"
            value="pc"
          />
        </label>
        <label htmlFor="ps">
          PS
          <input
            onChange={onChangeGamePlatforms}
            checked={gamePlatforms.includes("ps")}
            id="ps"
            type="checkbox"
            value="ps"
          />
        </label>
        <label htmlFor="xbox">
          XBox
          <input
            onChange={onChangeGamePlatforms}
            checked={gamePlatforms.includes("xbox")}
            id="xbox"
            type="checkbox"
            value="xbox"
          />
        </label>
        <Button isSubmit title="Add game" />
      </form>
    </Modal>
  );
};

export default CreateGameModal;
