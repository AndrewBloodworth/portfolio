/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { StyledMain } from "./Main.styled";
import Routes from "../../../routes/Routes";
import Nav from "../Nav/Nav";
import Burger from "../../utils/Burger/Burger";
import Menu from "../../views/Menu/Menu";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

const Main = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyledMain>
      <main>
        <Nav />
        <Burger open={open} setOpen={setOpen} />
        <Router>
          <div>
            <Menu open={open} />
            <section>
              <Routes open={open} />
            </section>
            <Footer />
          </div>
        </Router>
      </main>
    </StyledMain>
  );
};

export default Main;
