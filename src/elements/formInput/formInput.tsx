import "./formInput.scss";
import React, { ChangeEventHandler } from "react";

type Props = { label: string; inputValue: string; onChange: ChangeEventHandler; errorMessage: string };

const FormInput: React.FC<Props> = (props) => {
  const { label, inputValue, onChange, errorMessage } = props;

  return (
    <div className="input__wrapper">
      <label htmlFor={label}>{label}</label>
      <input onChange={onChange} value={inputValue} type="text" name={label} />
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
