import "./formInput.scss";
import React from "react";

const Input: React.FC<{ label: string }> = ({ label }) => (
  <div className="input__wrapper">
    <label htmlFor={label}>{label}</label>
    <input type="text" name={label} />
  </div>
);

export default Input;
