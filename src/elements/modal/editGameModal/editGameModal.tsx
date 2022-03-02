import "./editGameModal.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "use-http";
import Modal from "../overlay/modal";
import Button from "../../button/button";
import "@/elements/modal/modal.scss";
import SubmitDeletingModal from "./submitDeletingModal";
import GameInfoForm from "../gameInfoForm/gameInfoForm";
import { gamesActions, GamesState } from "@/redux/slices/games";

type Props = {
  onClose: () => void;
  curGameName: string;
};

const EditGameModal: React.FC<Props> = (props) => {
  const { onClose, curGameName } = props;

  const dispatch = useDispatch();

  const { put } = useFetch();

  const games = useSelector((state: { products: GamesState }) => state.products.games);

  const gameImg = games.find((game) => game.gameTitle === curGameName)?.gameLogo;

  const [isSubmitDeletingModalVisible, setIsSubmitDeletingModalVisible] = useState(false);

  const onToggleSubmitDeletingModal = () => {
    setIsSubmitDeletingModalVisible((prevState) => !prevState);
  };

  const onDeleteCard = () => {
    fetch(`/api/products/${curGameName}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        dispatch(gamesActions.updateGames({ games: data }));
      });
    onClose();
  };

  const sendRequest = (body: { [keyof: string]: string | string[] }) => {
    put(`/api/products/${curGameName}`, body).then((data) => {
      dispatch(gamesActions.updateGames({ games: data }));
      onClose();
    });
  };

  return (
    <Modal className="edit-game" title="Edit card" onClose={onClose}>
      {isSubmitDeletingModalVisible && (
        <SubmitDeletingModal onDelete={onDeleteCard} onClose={onToggleSubmitDeletingModal} />
      )}
      <div className="edit-game-modal">
        <div>
          <p>Cart Image</p>
          <img src={gameImg} alt="game" className="edit-game-modal__game-image" />
        </div>
        <div className="edit-game-modal__info">
          <p>Information</p>
          <GameInfoForm submitButtonText="Submit" sendRequest={sendRequest} currentGameName={curGameName}>
            <Button
              className="edit-game-modal__info__submit"
              onClick={() => {
                setIsSubmitDeletingModalVisible(true);
              }}
              title="Delete card"
            />
          </GameInfoForm>
        </div>
      </div>
    </Modal>
  );
};

export default EditGameModal;
