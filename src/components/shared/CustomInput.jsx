import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

export default function CustomInput({
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
}) {
  const [inputType, setInputType] = useState(type || "text");

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="input-group">
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        className={`input ${className}`}
        placeholder={placeholder}
      />
      {type === "password" && (
        <div className="show-password_input" onClick={togglePasswordVisibility}>
          {inputType === "password" ? <GoEyeClosed /> : <RxEyeOpen />}
        </div>
      )}
    </div>
  );
}
