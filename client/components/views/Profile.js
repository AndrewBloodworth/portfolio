/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  fetchUserTopTracks,
  fetchUserTopArtists,
} from "../../redux/reducers/spotifyuser";
import TopArtists from "./TopArtists";

const Profile = ({
  token,
  getUser,
  user,
  getTopTracks,
  artists,
  getTopArtists,
}) => {
  useEffect(() => {
    getUser(token);
    //getTopTracks(token);
    getTopArtists(token);
  }, []);

  const { display_name, images } = user;
  if (!display_name) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div className="user">
        <img src={images[0].url} style={{ width: 30, borderRadius: 15 }}></img>
        <p>{display_name}</p>
      </div>
      <TopArtists />
    </div>
  );
};

export default connect(
  (state) => {
    const { access_token } = state.auth.token;
    const { user } = state.spotifyuser;
    const { artists } = state.artists;
    return {
      token: access_token,
      user,
      artists,
    };
  },
  (dispatch) => {
    return {
      getUser: (token) => {
        dispatch(fetchUser(token));
      },
      getTopTracks: (token) => {
        dispatch(fetchUserTopTracks(token));
      },
      getTopArtists: (token) => {
        dispatch(fetchUserTopArtists(token));
      },
    };
  }
)(Profile);
