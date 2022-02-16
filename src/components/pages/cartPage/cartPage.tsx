import "./cartPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEventHandler, useState } from "react";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import { cartActions, CartState } from "@/redux/slices/cart";

import Button from "@/elements/button/button";
import { userState } from "@/redux/slices/user";

const CartItem: React.FC<{
  cartItem: GameCardContent & { amount: number; orderDate: Date };
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = (props) => {
  const { gameTitle, amount, gamePlatforms, orderDate, gamePrice } = props.cartItem;
  const { onChange } = props;

  const dispatch = useDispatch();

  const [itemAmount, setItemAmount] = useState(amount);

  const changeItemAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
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
        <input onChange={changeItemAmount} type="number" name={gameTitle} min={1} value={itemAmount} />
      </p>
      <p>{gamePrice}</p>
      <p>
        <input onChange={onChange} value={gameTitle} type="checkbox" />
      </p>
    </div>
  );
};

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const userBalance = useSelector((state: { user: userState }) => state.user.userBalance);
  const dispatch = useDispatch();

  const [itemsToRemove, setItemsToRemove] = useState<string[]>([]);

  const onSelectItemToBeRemoved: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      setItemsToRemove((prevState) => [...prevState, event.target.value]);
    } else {
      setItemsToRemove(itemsToRemove.filter((item) => item !== event.target.value));
    }
  };

  const onRemoveItems = () => {
    dispatch(cartActions.removeItemsFromCart({ itemsToRemove }));
  };
  const cartTotalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  return (
    <SectionContainer classname="cart-items" title="Cart page">
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className="cart-items__content">
          <div className="cart-items__content-rows">
            <p>Name</p>
            <p>Platform</p>
            <p>Order date</p>
            <p>Amount</p>
            <p>Price($)</p>
            <p />
          </div>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.gameTitle} cartItem={cartItem} onChange={onSelectItemToBeRemoved} />
          ))}
          <Button onClick={onRemoveItems} className="cart-items__content__remove" title="Remove" />
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div>Games cost: {cartTotalAmount}$</div>
            <div>Your balance: {userBalance}$</div>
            <Button className="cart-items__content__buy" title="Buy" />
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default CartPage;
