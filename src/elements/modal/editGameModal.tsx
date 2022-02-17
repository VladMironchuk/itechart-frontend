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

  useEffect(() => {
    get(`/api/products/${props.game}`).then((game: GameCardContent & { genre: string }) => {
      setGameName(game.gameTitle);
      setGameCategory(game.genre);
      setGamePrice(game.gamePrice);
      setGameImg(game.gameLogo);
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
