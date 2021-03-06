import "./modal.scss";
import React, { ChangeEventHandler, useState, FormEventHandler } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import Modal from "./overlay/modal";
import FormInput from "../formInput/formInput";
import Button from "../button/button";
import { userState } from "@/redux/slices/user";

const ChangePasswordModal: React.FC<{ changePasswordToggler: () => void }> = ({ changePasswordToggler }) => {
  const login = useSelector((state: { user: userState }) => state.user.login);
  const { post, response, error } = useFetch();

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

    await post("/api/changePassword", {
      login,
      password,
    });

    if (error) {
      return;
    }

    if (response.ok) {
      changePasswordToggler();
    }
  };

  return (
    <Modal onClose={changePasswordToggler} title="Change password">
      <form action="/" onSubmit={submitHandler}>
        <FormInput
          type="password"
          label="Password"
          onChange={passwordChangeHandler}
          inputValue={password}
          errorMessage=""
        />
        <FormInput
          label="Repeate password"
          onChange={repeatedPasswordChangeHandler}
          inputValue={repeatedPassword}
          errorMessage={passwordErrorMessage}
          type="password"
        />
        <Button isSubmit className="modal__button" title="Submit" />
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
