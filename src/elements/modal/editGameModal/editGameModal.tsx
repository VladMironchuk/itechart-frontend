import "./editGameModal.scss";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import useFetch from "use-http";
import Modal from "../overlay/modal";
import Button from "../../button/button";
import "@/elements/modal/modal.scss";
import SubmitDeletingModal from "./submitDeletingModal";
import GameInfoForm from "../gameInfoForm";

type GameCardContent = {
  gameLogo: string;
  gameTitle: string;
  gamePrice: number;
  gamePlatformsImages: string[];
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

  const onToggleSubmitDeletingModal = () => {
    setIsSubmitDeletingModalVisible((prevState) => !prevState);
  };

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
        <SubmitDeletingModal onDelete={onDeleteCard} onClose={onToggleSubmitDeletingModal} />
      )}
      {loading && <div>Loading...</div>}
      {!loading && !error && (
        <div style={{ display: "flex" }}>
          <div>
            <p>Cart Image</p>
            <img src={gameImg} alt="game" style={{ width: "150px", height: "200px" }} />
          </div>
          <div>
            <p>Information</p>
            <GameInfoForm
              onSubmit={onSaveGameInfo}
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
              <div style={{ display: "flex" }}>
                <Button isSubmit title="Submit" />
                <Button
                  onClick={() => {
                    setIsSubmitDeletingModalVisible(true);
                  }}
                  title="Delete card"
                />
              </div>
            </GameInfoForm>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditGameModal;
