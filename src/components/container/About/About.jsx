import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const About = () => {
  return (
    <Layout>
      <div class="about">
        <h1>About</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          qui.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, est.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          similique accusamus amet. Aliquam, voluptas consectetur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          repellendus rem veritatis vitae odit ipsam corporis? Tempore quos
          soluta quam?
        </p>
        <Link to="/" className="button">
          <button>Back</button>
        </Link>
      </div>
    </Layout>
  );
};

export default About;
