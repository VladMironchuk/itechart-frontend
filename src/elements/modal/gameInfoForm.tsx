import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GamesState } from "@/redux/slices/games";
import Button from "../button/button";
import FormInput from "../formInput/formInput";

type Props = {
  submitButtonText: string;
  currentGameName: string;
  sendRequest: (body: { [keyof: string]: string | string[] }) => void;
};

const GameInfoForm: React.FC<Props> = (props) => {
  const { submitButtonText, currentGameName, children, sendRequest } = props;

  const games = useSelector((state: { products: GamesState }) => state.products.games);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ageLimit, setAgeLimit] = useState("all");
  const [platforms, setPlatforms] = useState<string[]>([]);

  const [priceErrorMessage, setPriceErrorMessage] = useState("");

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const onChangeCategory: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCategory(event.target.value);
  };

  const onChangePrice: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPrice(event.target.value);
  };

  const onChangeImageUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
    setImage(event.target.value);
  };

  const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(event.target.value);
  };

  const onChangeAgeLimit: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAgeLimit(event.target.value);
  };

  const onChangePlatforms: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!platforms.includes(event.target.value)) {
      setPlatforms((prevState) => [...prevState, event.target.value]);
    } else {
      setPlatforms((prevState) => prevState.filter((platform) => platform !== event.target.value));
    }
  };

  const onSaveGameInfo: FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (Number.isNaN(+price)) {
      setPriceErrorMessage("Invalid format");
      return;
    }
    sendRequest({
      gameTitle: name,
      gameLogo: image,
      gamePrice: price,
      gamePlatforms: platforms,
      gameDescription: description,
      ageLimit,
      genre: category,
    });
  };

  useEffect(() => {
    const curGameIndex = games.findIndex((game) => game.gameTitle === currentGameName);
    const curGame = games[curGameIndex];
    setName(curGame?.gameTitle || "");
    setCategory(curGame?.genre || "");
    setPrice(curGame?.gamePrice.toString() || "");
    setImage(curGame?.gameLogo || "");
    setDescription(curGame?.gameDescription || "");
    setAgeLimit(curGame?.ageLimit.toString() || "");
    setPlatforms(curGame?.gamePlatforms || "");
  }, []);

  return (
    <form className="game-info" onSubmit={onSaveGameInfo}>
      <FormInput type="text" label="Name" inputValue={name} onChange={onChangeName} errorMessage="" />
      <FormInput type="text" label="Category" inputValue={category} onChange={onChangeCategory} errorMessage="" />
      <FormInput
        type="text"
        label="Price"
        inputValue={price}
        onChange={onChangePrice}
        errorMessage={priceErrorMessage}
      />
      <FormInput type="text" label="Image" inputValue={image} onChange={onChangeImageUrl} errorMessage="" />
      <label className="game-info__description" htmlFor="description">
        Description
        <textarea cols={30} rows={10} value={description} onChange={onChangeDescription} id="description" />
      </label>
      <label htmlFor="age">
        Age
        <select className="game_info__age" value={ageLimit} onChange={onChangeAgeLimit} id="age">
          <option value="all">All</option>
          <option value="3">3+</option>
          <option value="6">6+</option>
          <option value="12">12+</option>
          <option value="18">18+</option>
        </select>
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "4.9rem" }}>Platform</p>
        {["pc", "ps", "xbox"].map((platform) => (
          <label style={{ margin: "0 10px" }} htmlFor={platform} key={platform}>
            {platform.toUpperCase()}
            <input
              onChange={onChangePlatforms}
              checked={platforms.includes(platform)}
              id={platform}
              type="checkbox"
              value={platform}
            />
          </label>
        ))}
      </div>
      {children}
      <Button isSubmit title={submitButtonText} />
    </form>
  );
};

export default GameInfoForm;
