import React, { FormEventHandler } from "react";
import useHttp from "@/hooks/useHttp";

type FormButtonProps = { url: string; method: string };

const FormButton: React.FC<FormButtonProps> = (props) => {
  const { method, url } = props;
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
