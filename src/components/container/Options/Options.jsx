import React from "react";
import "./Options.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const Options = () => {
  return (
    <Layout>
      <div>
        <p>Music</p>
        <button>Toggle</button>

        <p>Sound Effects</p>
        <button>Toggle</button>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Options;
