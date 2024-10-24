import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loder({ heght, width, color }) {
  return (
    <ThreeDots
      visible={true}
      height={heght || 30}
      width={width || 30}
      color={color || "#000"}
      radius="9"
      ariaLabel="three-dits-loading"
      wrapperStyle={{}}
    />
  );
}
