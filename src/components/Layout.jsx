import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
