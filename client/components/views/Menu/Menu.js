/* eslint-disable no-unused-vars */
// Menu.js
import React from "react";
import { StyledMenu } from "./Menu.styled";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Menu = ({ open, isLoggedin, isAdmin }) => {
  return (
    <StyledMenu open={open}>
      <div>
        <header>
          <h3>AB</h3>
        </header>
      </div>
      <div>
        <header>
          <Link to="/">
            <h3>About Me</h3>
          </Link>
        </header>
      </div>
      <div>
        <header>
          <Link to="/projects">
            <h3>My Projects</h3>
          </Link>
        </header>
      </div>
    </StyledMenu>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state.auth;
  const isLoggedin = !!auth.id;
  const isAdmin = auth.role === "Admin";
  return {
    isLoggedin,
    isAdmin,
  };
};

export default connect(mapStateToProps, null)(Menu);
