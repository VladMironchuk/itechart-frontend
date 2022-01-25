import "./modal.scss";
import React, { ChangeEventHandler, useContext, useState } from "react";
import { useHistory } from "react-router";
import AppContext from "@/context/context";
import crossIcon from "@/assets/images/cross-icon.png";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";

const SignUpModal: React.FC = () => {
  const { toggleSignUp, toggleLogging } = useContext(AppContext);
  const history = useHistory();

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

  const submitHandler = () => {
    if (login.length < 6) {
      alert("login must have >6 symbols");
      return;
    }

    if (!password.match(/.*/)) {
      alert("password must be alphanumeric");
      return;
    }

    if (password !== repeat) {
      alert("repeat password correctly");
      return;
    }

    toggleSignUp();
    toggleLogging();
    history.push("/profile");
  };

  return (
    <Modal url="/api/auth/signUp/" cb={submitHandler} body={{ login, password, repeat }} method="PUT">
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
