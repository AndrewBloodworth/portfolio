/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "../redux/reducers/auth";

import Home from "../components/views/Home/Home";
import Portal from "../components/interface/Portal/Portal";
import { Login, Signup } from "../components/views/AuthForm";
import FourOhFour from "../components/views/FourOhFour/FourOhFour";
import SpotifyLogin from "../components/utils/SpotifyLogin";

const Routes = ({ getMe, isLoggedIn, open, preCheck, auth }) => {
  useEffect(() => {
    getMe();
  }, [isLoggedIn]);

  const renderer = (Component, props) => (
    <Portal {...{ Component, props, open, preCheck, auth }} />
  );

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/" render={(props) => renderer(Home, props)} />
          <Route
            exact
            path="/login"
            render={(props) => renderer(Home, props)}
          />
          <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" render={(props) => renderer(Home, props)} />
          <Route
            path="/token/:access_token"
            render={(props) => renderer(SpotifyLogin, props)}
          />
          <Route
            exact
            path="/login"
            render={(props) => renderer(Login, props)}
          />
          <Route
            exact
            path="/signup"
            render={(props) => renderer(Signup, props)}
          />
          <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          />
        </Switch>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { auth, preCheck } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
    auth,
    preCheck,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMe() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
