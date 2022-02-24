import "./modal.scss";
import React, { ChangeEventHandler, useState, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import useFetch from "use-http";
import Modal from "./overlay/modal";
import FormInput from "../formInput/formInput";
import { userActions } from "@/redux/slices/user";
import Button from "../button/button";

const SignInModal: React.FC<{ onClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const { post, response, error } = useFetch();

  const updateLogin = (login: string) => {
    dispatch(userActions.updateLogin({ login }));
  };

  const toggleLogging = () => {
    dispatch(userActions.toggleLogging());
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

    const userRes = await post("/api/auth/signIn", {
      login,
      password,
    });

    if (error) {
      alert(userRes.message);
      return;
    }

    if (response.ok) {
      props.onClose();
      updateLogin(login);
      toggleLogging();
      dispatch(userActions.updateUsername({ username: userRes.username }));
      dispatch(userActions.updateDescription({ description: userRes.description }));
    }
  };

  return (
    <Modal onClose={props.onClose} title="Authorization">
      <form action="/" onSubmit={submitHandler}>
        <FormInput
          type="text"
          label="Login"
          onChange={loginChangeHandler}
          inputValue={login}
          errorMessage={loginErrorMessage}
        />
        <FormInput
          label="Password"
          onChange={passwordChangeHandler}
          inputValue={password}
          errorMessage={passwordErrorMessage}
          type="password"
        />
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default SignInModal;
