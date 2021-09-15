/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledFooter } from "./Footer.styled";
import { Link } from "react-router-dom";
import { resetAuth } from "../../../redux/reducers/auth";

const Footer = ({ isLoggedIn, logout }) => {
  return (
    <StyledFooter>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div>Phish Store</div>
    </StyledFooter>
  );
};
const mapState = (state) => {
  const { auth } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(resetAuth());
    },
  };
};

export default connect(mapState, mapDispatch)(Footer);
