import "./modal.scss";
import React, { ChangeEventHandler, useState, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import useFetch from "use-http";
import Modal from "./overlay/modal";
import FormInput from "../formInput/formInput";
import { userActions } from "@/redux/slices/user";
import Button from "../button/button";
import { modalActions } from "@/redux/slices/modal";

const SignInModal: React.FC = () => {
  const dispatch = useDispatch();

  const { post, response, error } = useFetch();

  const updateLogin = (login: string) => {
    dispatch(userActions.updateLogin({ login }));
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

  const onSignIn = () => {
    dispatch(modalActions.toggleSignIn());
  };

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

    await post("/api/auth/signIn", {
      login,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    if (response.ok) {
      onSignIn();
      updateLogin(login);
      toggleLogging();
    }
  };

  return (
    <Modal onClose={onSignIn} title="Authorization">
      <form action="/" onSubmit={submitHandler}>
        <FormInput label="Login" onChange={loginChangeHandler} inputValue={login} errorMessage={loginErrorMessage} />
        <FormInput
          label="Password"
          onChange={passwordChangeHandler}
          inputValue={password}
          errorMessage={passwordErrorMessage}
        />
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default SignInModal;
