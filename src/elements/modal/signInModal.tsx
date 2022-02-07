import "./modal.scss";
import React, { ChangeEventHandler, useState, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";
import useHttp from "@/hooks/useHttp";
import { userActions } from "@/redux/redux";
import Button from "../button/button";

const SignInModal: React.FC<{ signInHandler: () => void }> = ({ signInHandler }) => {
  const dispatch = useDispatch();

  const updateLogin = (login: string) => {
    dispatch(userActions.updateLogin({ login }));
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

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
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default SignInModal;
