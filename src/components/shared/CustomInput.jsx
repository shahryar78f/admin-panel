import React from "react";

export default function CustomInput({
  type,
  name,
  value,
  onChange,
  className,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
}

// background: #F2F2F2;
// background: #55A3F0;
