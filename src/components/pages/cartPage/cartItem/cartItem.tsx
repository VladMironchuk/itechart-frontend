import { ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import { cartActions } from "@/redux/slices/cart";

type Props = {
  cartItem: GameCardContent["game"] & { amount: number; orderDate: Date };
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const CartItem: React.FC<Props> = (props) => {
  const { gameTitle, amount, gamePlatforms, orderDate, gamePrice } = props.cartItem;
  const { onChange } = props;

  const dispatch = useDispatch();

  const [itemAmount, setItemAmount] = useState(amount);

  const changeItemAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (+event.target.value < 1) {
      onChange(event);
      dispatch(cartActions.removeItemsFromCart({ itemsToRemove: [gameTitle] }));
    }
    setItemAmount(+event.target.value);
    dispatch(cartActions.changeItemAmount({ itemTitle: event.target.name, currentItemAmount: +event.target.value }));
  };

  return (
    <div className="cart-items__content-rows">
      <p>{gameTitle}</p>
      <p>
        <select>
          {gamePlatforms.map((gamePlatform) => (
            <option key={gameTitle + gamePlatform}>{gamePlatform}</option>
          ))}
        </select>
      </p>
      <p>{orderDate.toLocaleDateString("en-US")}</p>
      <p>
        <input onChange={changeItemAmount} type="number" name={gameTitle} min={0} value={itemAmount} />
      </p>
      <p>{gamePrice}</p>
      <p>
        <input onChange={onChange} value={gameTitle} type="checkbox" />
      </p>
    </div>
  );
};

export default CartItem;
