import "./formInput.scss";
import React, { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  inputValue: string;
  changeHandler: ChangeEventHandler;
  errorMessage: string;
};

const Input: React.FC<InputProps> = (props) => {
  const { label, inputValue, changeHandler, errorMessage } = props;

  return (
    <div className="input__wrapper">
      <label htmlFor={label}>{label}</label>
      <input onChange={changeHandler} value={inputValue} type="text" name={label} />
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default Input;
