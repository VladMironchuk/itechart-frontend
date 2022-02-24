import { ChangeEventHandler, FormEventHandler } from "react";
import FormInput from "../formInput/formInput";

type Props = {
  onSubmit: FormEventHandler;
  name: string;
  onChangeName: ChangeEventHandler<HTMLInputElement>;
  category: string;
  onChangeCategory: ChangeEventHandler<HTMLInputElement>;
  price: string;
  onChangePrice: ChangeEventHandler<HTMLInputElement>;
  imageUrl: string;
  onChangeImageUrl: ChangeEventHandler<HTMLInputElement>;
  description: string;
  onChangeDescription: ChangeEventHandler<HTMLTextAreaElement>;
  ageLimit: string;
  onChangeAgeLimit: ChangeEventHandler<HTMLSelectElement>;
  platforms: string[];
  onChangePlatforms: ChangeEventHandler<HTMLInputElement>;
};

const GameInfoForm: React.FC<Props> = (props) => {
  const {
    onSubmit,
    name,
    onChangeAgeLimit,
    onChangeCategory,
    onChangeDescription,
    onChangeImageUrl,
    onChangeName,
    onChangePlatforms,
    onChangePrice,
    category,
    price,
    imageUrl,
    platforms,
    ageLimit,
    description,
    children,
  } = props;

  return (
    <form className="game-info" onSubmit={onSubmit}>
      <FormInput type="text" label="Name" inputValue={name} onChange={onChangeName} errorMessage="" />
      <FormInput type="text" label="Category" inputValue={category} onChange={onChangeCategory} errorMessage="" />
      <FormInput type="text" label="Price" inputValue={price} onChange={onChangePrice} errorMessage="" />
      <FormInput type="text" label="Image" inputValue={imageUrl} onChange={onChangeImageUrl} errorMessage="" />
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
    </form>
  );
};

export default GameInfoForm;
