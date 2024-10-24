import React from "react";
import Loder from "./Loder";

export default function CutomButtom({
  type,
  className,
  isLoading,
  disabaled,
  title,
  icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick || null}
      type={type || "button"}
      className={className}
      disabled={disabaled}>
      {isLoading ? (
        <Loder />
      ) : (
        <>
          {icon && icon}
          {title && title}
        </>
      )}
    </button>
  );
}
