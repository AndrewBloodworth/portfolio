/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchUserTopArtists,
  fetchUserTopTracks,
} from "../../redux/reducers/spotifyuser";

import Artist from "./Artist";

function TopArtists({
  token,
  getTopArtists,
  topArtists,
  getTopTracks,
  artists,
}) {
  //const [range, setRange] = useState('All Time')
  useEffect(() => {
    //getTopArtists(token);
    getTopTracks(token);
  }, []);
  const handleSelect = ({ target }) => {
    getTopArtists(token, target.value);
    getTopTracks(token, target.value);
  };
  return (
    <div>
      <h2>Top Artists</h2>
      <span>
        <label for="time-range">Choose a time range:</label>

        <select name="range" id="time-range" onChange={handleSelect}>
          <option value="long_term">All Time</option>
          <option value="medium_term">Past Year</option>
          <option value="short_term">Past 4 weeks</option>
        </select>
      </span>
      <div className="top-artists">
        {topArtists.map((artist, index) => {
          return <Artist key={artist.id} artist={artist} rank={index + 1} />;
        })}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    const { token } = state.auth;
    const { topArtists } = state.spotifyuser;
    const { artists } = state.artists;
    return {
      token: token.access_token,
      artists,
      topArtists,
    };
  },
  (dispatch) => {
    return {
      getTopArtists: (token, range) => {
        dispatch(fetchUserTopArtists(token, range));
      },
      getTopTracks: (token, range) => {
        dispatch(fetchUserTopTracks(token, range));
      },
    };
  }
)(TopArtists);
