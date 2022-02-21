import "./editGameModal.scss";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import useFetch from "use-http";
import Modal from "./overlay/modal";
import Button from "../button/button";
import FormInput from "../formInput/formInput";

type GameCardContent = {
  gameLogo: string;
  gameTitle: string;
  gamePrice: number;
  gamePlatformsImg: string[];
  gamePlatforms: string[];
  gameDescription: string;
  ageLimit: number;
  rating: number;
};

const EditGameModal: React.FC<{ onClose: () => void; game: string }> = (props) => {
  const { get, loading, error, delete: deleteReq, put } = useFetch();

  const [gameName, setGameName] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [gamePrice, setGamePrice] = useState(0);
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

  const onDeleteCard = () => {
    deleteReq(`/api/products/${props.game}`).then(() => {
      console.log("game deleted");
    });
    props.onClose();
  };

  const onSaveGameInfo: FormEventHandler = (event) => {
    event.preventDefault();
    put(`/api/products/${props.game}`, {
      gameTitle: gameName,
      gameLogo: gameImg,
      gamePrice,
      gamePlatforms,
      gameDescription,
      ageLimit: gameAgeLimit,
      genre: gameCategory,
    }).then(() => {
      props.onClose();
    });
  };

  useEffect(() => {
    get(`/api/products/${props.game}`).then((game: GameCardContent & { genre: string }) => {
      setGameName(game.gameTitle);
      setGameCategory(game.genre);
      setGamePrice(game.gamePrice);
      setGameImg(game.gameLogo);
      setGameDescription(game.gameDescription);
      setGameAgeLimit(game.ageLimit.toString());
      setGamePlatforms(game.gamePlatforms);
    });
  }, []);

  return (
    <Modal className="edit-game" title="Edit card" onClose={props.onClose}>
      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <p>Cart Image</p>
              <img src={gameImg} alt="game" style={{ width: "150px", height: "200px" }} />
            </div>
            <form onSubmit={onSaveGameInfo}>
              <p>Information</p>
              <FormInput label="Name" inputValue={gameName} onChange={onChangeGameName} errorMessage="" />
              <FormInput label="Category" inputValue={gameCategory} onChange={onChangeGameCategory} errorMessage="" />
              <FormInput label="Price" inputValue={gamePrice.toString()} onChange={onChangeGamePrice} errorMessage="" />
              <FormInput label="Image" inputValue={gameImg} onChange={onChangeGameImg} errorMessage="" />
              <label htmlFor="description">
                Description
                <textarea
                  cols={30}
                  rows={10}
                  value={gameDescription}
                  onChange={onChangeGameDescription}
                  id="description"
                />
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
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button isSubmit title="Submit" />
                {/* TODO: modal to submit deleting*/}
                <Button onClick={onDeleteCard} title="Delete card" />
              </div>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditGameModal;
