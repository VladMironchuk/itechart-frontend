import "./formInput.scss";
import React, { ChangeEventHandler } from "react";

const Input: React.FC<{ label: string; value: string; changeHandler: ChangeEventHandler }> = ({
  label,
  value,
  changeHandler,
}) => (
  <div className="input__wrapper">
    <label htmlFor={label}>{label}</label>
    <input onChange={changeHandler} value={value} type="text" name={label} />
  </div>
);

export default Input;
