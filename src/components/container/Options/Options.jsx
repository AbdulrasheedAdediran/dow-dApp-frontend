import React, { useState } from "react";
import "./Options.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import Switch from "../../Switch/Switch";

const Options = () => {
  const [value, setValue] = useState(false);
  const [secondValue, setSecondValue] = useState(false);
  return (
    <div className="options">
      <h1>Options</h1>
      <div className="div_flex">
        <p>Music</p>
        <Switch
          isOn={value}
          onColor="hsla(111, 97%, 49%, 0.75)"
          handleToggle={() => setValue(!value)}
        />
      </div>
      <div className="div_flex">
        <p>Sound Effects</p>
        <Switch
          isOn={secondValue}
          onColor="hsla(111, 97%, 49%, 0.75)"
          handleToggle={() => setSecondValue(!secondValue)}
        />
      </div>
      <Link to="/">
        <button className="button">Back</button>
      </Link>
    </div>
  );
};

export default Options;
