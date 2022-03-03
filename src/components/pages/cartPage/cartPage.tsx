import "./cartPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEventHandler, memo, useState } from "react";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import { cartActions, CartState } from "@/redux/slices/cart";

import Button from "@/elements/button/button";
import { userState } from "@/redux/slices/user";
import SubmitOrderModal from "@/elements/modal/submitOrderModal";
import CartItem from "./cartItem/cartItem";

const CartPage = memo(() => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const userBalance = useSelector((state: { user: userState }) => state.user.userBalance);
  const cartTotalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const [itemsToRemove, setItemsToRemove] = useState<string[]>([]);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

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

  const onToggleOrderModal = () => {
    setIsOrderModalVisible((prevState) => !prevState);
  };

  return (
    <>
      {isOrderModalVisible && <SubmitOrderModal onClose={onToggleOrderModal} />}
      <SectionContainer classname="cart-items" title="Cart page">
        {cartItems.length === 0 ? (
          <div style={{ marginTop: "1rem" }}>Cart is empty</div>
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
              <Button onClick={onToggleOrderModal} className="cart-items__content__buy" title="Buy" />
            </div>
          </div>
        )}
      </SectionContainer>
    </>
  );
});

export default CartPage;
