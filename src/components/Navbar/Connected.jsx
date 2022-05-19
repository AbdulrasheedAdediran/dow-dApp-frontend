import React from "react";
import "./Connected.css";

const Connected = (props) => {
  const address = props.address;
  return (
    <ul className="connected">
      {/* <li>props.dowBalance</li>
      <li>props.chainBalance</li> */}
      <li>
        {address.slice(0, 5)}...
        {address.slice(address.length - 4, address.length)}
      </li>
    </ul>
  );
};

export default Connected;
