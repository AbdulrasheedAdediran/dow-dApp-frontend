import React from "react";
import "./Connected.css";

const Connected = (props) => {
  const address = props.address;
  const DOWTokenBalance = props.DOWTokenBalance;
  const networkCoinBalance = props.networkCoinBalance;
  // console.log("DOWTokenBalance:", DOWTokenBalance);
  // console.log("networkCoinBalance:", networkCoinBalance);
  return (
    <ul className="connected">
      <li>{DOWTokenBalance} DOW</li>
      <li>{networkCoinBalance} BOBA</li>
      <li>
        {address.slice(0, 5)}...
        {address.slice(address.length - 4, address.length)}
      </li>
    </ul>
  );
};

export default Connected;
