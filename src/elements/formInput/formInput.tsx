import "./formInput.scss";
import React, { ChangeEventHandler } from "react";

type Props = {
  label: string;
  inputValue: string;
  onChange: ChangeEventHandler;
  errorMessage: string;
  isPassword: boolean;
};

const FormInput: React.FC<Props> = (props) => {
  const { label, inputValue, onChange, errorMessage, isPassword } = props;

  return (
    <div className="input__wrapper">
      <label htmlFor={label}>{label}</label>
      <input onChange={onChange} value={inputValue} type={isPassword ? "password" : "text"} name={label} />
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
