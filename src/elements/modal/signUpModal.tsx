import "./modal.scss";
import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from "react";
import { useHistory } from "react-router";
import AppContext from "@/context/context";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";
import useHttp from "@/hooks/useHttp";

const SignUpModal: React.FC<{ signUpHandler: () => void }> = ({ signUpHandler }) => {
  const { updateLogin, toggleLogging } = useContext(AppContext);
  const { sendRequest } = useHttp();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] = useState("");

  const loginChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLogin(() => event.target.value);
  };

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(() => event.target.value);
  };

  const repeatPasswordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRepeatedPassword(() => event.target.value);
  };

  const submitHandler: FormEventHandler = (event) => {
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

    if (password !== repeatedPassword) {
      setRepeatedPasswordErrorMessage("Repeat password correctly.");
      return;
    }
    setRepeatedPasswordErrorMessage("");

    sendRequest(
      {
        url: "api/auth/signUp",
        method: "POST",
        body: {
          login,
          password,
        },
      },
      () => {
        signUpHandler();
        updateLogin(login);
        toggleLogging();
        history.push("/profile");
      }
    );
  };

  return (
    <Modal onClose={signUpHandler} title="Registration">
      <form onSubmit={submitHandler}>
        <Input label="Login" changeHandler={loginChangeHandler} inputValue={login} errorMessage={loginErrorMessage} />
        <Input
          label="Password"
          changeHandler={passwordChangeHandler}
          inputValue={password}
          errorMessage={passwordErrorMessage}
        />
        <Input
          label="Repeat password"
          changeHandler={repeatPasswordChangeHandler}
          inputValue={repeatedPassword}
          errorMessage={repeatedPasswordErrorMessage}
        />
        <button type="submit" className="modal__button">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
