import "./modal.scss";
import React, { ChangeEventHandler, useState, FormEventHandler } from "react";
import { useSelector } from "react-redux";
import Modal from "./overlay/overlay";
import Input from "../formInput/formInput";
import useHttp from "@/hooks/useHttp";
import Button from "../button/button";
import { AppProps } from "@/redux/redux";

const ChangePasswordModal: React.FC<{ changePasswordToggler: () => void }> = ({ changePasswordToggler }) => {
  const login = useSelector((state: { user: AppProps }) => state.user.login);
  const { error: reqError, sendRequest } = useHttp();

  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(() => event.target.value);
  };

  const repeatedPasswordChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRepeatedPassword(() => event.target.value);
  };

  const submitHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    if (password !== repeatedPassword) {
      setPasswordErrorMessage("Repeat new password correctly");
      return;
    }
    setPasswordErrorMessage("");

    await sendRequest(
      {
        url: "/api/changePassword",
        method: "POST",
        body: {
          login,
          password,
        },
      },
      () => {
        changePasswordToggler();
      }
    );
    console.log(reqError);
  };

  return (
    <Modal onClose={changePasswordToggler} title="Change password">
      <form action="/" onSubmit={submitHandler}>
        <Input label="Password" changeHandler={passwordChangeHandler} inputValue={password} errorMessage="" />
        <Input
          label="Repeated password"
          changeHandler={repeatedPasswordChangeHandler}
          inputValue={repeatedPassword}
          errorMessage={passwordErrorMessage}
        />
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
