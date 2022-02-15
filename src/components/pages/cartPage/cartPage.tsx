import "./cartPage.scss";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import { CartState } from "@/redux/slices/cart";
import { useSelector } from "react-redux";
import { ChangeEventHandler } from "react";
// import { useState } from "react";

// const CartItemAmount: React.FC<{gameTitle: string, itemAmount: number}> = (props) => {
//   const {gameTitle, itemAmount} = props;
//   const [gameAmount, setGameAmount] = useState(itemAmount);
// }

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  // const cartTotalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  const changeItemAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
  };

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
            <p></p>
          </div>
          {cartItems.map((cartItem) => (
            <div key={cartItem.gameTitle} className="cart-items__content-rows">
              <p>{cartItem.gameTitle}</p>
              <p>
                <select>
                  {cartItem.gamePlatforms.map((gamePlatform) => (
                    <option key={`${cartItem.gameTitle}-${gamePlatform}`}>{gamePlatform}</option>
                  ))}
                </select>
              </p>
              <p>{cartItem.orderDate.toLocaleDateString("en-US")}</p>
              <p>
                <input
                  onChange={changeItemAmount}
                  type="text"
                  name={cartItem.gameTitle}
                  min={1}
                  value={cartItem.amount}
                />
              </p>
              <p>{cartItem.gamePrice}</p>
              <p>
                <input value={cartItem.gameTitle} type="checkbox" />
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default CartPage;
