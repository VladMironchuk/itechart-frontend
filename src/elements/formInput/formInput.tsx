import "./formInput.scss";
import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  inputValue: string;
  onChange: ChangeEventHandler;
  errorMessage: string;
  type: HTMLInputTypeAttribute;
};

const FormInput: React.FC<Props> = (props) => {
  const { label, inputValue, onChange, errorMessage, type } = props;

  return (
    <div className="input__wrapper">
      <label htmlFor={label}>{label}</label>
      <input onChange={onChange} value={inputValue} type={type} name={label} />
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
