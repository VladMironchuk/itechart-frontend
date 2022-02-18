import "./editGameModal.scss";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import Modal from "./overlay/modal";
import useFetch from "use-http";
import Button from "../button/button";
import FormInput from "../formInput/formInput";

const EditGameModal: React.FC<{ onClose: () => void; game: string }> = (props) => {
  const { get, loading, error } = useFetch();

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
            <form>
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
                ></textarea>
              </label>
              <label htmlFor="age">
                Age
                <select onChange={onChangeGameAgeLimit} id="age">
                  <option selected={gameAgeLimit === "all"} value="all">
                    All
                  </option>
                  <option selected={gameAgeLimit === "3"} value="3">
                    3+
                  </option>
                  <option selected={gameAgeLimit === "6"} value="6">
                    6+
                  </option>
                  <option selected={gameAgeLimit === "12"} value="12">
                    12+
                  </option>
                  <option selected={gameAgeLimit === "18"} value="18">
                    18+
                  </option>
                </select>
              </label>
              <p>Platform</p>
              <label htmlFor="pc">
                <input
                  onChange={onChangeGamePlatforms}
                  checked={gamePlatforms.includes("pc")}
                  id="pc"
                  type="checkbox"
                />
              </label>
              <label htmlFor="ps">
                <input
                  onChange={onChangeGamePlatforms}
                  checked={gamePlatforms.includes("ps")}
                  id="ps"
                  type="checkbox"
                />
              </label>
              <label htmlFor="xbox">
                <input
                  onChange={onChangeGamePlatforms}
                  checked={gamePlatforms.includes("xbox")}
                  id="xbox"
                  type="checkbox"
                />
              </label>
            </form>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button title="Submit" />
            <Button title="Delete card" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditGameModal;
