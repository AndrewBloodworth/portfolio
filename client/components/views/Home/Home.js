/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledHome } from "./Home.styled";
import Image from "../../utils/ImageComponent/Image";

const Home = () => {
  return (
    <StyledHome>
      <header>
        <h1></h1>
      </header>
      <section>
        <img src="/abheadshot.jpg" />
      </section>
    </StyledHome>
  );
};
export default connect(null, null)(Home);
