import { useDispatch, useSelector } from "react-redux";
import { cartActions, CartState } from "@/redux/slices/cart";
import { userState } from "@/redux/slices/user";
import Button from "../button/button";
import "./modal.scss";
import Modal from "./overlay/modal";

const SubmitOrderModal: React.FC<{ onClose: () => void }> = (props) => {
  const userBalance = useSelector((state: { user: userState }) => state.user.userBalance);
  const totalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const submitOrder = () => {
    dispatch(cartActions.submitOrder());
    props.onClose();
  };

  return (
    <Modal title="Submit order" onClose={props.onClose}>
      {totalAmount > userBalance ? (
        <div>No money</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          <Button onClick={submitOrder} className="modal__button order-button" title="Yes" />
          <Button onClick={props.onClose} className="modal__button order-button" title="No" />
        </div>
      )}
    </Modal>
  );
};

export default SubmitOrderModal;
