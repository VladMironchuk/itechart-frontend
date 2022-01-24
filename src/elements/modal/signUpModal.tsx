import "./modal.scss";
import React, { ChangeEventHandler, useContext, useState } from "react";
import AppContext from "@/context/context";
import crossIcon from "@/assets/images/cross-icon.png";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";

const SignUpModal: React.FC = () => {
  const { toggleSignUp } = useContext(AppContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const loginChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLogin(() => event.target.value);
  };

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(() => event.target.value);
  };

  const repeatPasswordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRepeat(() => event.target.value);
  };

  return (
    <Modal url="/api/auth/signUp/" cb={toggleSignUp} body={{ login, password, repeat }} method="PUT">
      <div className="wrapper">
        <h3 className="modal__title">Authorization</h3>
        <button type="button" className="cancel-button" onClick={toggleSignUp}>
          <img className="cancel" src={crossIcon} alt="cancel" />
        </button>
      </div>
      <Input label="Login" changeHandler={loginChangeHandler} value={login} />
      <Input label="Password" changeHandler={passwordChangeHandler} value={password} />
      <Input label="Repeat password" changeHandler={repeatPasswordChangeHandler} value={repeat} />
      <button type="submit" className="modal__button">
        Submit
      </button>
    </Modal>
  );
};

export default SignUpModal;
