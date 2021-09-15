import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserTopTracks } from "../../redux/reducers/spotifyuser";

export const Artist = ({ topTracks, artist, rank, player, currentTrack }) => {
  useEffect(() => {
    //fetchArtistTopSongs(artist.id)
  }, []);
  const filtered = topTracks.filter(
    (track) => track.artists[0].id === artist.id
  );
  const playSong = (track) => {
    console.log("hello");
    const { uri: spotify_uri } = track;
    player.play({
      playerInstance: player,
      spotify_uri,
    });
  };

  return (
    <div className="top-artist">
      <div className="artist">
        <img src={artist.images[0].url}></img>
        <div className="artist-detail">
          <h2 style={{ paddingLeft: 10 }}>{artist.name}</h2>
          <div className="rank">
            <h4>#{rank}</h4>
          </div>
        </div>
      </div>
      <h3 style={{ marginBottom: "0" }}>Top Tracks ({filtered.length})</h3>
      <hr style={{ width: "100%" }} />
      <div className="tracks">
        <div className="top-tracks">
          {filtered.map((track, index) => {
            return (
              <div className="track" key={track.id}>
                <h3
                  onClick={() => playSong(track)}
                  style={
                    currentTrack.uri === track.uri
                      ? { color: "green" }
                      : { color: "black" }
                  }
                >
                  #{index + 1} - {track.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => {
    const { token } = state.auth;
    const { topTracks } = state.spotifyuser;
    const { audio, track } = state.audio;
    return {
      token: token.access_token,
      topTracks,
      player: audio,
      currentTrack: track,
    };
  },
  (dispatch) => {
    return {
      getTopTracks: (token, artistId) => {
        dispatch(fetchUserTopTracks(token, artistId));
      },
    };
  }
)(Artist);
