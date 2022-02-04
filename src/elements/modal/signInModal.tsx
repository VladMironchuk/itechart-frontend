import "./modal.scss";
import React, { ChangeEventHandler, useContext, useState, FormEventHandler } from "react";
import AppContext from "@/context/context";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";
import useHttp from "@/hooks/useHttp";

const SignInModal: React.FC<{ signInHandler: () => void }> = ({ signInHandler }) => {
  const { toggleLogging, updateLogin } = useContext(AppContext);

  const { error: reqError, sendRequest } = useHttp();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const loginChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLogin(() => event.target.value);
  };

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(() => event.target.value);
  };

  const submitHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    if (login.length < 6) {
      setLoginErrorMessage("Login length must be more then 6 symbols.");
      return;
    }
    setLoginErrorMessage("");

    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) {
      setPasswordErrorMessage("Password must contain letters and numbers.");
      return;
    }
    setPasswordErrorMessage("");

    await sendRequest(
      {
        url: "/api/auth/signIn/",
        method: "POST",
        body: {
          login,
          password,
        },
      },
      () => {
        signInHandler();
        updateLogin(login);
        toggleLogging();
      }
    );
    console.log(reqError);
  };

  return (
    <Modal onClose={signInHandler} title="Authorization">
      <form action="/" onSubmit={submitHandler}>
        <Input label="Login" changeHandler={loginChangeHandler} inputValue={login} errorMessage={loginErrorMessage} />
        <Input
          label="Password"
          changeHandler={passwordChangeHandler}
          inputValue={password}
          errorMessage={passwordErrorMessage}
        />
        <button type="submit" className="modal__button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignInModal;
