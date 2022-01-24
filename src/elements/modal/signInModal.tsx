import "./modal.scss";
import React, { ChangeEventHandler, useContext, useState } from "react";
import AppContext from "@/context/context";
import crossIcon from "@/assets/images/cross-icon.png";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";

const SignInModal: React.FC = () => {
  const { toggleSignIn } = useContext(AppContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLogin(() => event.target.value);
  };

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(() => event.target.value);
  };

  const submitHandler = () => {
    if (login.length < 6) {
      alert("login must have >6 symbols");
      return;
    }

    if (!password.match(/.*[/d][a-z][A-Z][!*?<>]/)) {
      alert("password must be alphanumeric");
      return;
    }

    toggleSignIn();
  };

  return (
    <Modal url="/api/auth/signIn/" cb={submitHandler} body={{ login, password }}>
      <div className="wrapper">
        <h3 className="modal__title">Authorization</h3>
        <button type="button" className="cancel-button" onClick={toggleSignIn}>
          <img className="cancel" src={crossIcon} alt="cancel" />
        </button>
      </div>
      <Input label="Login" changeHandler={loginChangeHandler} value={login} />
      <Input label="Password" changeHandler={passwordChangeHandler} value={password} />
      <button type="submit" className="modal__button">
        Submit
      </button>
    </Modal>
  );
};

export default SignInModal;
