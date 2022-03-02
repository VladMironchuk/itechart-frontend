import { ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "use-http";
import { gamesActions } from "@/redux/slices/games";
import GameInfoForm from "./gameInfoForm";
import "./modal.scss";
import Modal from "./overlay/modal";

const CreateGameModal: React.FC<{ onClose: () => void }> = (props) => {
  const { onClose } = props;

  const dispatch = useDispatch();

  const { post } = useFetch();

  const [rating, setRating] = useState(1);

  const onChangeRating: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRating(+event.target.value);
  };

  const sendRequest = (body: { [keyof: string]: string | string[] }) => {
    post("/api/products", { ...body, rating }).then((data) => {
      dispatch(gamesActions.updateGames({ games: data }));
      onClose();
    });
  };

  return (
    <Modal title="Create game" onClose={onClose}>
      <GameInfoForm submitButtonText="Add game" currentGameName="" sendRequest={sendRequest}>
        <label htmlFor="rating">
          Rating
          <input id="rating" value={rating} onChange={onChangeRating} type="number" min={1} max={5} />
        </label>
      </GameInfoForm>
    </Modal>
  );
};

export default CreateGameModal;
