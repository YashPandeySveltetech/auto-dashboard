/** @format */

import React from "react";

function Card({
  children,
  width = "w-full",
  height = "h-full",
  radius = "rounded-[.5rem]",
  background = "bg-gradient-to-b from-[#243443] to-[#151E29]",
}) {
  return (
    <div
     style={{marginBottom:"10px"}}
      className={`${width} ${height}  ${radius} h-max p-[17px] px-[28px]  ${background} `}
    >
      {children}
    </div>
  );
}
export default Card;
