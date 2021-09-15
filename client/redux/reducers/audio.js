import store from "../store";
const SET_PLAYER = "SET_PLAYER";
const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";

const INITIAL_STATE = {
  audio: document.createElement("audio"),
  track: {},
};

const setPlayer = (player) => {
  return {
    type: SET_PLAYER,
    player,
  };
};
const setCurrent = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    track,
  };
};

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = store.getState().auth.token.access_token;
  const player = new Spotify.Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
  });

  // Error handling
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener("player_state_changed", (state) => {
    store.dispatch(setCurrent(state.track_window.current_track));
    // if (
    //   store.audio &&
    //   store.audio.track &&
    //   store.audio.track.uri !== state.track_window.current_track.uri
    // ) {
    //   console.log("hello");
    //   store.dispatch(setCurrent(state.track_window.current_track));
    // }
  });

  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    player._options.id = device_id;
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  // Connect to the player!
  player.connect();
  player.play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id },
    },
  }) => {
    getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };
  store.dispatch(setPlayer(player));
};

window.onbeforeunload = () => {};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return { ...state, audio: action.player };
    case SET_CURRENT_TRACK:
      return { ...state, track: action.track };
    default:
      return state;
  }
};
