import "./editGameModal.scss";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import useFetch from "use-http";
import Modal from "../overlay/modal";
import Button from "../../button/button";
import FormInput from "../../formInput/formInput";
import crossIcon from "@/assets/images/cross-icon.png";
import "@/elements/modal/modal.scss";

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

type Props = {
  onClose: () => void;
  game: string;
};

const EditGameModal: React.FC<Props> = (props) => {
  const { onClose, game } = props;

  const { get, loading, error, delete: deleteReq, put } = useFetch();

  const [gameName, setGameName] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [gamePrice, setGamePrice] = useState(0);
  const [gameImg, setGameImg] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameAgeLimit, setGameAgeLimit] = useState("all");
  const [gamePlatforms, setGamePlatforms] = useState<string[]>([]);

  const [isSubmitDeletingModalVisible, setIsSubmitDeletingModalVisible] = useState(false);

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
    deleteReq(`/api/products/${game}`).then(() => {
      console.log("game deleted");
    });
    onClose();
  };

  const onSaveGameInfo: FormEventHandler = (event) => {
    event.preventDefault();
    put(`/api/products/${game}`, {
      gameTitle: gameName,
      gameLogo: gameImg,
      gamePrice,
      gamePlatforms,
      gameDescription,
      ageLimit: gameAgeLimit,
      genre: gameCategory,
    }).then(() => {
      onClose();
    });
  };

  useEffect(() => {
    get(`/api/products/${game}`).then((curGame: GameCardContent & { genre: string }) => {
      setGameName(curGame.gameTitle);
      setGameCategory(curGame.genre);
      setGamePrice(curGame.gamePrice);
      setGameImg(curGame.gameLogo);
      setGameDescription(curGame.gameDescription);
      setGameAgeLimit(curGame.ageLimit.toString());
      setGamePlatforms(curGame.gamePlatforms);
    });
  }, []);

  return (
    <Modal className="edit-game" title="Edit card" onClose={onClose}>
      {isSubmitDeletingModalVisible && (
        <div className="modal submit-deleting">
          <div className="wrapper">
            <h3 className="modal__title">Submit deleting</h3>
            <button
              type="button"
              onClick={() => {
                setIsSubmitDeletingModalVisible(false);
              }}
              className="cancel-button"
            >
              <img className="cancel" src={crossIcon} alt="cancel" />
            </button>
          </div>
          <Button onClick={onDeleteCard} title="Yes" />
          <Button
            onClick={() => {
              setIsSubmitDeletingModalVisible(false);
            }}
            title="No"
          />
        </div>
      )}
      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <p>Cart Image</p>
              <img src={gameImg} alt="game" style={{ width: "150px", height: "200px" }} />
            </div>
            <form className="game-info" onSubmit={onSaveGameInfo}>
              <p>Information</p>
              <FormInput type="text" label="Name" inputValue={gameName} onChange={onChangeGameName} errorMessage="" />
              <FormInput
                type="text"
                label="Category"
                inputValue={gameCategory}
                onChange={onChangeGameCategory}
                errorMessage=""
              />
              <FormInput
                type="text"
                label="Price"
                inputValue={gamePrice.toString()}
                onChange={onChangeGamePrice}
                errorMessage=""
              />
              <FormInput type="text" label="Image" inputValue={gameImg} onChange={onChangeGameImg} errorMessage="" />
              <label className="game-info__description" htmlFor="description">
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
                <select className="game_info__age" value={gameAgeLimit} onChange={onChangeGameAgeLimit} id="age">
                  <option value="all">All</option>
                  <option value="3">3+</option>
                  <option value="6">6+</option>
                  <option value="12">12+</option>
                  <option value="18">18+</option>
                </select>
              </label>
              <div style={{ display: "flex" }}>
                <p>Platform</p>
                {["pc", "ps", "xbox"].map((platform) => (
                  <label htmlFor={platform} key={platform}>
                    {platform.toUpperCase()}
                    <input
                      onChange={onChangeGamePlatforms}
                      checked={gamePlatforms.includes(platform)}
                      id={platform}
                      type="checkbox"
                      value={platform}
                    />
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button isSubmit title="Submit" />
                <Button
                  onClick={() => {
                    setIsSubmitDeletingModalVisible(true);
                  }}
                  title="Delete card"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditGameModal;
