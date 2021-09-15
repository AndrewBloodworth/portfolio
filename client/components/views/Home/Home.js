/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledHome } from "./Home.styled";
import Profile from "../Profile";

const Home = () => {
  return (
    <StyledHome>
      <header>
        <h1>Welcome to Phish Store!</h1>
      </header>
      <section>
        <Profile />
      </section>
    </StyledHome>
  );
};
export default connect(null, null)(Home);
