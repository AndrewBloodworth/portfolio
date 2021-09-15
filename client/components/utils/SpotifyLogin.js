/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import { setToken } from "../../redux/reducers/auth";

class SpotifyLogin extends Component {
  constructor({ props }) {
    super(props);
  }
  componentDidMount() {
    const { access_token } = this.props.match.params;
    const { saveToken, history } = this.props;
    const accessToken = JSON.parse(
      '{"' + access_token.replaceAll("=", '":"').replaceAll("&", '","') + '"}'
    );
    saveToken(accessToken);
    history.push("/");
  }
  render() {
    return <div>Spo</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveToken: (token) => {
      dispatch(setToken(token));
    },
  };
};

export default connect(null, mapDispatchToProps)(SpotifyLogin);
