import "./modal.scss";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Modal from "./overlay/modal";
import FormInput from "../formInput/formInput";
import { userActions } from "@/redux/slices/user";
import Button from "../button/button";
import useFetch from "use-http";

const SignUpModal: React.FC<{ signUpHandler: () => void }> = ({ signUpHandler }) => {
  const dispatch = useDispatch();

  const updateLogin = (login: string) => {
    dispatch(userActions.updateLogin({ login }));
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
  };

  const history = useHistory();

  const { post, response, error } = useFetch();

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

    (async () => {
      await post("/api/auth/signUp", {
        login,
        password,
      });

      if (error) {
        console.log(error);
      }

      if (response.ok) {
        signUpHandler();
        updateLogin(login);
        toggleLogging();
        history.push("/profile");
      }
    })();
  };

  return (
    <Modal onClose={signUpHandler} title="Registration">
      <form onSubmit={submitHandler}>
        <FormInput label="Login" onChange={loginChangeHandler} inputValue={login} errorMessage={loginErrorMessage} />
        <FormInput
          label="Password"
          onChange={passwordChangeHandler}
          inputValue={password}
          errorMessage={passwordErrorMessage}
        />
        <FormInput
          label="Repeat password"
          onChange={repeatPasswordChangeHandler}
          inputValue={repeatedPassword}
          errorMessage={repeatedPasswordErrorMessage}
        />
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default SignUpModal;
