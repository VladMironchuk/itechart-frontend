import React, { FormEventHandler } from "react";
import useHttp from "@/helpers/useHttp";

const FormButton: React.FC<{ url: string; method: string }> = ({ method, url }) => {
  const { sendRequest } = useHttp();

  const submitHandler: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    sendRequest({ url, method }, null);
  };

  return (
    <button onSubmit={submitHandler} type="submit" className="modal__button">
      Submit
    </button>
  );
};

export default FormButton;
