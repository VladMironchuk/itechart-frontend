import "./formInput.scss";
import React, { ChangeEventHandler } from "react";

type InputProps = { label: string; value: string; changeHandler: ChangeEventHandler };

const Input: React.FC<InputProps> = (props) => {
  const { label, value, changeHandler } = props;

  return (
    <div className="input__wrapper">
      <label htmlFor={label}>{label}</label>
      <input onChange={changeHandler} value={value} type="text" name={label} />
    </div>
  );
};

export default Input;
