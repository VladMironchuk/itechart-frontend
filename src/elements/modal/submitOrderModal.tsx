import { useSelector } from "react-redux";
import { CartState } from "@/redux/slices/cart";
import { userState } from "@/redux/slices/user";
import Button from "../button/button";
import "./modal.scss";
import Modal from "./overlay/modal";

const SubmitOrderModal: React.FC<{ onClose: () => void }> = (props) => {
  const userBalance = useSelector((state: { user: userState }) => state.user.userBalance);
  const totalAmount = useSelector((state: { cart: CartState }) => state.cart.totalAmount);

  return (
    <Modal title="Order" onClose={props.onClose}>
      {totalAmount > userBalance ? (
        <div>No money</div>
      ) : (
        <>
          <Button title="Yes" />
          <Button title="No" />
        </>
      )}
    </Modal>
  );
};

export default SubmitOrderModal;
