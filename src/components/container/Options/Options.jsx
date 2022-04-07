import React from "react";
import "./Options.css";
import {Link} from "react-router-dom"


const Options = () => {
  return (
    <div>
      <p>Music</p>
      <button>Toggle</button>

      <p>Sound Effects</p>
      <button>Toggle</button>

      <Link to ="/"><button>Back</button></Link>
    </div>
  );
};

export default Options;
