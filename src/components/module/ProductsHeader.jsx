import React from "react";
import SearchBox from "./SearchBox";
import InfoUserBox from "./InfoUserBox";

export default function ProductsHeader() {
  return (
    <div className="products-header">
      <SearchBox />
      <InfoUserBox />
    </div>
  );
}
