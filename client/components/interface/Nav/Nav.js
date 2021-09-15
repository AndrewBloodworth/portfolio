/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledNav } from "./Nav.styled";
import Image from "../../utils/ImageComponent/Image";
import { resetAuth } from "../../../redux/reducers/auth";
import history from "../../../utils/history";

const Nav = ({ logout, login, isLoggedIn }) => {
  return (
    <StyledNav>
      <Image
        url={"/dummy_logo.png"}
        size={{ height: "80px", width: "120px" }}
        logo={true}
      />
      <div>
        {isLoggedIn ? (
          <a href="#" onClick={logout}>
            Logout
          </a>
        ) : (
          <a href="#" onClick={() => history.push("/login")}>
            Login
          </a>
        )}
        <a href="#" onClick={() => history.push("/signup")}>
          Signup
        </a>
      </div>
    </StyledNav>
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

export default connect(mapState, mapDispatch)(Nav);
